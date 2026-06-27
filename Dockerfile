FROM mcr.microsoft.com/playwright:v1.58.1-jammy

WORKDIR /app

# Copy root and workspace package.json files (better caching)
COPY package*.json ./
COPY packages/pw-core/package.json ./packages/pw-core/
RUN npm ci --ignore-scripts

# Copy source and build pw-core (postinstall skipped above — no src at npm ci time)
COPY . .
RUN npm run build --workspace=packages/pw-core

ENV CI=true

# Full suite: UI, API, and hybrid tests (seed excluded via playwright.config.ts)
CMD ["sh", "-c", "sh scripts/verify-wishlist-credentials.sh && npx playwright test"]
