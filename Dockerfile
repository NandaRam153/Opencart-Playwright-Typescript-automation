FROM mcr.microsoft.com/playwright:v1.58.0-jammy

WORKDIR /app

# Copy root and workspace package.json files (better caching)
COPY package*.json ./
COPY packages/pw-core/package.json ./packages/pw-core/
RUN npm ci

# Copy everything else
COPY . .

# Build the workspace package
RUN npm run build --workspace=packages/pw-core

# Run tests by default
CMD ["npx", "playwright", "test"]
# To run tests in debug mode, you can override the CMD in your docker run command
# CMD ["npx", "playwright", "test", "--debug"]