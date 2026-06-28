/**
 * Preflight check that the OpenCart demo store responds before browser tests run.
 * Used in CI (sut-health job) and via `npm run verify:sut`.
 *
 * Retries with backoff — GitHub Actions runners often hit transient ETIMEDOUT /
 * IPv6 ENETUNREACH against external demo hosts.
 */
import dns from 'node:dns';

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

async function request(method) {
    return fetch(baseURL, {
        method,
        redirect: 'follow',
        signal: AbortSignal.timeout(attemptTimeoutMs),
        headers: {
            'User-Agent': 'opencart-playwright-automation/sut-health',
        },
    });
}

/** HEAD first; fall back to GET when HEAD is unsupported or fails at the network layer. */
async function probeStore() {
    try {
        const head = await request('HEAD');
        if (head.ok) return head;
        if (head.status === 405 || head.status === 501) {
            return request('GET');
        }
        return head;
    } catch {
        return request('GET');
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
