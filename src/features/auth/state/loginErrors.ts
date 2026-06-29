/** UI-visible login rejection messages (OpenCart). */
export const LOGIN_REJECTION_PATTERN =
    /No match for E-Mail Address and\/or Password\.|exceeded allowed number of login attempts/;

/** Thrown when `LoginPage.login()` detects invalid credentials. */
export const LOGIN_CREDENTIAL_FAILURE_MESSAGE =
    'Login failed: invalid credentials. Update TEST_USER_EMAIL and TEST_USER_PASSWORD in .env';
