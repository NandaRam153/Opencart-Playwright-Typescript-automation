import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        include: ['src/unit/**/*.unit.test.ts'],
        environment: 'node',
        restoreMocks: true,
        unstubEnvs: true,
    },
});
