const { override, addLessLoader, fixBabelImports, addWebpackAlias } = require('customize-cra');
const path = require('path')

module.exports = override(
    addWebpackAlias({
        "@assets": path.resolve(__dirname, './src/assets'),
        "@component": path.resolve(__dirname, './src/component'),
        "@constant": path.resolve(__dirname, './src/constant'),
        "@hooks": path.resolve(__dirname, './src/hooks'),
        "@page": path.resolve(__dirname, './src/page'),
        "@util": path.resolve(__dirname, './src/util')
    }),
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addLessLoader({
        lessOptions: {
            javascriptEnabled: true
        }
    })
);