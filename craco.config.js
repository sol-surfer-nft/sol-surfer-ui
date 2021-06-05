const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#7879F1',
              // 'link-color': '...',
              // 'success-color': '...',
              // 'warning-color': '...',
              // 'error-color': '...',
              // 'heading-color': '...',
              // 'text-color': '...',
              // 'text-color-secondary': '...',
              // 'border-color-base': '...',
              // 'border-radius-base': '...',
              // 'box-shadow-base': '...',
              // 'font-size-base: '...', // 14px
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
