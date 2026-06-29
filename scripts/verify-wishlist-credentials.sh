#!/usr/bin/env sh
# Informational notice when wishlist credentials are not configured.
# GitHub Actions gates wishlist via the wishlist-secrets job; this script does not fail the workflow.
# Docker/full-suite CI still fails when @wishlist runs without credentials (assertWishlistCredentialsInCi).
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
