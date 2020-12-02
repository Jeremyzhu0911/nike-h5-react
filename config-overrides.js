const { override, fixBabelImports, addLessLoader, addPostcssPlugins,addWebpackAlias } = require('customize-cra');
const path = require('path');
module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd-mobile',
        libraryDirectory: 'es',
        style: 'css',
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: { '@primary-color': '#1DA57A' },
    }),
    addWebpackAlias({      
      "@": path.resolve(__dirname, "src"),        
      "components": path.resolve(__dirname, "src/components")   
    }),
    addPostcssPlugins([require('postcss-px2rem-exclude')({
      remUnit: 75,
      exclude:/node_modules/i
  }),])
)