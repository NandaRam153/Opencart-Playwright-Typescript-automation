#!/usr/bin/env sh
# Fail fast when CI=true and wishlist credentials are missing (mirrors GitHub Actions gate).
set -e
if [ "$CI" != "true" ]; then
  exit 0
fi
if [ -z "$TEST_USER_EMAIL" ] || [ -z "$TEST_USER_PASSWORD" ] || \
   [ "$TEST_USER_EMAIL" = "your-email@example.com" ] || \
   [ "$TEST_USER_PASSWORD" = "your-password" ]; then
  echo "::error::Wishlist E2E requires TEST_USER_EMAIL and TEST_USER_PASSWORD when CI=true." >&2
  exit 1
fi
