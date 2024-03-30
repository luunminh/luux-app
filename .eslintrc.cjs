module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['react-app', 'plugin:jsx-a11y/recommended', 'plugin:react/recommended'],
  plugins: ['jsx-a11y', 'react-hooks'],
  rules: {
    'react/self-closing-comp': [
      'error',
      {
        component: true,
        html: true,
      },
    ],
    'import/no-anonymous-default-export': ['off'],
    'no-unused-vars': 'off',
    'react/jsx-key': ['error', { checkFragmentShorthand: true }],
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'react/no-unescaped-entities': 'off',
  },
  parserOptions: {
    warnOnUnsupportedTypeScriptVersion: false,
  },
};
