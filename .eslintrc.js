module.exports = {
  env: {
    browser: true,
  },
  extends: ['airbnb', 'prettier'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
      },
    },
  },
  rules: {
    semi: 0,
    'arrow-body-style': 0,
    'no-param-reassign': ['warn'],
    'react/prop-types': 0,
    'prettier/prettier': ['error'],
    'import/prefer-default-export': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js'] }],
    'jsx-a11y/control-has-associated-label': 0,
  },
}
