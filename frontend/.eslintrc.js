module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:@typescript-eslint/eslint-recommended', 'plugin:@typescript-eslint/recommended'],
    parser: '@typescript-eslint/parser',
    globals: {
        JSX: true,
        __WebpackModuleApi: true
    },
    overrides: [
        {
            files: ['*.ts', '*.tsx'],
            parserOptions: {
                ecmaVersion: 12,
                sourceType: 'module',
                project: ['./tsconfig.json'],
                tsconfigRootDir: __dirname,
                ecmaFeatures: {
                    jsx: true
                }
            },
            rules: {
                'no-extra-parens': 0,
                'no-unused-vars': 0,
                '@typescript-eslint/no-unused-vars': 2,
                '@typescript-eslint/no-extra-parens': [2, 'functions']
            }
        },
        {
            files: ['./webpack/**/*.js', './tailwind.config.js'],
            rules: {
                '@typescript-eslint/no-var-requires': 0
            }
        }
    ],
    // ignorePatterns: [
    //     ".eslintrc.js"
    // ],
    plugins: ['react', 'react-hooks', '@typescript-eslint'],
    rules: {
        /* ESLint: possible errors */
        'for-direction': 1,
        'getter-return': [
            1,
            {
                allowImplicit: false
            }
        ],
        'no-await-in-loop': 0,
        'no-compare-neg-zero': 1,
        'no-cond-assign': [1, 'always'],
        'no-console': 0,
        'no-constant-condition': 1,
        'no-control-regex': 1,
        'no-debugger': 1,
        'no-dupe-keys': 1,
        'no-duplicate-case': 1,
        'no-empty': 1,
        'no-empty-character-class': 1,
        'no-ex-assign': 1,
        'no-extra-boolean-cast': 1,
        'no-extra-parens': [
            1,
            'all',
            {
                ignoreJSX: 'all'
            }
        ],
        'no-extra-semi': 1,
        'no-func-assign': 1,
        'no-invalid-regexp': 1,
        'no-irregular-whitespace': 1,
        'no-sparse-arrays': 1,
        'no-template-curly-in-string': 0,
        'no-unexpected-multiline': 1,
        'no-unreachable': 1,
        'no-unsafe-finally': 1,
        'no-unsafe-negation': 1,
        'use-isnan': 1,
        'valid-jsdoc': 0,
        'valid-typeof': 1,

        /* ESLint: base practices */
        'accessor-pairs': 1,
        'array-callback-return': 1,
        'block-scoped-var': 1,
        complexity: 0,
        curly: 1,
        'default-case': 1,
        'dot-location': [1, 'property'],
        'dot-notation': 1,
        eqeqeq: 1,
        'guard-for-in': 1,
        'no-alert': 1,
        'no-caller': 1,
        'no-case-declarations': 1,
        'no-div-regex': 1,
        'no-else-return': 1,
        'no-empty-function': 1,
        'no-empty-pattern': 1,
        'no-eq-null': 1,
        'no-eval': 1,
        'no-extend-native': 1,
        'no-extra-bind': 1,
        'no-extra-label': 1,
        'no-fallthrough': 1,
        'no-floating-decimal': 1,
        'no-global-assign': 1,
        'no-implicit-coercion': [
            1,
            {
                allow: ['!!']
            }
        ],
        'no-implicit-globals': 1,
        'no-implied-eval': 1,
        'no-iterator': 1,
        'no-labels': 1,
        'no-lone-blocks': 1,
        'no-loop-func': 1,
        'no-multi-str': 1,
        'no-new': 1,
        'no-new-func': 1,
        'no-new-wrappers': 1,
        'no-octal': 1,
        'no-octal-escape': 1,
        'no-param-reassign': 1,
        'no-proto': 1,
        'no-redeclare': [
            1,
            {
                builtinGlobals: true
            }
        ],
        'no-restricted-properties': 1,
        'no-return-assign': 0,
        'no-return-await': 1,
        'no-script-url': 1,
        'no-self-assign': [
            1,
            {
                props: true
            }
        ],
        'no-self-compare': 1,
        'no-sequences': 1,
        'no-throw-literal': 1,
        'no-unmodified-loop-condition': 1,
        'no-unused-labels': 1,
        'no-useless-call': 1,
        'no-useless-concat': 1,
        'no-useless-return': 1,
        'no-useless-constructor': 0,
        'no-with': 1,
        'prefer-promise-reject-errors': 1,
        radix: 1,
        'require-await': 1,
        'vars-on-top': 1,
        'wrap-iife': 1,
        yoda: 1,
        quotes: [2, 'single'],
        'arrow-parens': [2, 'as-needed'],

        /* ESLint: variables */
        'init-declarations': 1,
        'no-delete-var': 1,
        'no-label-var': 1,
        'no-restricted-globals': [1, 'event'],
        'no-shadow-restricted-names': 1,
        'no-undef': 1,
        'no-undef-init': 1,
        'no-undefined': 1,
        'no-unused-vars': 1,
        'no-use-before-define': 0,
        'callback-return': 0,
        indent: [2, 4, { SwitchCase: 1 }],

        /* ESLint: stylistic issues */
        'array-bracket-spacing': [
            2,
            'never',
            {
                objectsInArrays: false,
                arraysInArrays: false
            }
        ],
        'comma-dangle': [
            2,
            {
                imports: 'never',
                exports: 'never',
                arrays: 'never',
                objects: 'never',
                functions: 'never'
            }
        ],
        semi: [2, 'always', { omitLastInOneLineBlock: true }],

        /** React */
        'react/prop-types': 0,
        'react/jsx-uses-react': 0,
        'react/react-in-jsx-scope': 0,
        'react/sort-comp': [2, {
            'order': [
                'static-methods',
                'instance-variables',
                'lifecycle',
                'everything-else',
                'render'
            ],
            'groups': {
                'lifecycle': [
                    'displayName',
                    'propTypes',
                    'contextTypes',
                    'childContextTypes',
                    'mixins',
                    'statics',
                    'defaultProps',
                    'constructor',
                    'getDefaultProps',
                    'state',
                    'getInitialState',
                    'getChildContext',
                    'getDerivedStateFromProps',
                    'componentWillMount',
                    'UNSAFE_componentWillMount',
                    'componentDidMount',
                    'componentWillReceiveProps',
                    'UNSAFE_componentWillReceiveProps',
                    'shouldComponentUpdate',
                    'componentWillUpdate',
                    'UNSAFE_componentWillUpdate',
                    'getSnapshotBeforeUpdate',
                    'componentDidUpdate',
                    'componentDidCatch',
                    'componentWillUnmount'
                ]
            }
        }]
    }
};
