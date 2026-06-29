/**
 * Preflight check that the OpenCart demo store responds before browser tests run.
 * Used in CI (sut-health job) and via `npm run verify:sut`.
 *
 * Retries with backoff — GitHub Actions runners often hit transient ETIMEDOUT /
 * IPv6 ENETUNREACH against external demo hosts.
 */
import dns from 'node:dns';
import https from 'node:https';
import { URL } from 'node:url';

if (process.env.CI === 'true') {
    dns.setDefaultResultOrder('ipv4first');
}

const baseURL = (process.env.BASE_URL ?? 'https://awesomeqa.com/ui/').replace(/\/?$/, '/');
const maxAttempts = Number(process.env.SUT_HEALTH_ATTEMPTS ?? 5);
const attemptTimeoutMs = Number(process.env.SUT_HEALTH_TIMEOUT_MS ?? 25_000);
const retryDelayMs = Number(process.env.SUT_HEALTH_RETRY_DELAY_MS ?? 5_000);

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function formatError(error) {
    if (error instanceof Error) {
        const cause = error.cause;
        if (cause && typeof cause === 'object' && 'code' in cause) {
            return `${error.message} (${cause.code})`;
        }
        return error.message;
    }
    return String(error);
}

function request(method, urlString, redirectCount = 0) {
    return new Promise((resolve, reject) => {
        const url = new URL(urlString);
        const req = https.request(
            {
                method,
                hostname: url.hostname,
                port: url.port || 443,
                path: `${url.pathname}${url.search}`,
                headers: {
                    'User-Agent': 'opencart-playwright-automation/sut-health',
                },
                timeout: attemptTimeoutMs,
            },
            (res) => {
                res.resume();
                if (
                    res.statusCode >= 300 &&
                    res.statusCode < 400 &&
                    res.headers.location &&
                    redirectCount < 5
                ) {
                    const next = new URL(res.headers.location, url).href;
                    resolve(request(method, next, redirectCount + 1));
                    return;
                }
                resolve({
                    ok: res.statusCode >= 200 && res.statusCode < 300,
                    status: res.statusCode,
                    statusText: res.statusMessage ?? '',
                });
            }
        );
        req.on('timeout', () => {
            req.destroy(new Error(`Request timed out after ${attemptTimeoutMs}ms`));
        });
        req.on('error', reject);
        req.end();
    });
}

/** HEAD first; fall back to GET when HEAD is unsupported or fails at the network layer. */
async function probeStore() {
    try {
        const head = await request('HEAD', baseURL);
        if (head.ok) return head;
        if (head.status === 405 || head.status === 501) {
            return request('GET', baseURL);
        }
        return head;
    } catch {
        return request('GET', baseURL);
    }
}

let lastError;
let succeeded = false;

for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
        const response = await probeStore();
        if (response.ok) {
            console.log(
                `SUT health check passed: ${baseURL} (${response.status})` +
                    (attempt > 1 ? ` on attempt ${attempt}/${maxAttempts}` : '')
            );
            succeeded = true;
            break;
        }

        lastError = new Error(`HTTP ${response.status} ${response.statusText} — ${baseURL}`);
        console.warn(`SUT health attempt ${attempt}/${maxAttempts} failed: ${lastError.message}`);
    } catch (error) {
        lastError = error;
        console.warn(`SUT health attempt ${attempt}/${maxAttempts} failed: ${formatError(error)}`);
    }

    if (attempt < maxAttempts) {
        await sleep(retryDelayMs);
    }
}

if (succeeded) {
    process.exit(0);
}

console.error(
    `SUT health check failed after ${maxAttempts} attempts — ${baseURL}\n` +
        `Last error: ${formatError(lastError)}\n` +
        'The demo store may be down or unreachable from the CI runner. Re-run the workflow or check BASE_URL.'
);
process.exit(1);
