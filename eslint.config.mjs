import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import playwright from 'eslint-plugin-playwright';

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    playwright.configs['flat/recommended'],
    {
        files: ['src/**/*.ts', 'playwright.config.ts', 'packages/pw-core/src/**/*.ts'],
        rules: {
            '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
            '@typescript-eslint/no-non-null-assertion': 'off',
        },
    },
    {
        files: ['packages/pw-core/src/**/*.ts', 'src/pages/**/*.ts', 'src/components/**/*.ts'],
        rules: {
            'playwright/no-standalone-expect': 'off',
            'playwright/no-networkidle': 'off',
        },
    },
    {
        files: ['src/tests/**/*.ts'],
        rules: {
            'playwright/expect-expect': 'off',
            'playwright/no-skipped-test': 'off',
        },
    },
    {
        ignores: ['packages/pw-core/dist/**', 'playwright-report/**', 'test-results/**'],
    }
);
