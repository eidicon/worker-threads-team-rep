const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
    'env': {
        'es6': true,
        'node': true
    },
    'parserOptions': {
        'sourceType': 'module',
        'ecmaFeatures': {
            'jsx': true
        },
        'ecmaVersion': 2018
    },
    'rules': {
        'no-extend-native': ERROR,
        'no-caller': ERROR,
        'no-trailing-spaces': ERROR,
        'no-var': ERROR,
        'no-useless-constructor': ERROR,
        'linebreak-style': [
            'error',
            'unix'
        ],

        'semi': ERROR,
        'quotes': [ERROR, 'single'],
        'prefer-spread': ERROR,
        'require-yield': ERROR,
        'no-duplicate-case': ERROR,
        'no-extra-semi': ERROR,
        'no-sparse-arrays': ERROR,
        'default-case': ERROR,
        'guard-for-in': ERROR,
        'no-else-return': ERROR,
        'no-eq-null': ERROR,
        'no-new': ERROR,
        'no-new-func': ERROR,
        'no-new-wrappers': ERROR,
        'no-return-await': ERROR,
        'no-return-assign': ERROR,
        'no-throw-literal': ERROR,
        'no-useless-return': ERROR,
        'prefer-promise-reject-errors': ERROR,
        'require-await': ERROR,
        'strict': [ERROR, 'global'],
        'no-process-env': ERROR,
        'block-spacing': ERROR,
        'brace-style': ERROR,
        'key-spacing': [ERROR, {'beforeColon': false, 'afterColon': true}],
        'arrow-spacing': [ERROR, { 'before': true, 'after': true }],
        'arrow-parens': [ERROR, 'as-needed'],
        'no-const-assign': ERROR,
        "prefer-destructuring": [ERROR, {
            "array": true,
            "object": true
          }, {
            "enforceForRenamedProperties": false
          }],
        'no-this-before-super': ERROR  
    }
};
