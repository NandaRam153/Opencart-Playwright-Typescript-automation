#!/usr/bin/env sh
# Optional preflight when wishlist credentials are required (e.g. Docker with CI=true).
# Exits 0 when credentials are missing — wishlist tests are skipped in CI instead.
set -e
if [ "$CI" != "true" ]; then
  exit 0
fi
if [ -z "$TEST_USER_EMAIL" ] || [ -z "$TEST_USER_PASSWORD" ] || \
   [ "$TEST_USER_EMAIL" = "your-email@example.com" ] || \
   [ "$TEST_USER_PASSWORD" = "your-password" ]; then
  echo "::notice::Wishlist credentials not configured — wishlist E2E will be skipped."
  exit 0
fi
