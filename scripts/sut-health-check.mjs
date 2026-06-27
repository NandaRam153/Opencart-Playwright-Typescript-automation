/**
 * Preflight check that the OpenCart demo store responds before browser tests run.
 * Used in CI (sut-health job) and via `npm run verify:sut`.
 */
const baseURL = (process.env.BASE_URL ?? 'https://awesomeqa.com/ui/').replace(/\/?$/, '/');

const response = await fetch(baseURL, {
    method: 'HEAD',
    redirect: 'follow',
    signal: AbortSignal.timeout(15_000),
});

if (!response.ok) {
    console.error(
        `SUT health check failed: ${response.status} ${response.statusText} — ${baseURL}`
    );
    process.exit(1);
}

console.log(`SUT health check passed: ${baseURL} (${response.status})`);
