const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#b37feb' ,'@link-color': '#adc6ff','@success-color': '#b37feb', '@error-color': '#d3adf7'} ,
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};