// const util = require('util');
module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: 'St.Edwards - %s',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, maximum-scale=1.0'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Nuxt.js project'
      }
    ],
    script: [{
        src: 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/4.1.5/lazysizes.min.js'
      },
      {
        src: 'https://openspace.ordnancesurvey.co.uk/osmapapi/openspace.js?key=53F55E0629734819E0530B6CA40ACA3D'
      }
    ],
    link: [{
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },
      {
        href: 'https://fonts.googleapis.com/css?family=Lato|Roboto',
        rel: 'stylesheet'
      },
      {
        rel: 'stylesheet',
        href: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css'
      }
      // {
      //   type: 'text/javascript',
      //   href: 'lazysizes/lazysizes.min.js',
      // }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#3B8070'
  },
  /*
   ** Build configuration
   */
  plugins: [{
    src: '~/plugins/element-ui.js'
  }],
  // plugins: [{ src: '~plugins/lazysizes.js', ssr: false }],
  css: ['element-ui/lib/theme-chalk/index.css'],
  build: {
    postcss: {

      preset: {
        stage: 0,
        // Change the postcss-preset-env settings
        // autoprefixer: {
        //   grid: true
        // }
      },
      extend(config, ctx) {

      }
    },
    // ssr: false,
    // postcss: [require('postcss-cssnext')()],
    babel: {
      plugins: ['lodash', 'syntax-optional-chaining']
      // plugins: ['lodash']
    }
    // extend(config, ctx) {
    //   console.log(util.inspect(config, false, null));
    // }
  }
};
