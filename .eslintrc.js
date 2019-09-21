module.exports = {
  root: true,
  extends: ['airbnb-typescript/base', 'plugin:prettier/recommended'],
  rules: {
    'comma-dangle': [2, 'never'],
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['configs/*.js'] }
    ],
    'prettier/prettier': [
      2,
      {
        singleQuote: true,
        printWidth: 80
      },
      {
        usePrettierrc: false
      }
    ]
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  }
};
