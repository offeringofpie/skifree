module.exports = (ctx) => {
   return {
     plugins: [
        require('postcss-import'),
        require('postcss-extend'),
        require('postcss-custom-media'),
        require('postcss-preset-env')({
          stage: 0,
          browsers: [ 'last 2 versions' ],
          autoprefixer: {
            grid: true
          },
          features: {
            'custom-properties': {
              preserve: false
            }
          }
        }),
        require('postcss-color-function'),
        require('css-mqpacker')()
     ]
   }
}
