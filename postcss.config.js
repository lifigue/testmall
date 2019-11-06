module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport":{
      viewportWidth:375,
      viewportHeight:667,
      unitPrecision:5,
      viewportUnit:'vw',
      selectorBlackList:['ignore','tab-bar'],
      minPixelValue:1,//小于或等于‘1px'不转换为视窗单位
      mediaQuery:false,
      exclude:[/TabBar/]

    }
  }
}
