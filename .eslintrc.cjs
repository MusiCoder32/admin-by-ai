module.exports = {module.exports = {

  root: true,  root: true,

  env: {  env: {

    browser: true,    browser: true,

    es2023: true,    es2021: true,

    node: true    node: true

  },  },

  parser: 'vue-eslint-parser',  extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', 'prettier'],

  parserOptions: {  parser: 'vue-eslint-parser',

    parser: '@typescript-eslint/parser',  parserOptions: {

    ecmaVersion: 'latest',    parser: '@typescript-eslint/parser',

    sourceType: 'module'    ecmaVersion: 'latest',

  },    sourceType: 'module'

  extends: [  },

    'eslint:recommended',  plugins: ['vue', '@typescript-eslint'],

    'plugin:vue/vue3-recommended',  rules: {

    'plugin:@typescript-eslint/recommended',    'vue/multi-word-component-names': 'off',

    'prettier'    '@typescript-eslint/no-explicit-any': 'warn'

  ],  }

  plugins: ['vue', '@typescript-eslint'],}

  rules: {
    'vue/multi-word-component-names': 'off'
  }
}
