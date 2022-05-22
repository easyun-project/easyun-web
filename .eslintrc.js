// eslint-disable-next-line no-undef
module.exports = {
    env: {
        browser: true,
        es2021: true,
        amd: true,
        node: true,
    },
    extends: [
        'eslint:recommended', //采用eslint的默认建议
        'plugin:react/recommended', //采用react的默认建议
        'plugin:@typescript-eslint/recommended', //采用typescript的默认建议
        'prettier', //采用prettier代码风格
        'plugin:tailwindcss/recommended', //采用推荐的tailwind风格
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: [ 'react', '@typescript-eslint', 'eslint-plugin-prettier', 'tailwindcss' ],
    rules: {
        'no-mixed-spaces-and-tabs': 0, // disable rule
        indent: [ 'error', 4 ], //缩进采用4个空格
        'linebreak-style': [ 'error', 'unix' ], //换行符采用unix风格的LF
        quotes: [ 'error', 'single' ], //文本采用单引号
        semi: [ 'error', 'always' ], //每行结束后有分号
        'object-curly-spacing': [ 'error', 'always' ], //{}附近有空格
        'react/prop-types': 0, //不要求在react组件定义props验证
        'no-trailing-spaces': 2, //禁止禁用行尾空格
        'space-infix-ops': 2, // 要求操作符周围有空格
        '@typescript-eslint/no-non-null-assertion': 'off', //可以使用ts的非空断言
        'multiline-ternary': [ 'error', 'always-multiline' ], //如果表达式跨越多个行，则在三元表达式的操作数之间强制换行。
        // 'tailwindcss/migration-from-tailwind-2': 0, //由于我们目前用的还是tailwind2，所以此条不开启
        'comma-spacing': [ 'error', { before: false, after: true } ], //逗号右边接一个空格
        'array-bracket-spacing': [ 'error', 'always' ], //中括号左右要有空格
    },
};
