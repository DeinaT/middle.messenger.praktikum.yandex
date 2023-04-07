module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "airbnb",
        "eslint:recommended",
        "plugin:import/typescript",
        "plugin:@typescript-eslint/recommended"
    ],

    "overrides": [
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        "indent": 0,
        'no-plusplus': 'off',
        'prefer-template': 'off',
        "no-shadow": "off",
        "import/no-cycle": "off",
        "import/prefer-default-export": "off",
        "no-underscore-dangle": "off",
        "default-param-last": "off",
        "class-methods-use-this": "off",
        "import/no-named-as-default": "off",
        "import/extensions": "off",
        "no-param-reassign": "off",
        "prefer-destructuring": "off"
    },

    "ignorePatterns": ["src/**/*.test.ts", "src/**/*.d.ts", "src/**/router.ts", "src/**/block.ts", "src/**/store.ts", "src/**/*.hbs", "src/**/*.sass", "src/**/*.js", "src/**/*.html"]
};
