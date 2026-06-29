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
        files: ['packages/pw-core/src/**/*.ts', 'src/features/**/presentation/**/*.ts'],
        rules: {
            'playwright/no-standalone-expect': 'off',
            'playwright/no-networkidle': 'off',
        },
    },
    {
        files: ['src/tests/**/*.ts', 'src/fixtures/**/*.ts'],
        rules: {
            'playwright/expect-expect': 'off',
            'playwright/no-skipped-test': 'off',
        },
    },
    {
        files: ['src/features/**/presentation/**/*.ts'],
        rules: {
            'no-restricted-imports': [
                'error',
                {
                    patterns: [
                        {
                            group: ['**/features/*/services/**'],
                            message:
                                'Presentation must not import feature services. Use same-feature state only.',
                        },
                        {
                            group: [
                                '../../auth/**',
                                '../../cart/**',
                                '../../catalog/**',
                                '../../checkout/**',
                                '../../home/**',
                                '../../wishlist/**',
                            ],
                            message:
                                'Presentation must not import other feature modules; compose in tests/fixtures.',
                        },
                    ],
                },
            ],
        },
    },
    {
        files: ['src/features/**/state/**/*.ts'],
        rules: {
            'no-restricted-imports': [
                'error',
                {
                    patterns: [
                        {
                            group: ['**/features/*/presentation/**'],
                            message: 'State must not import presentation.',
                        },
                        {
                            group: ['**/features/*/services/**'],
                            message: 'State must not import feature services.',
                        },
                        {
                            group: [
                                '../../auth/**',
                                '../../cart/**',
                                '../../catalog/**',
                                '../../checkout/**',
                                '../../home/**',
                                '../../wishlist/**',
                            ],
                            message:
                                'State must not import other feature modules; compose in tests/fixtures.',
                        },
                    ],
                },
            ],
        },
    },
    {
        files: ['src/features/**/services/**/*.ts'],
        rules: {
            'no-restricted-imports': [
                'error',
                {
                    patterns: [
                        {
                            group: ['**/features/*/presentation/**'],
                            message: 'Services must not import presentation.',
                        },
                        {
                            group: [
                                '../../auth/**',
                                '../../cart/**',
                                '../../catalog/**',
                                '../../checkout/**',
                                '../../home/**',
                                '../../wishlist/**',
                            ],
                            message:
                                'Services must not import other feature modules; compose in tests/fixtures.',
                        },
                    ],
                },
            ],
        },
    },
    {
        files: ['src/tests/**/*.ts'],
        rules: {
            'no-restricted-imports': [
                'error',
                {
                    patterns: [
                        {
                            group: [
                                '**/features/*/presentation/**',
                                '**/features/*/state/**',
                                '**/features/*/services/**',
                            ],
                            message:
                                'Import from the feature barrel (index.ts), not internal layer paths.',
                        },
                    ],
                },
            ],
        },
    },
    {
        files: ['src/fixtures/**/*.ts'],
        rules: {
            'no-restricted-imports': [
                'error',
                {
                    patterns: [
                        {
                            group: [
                                '**/features/*/presentation/**',
                                '**/features/*/state/**',
                                '**/features/*/services/**',
                            ],
                            message:
                                'Fixtures import feature barrels only, not internal layer paths.',
                        },
                    ],
                },
            ],
        },
    },
    {
        files: ['src/features/**/index.ts'],
        rules: {
            'no-restricted-imports': 'off',
        },
    },
    {
        files: ['scripts/**/*.mjs'],
        languageOptions: {
            globals: {
                process: 'readonly',
                console: 'readonly',
            },
        },
    },
    {
        ignores: ['packages/pw-core/dist/**', 'playwright-report/**', 'test-results/**'],
    }
);
