FROM mcr.microsoft.com/playwright:v1.58.0-jammy

WORKDIR /app

# Install deps first (better caching)
COPY package*.json ./
RUN npm ci

# Copy tests
COPY . .

# Run tests by default
CMD ["npx", "playwright", "test"]
# To run tests in debug mode, you can override the CMD in your docker run command
# CMD ["npx", "playwright", "test", "--debug"]