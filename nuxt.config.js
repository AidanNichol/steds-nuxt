// const util = require('util');
module.exports = {
  /*
   ** Headers of the page
   */
  mode: 'spa',
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
    ]
  },
  modules: [
    'nuxt-element-ui'
  ],

  elementUI: {
    components: ['Button', 'ButtonGroup', 'Dialog', 'Slider', 'Input', 'Select', 'Option', 'Form', 'FormItem', 'ColorPicker'],
    // locale: 'gb',
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

   css: [
     'element-ui/lib/theme-chalk/button.css',
      'element-ui/lib/theme-chalk/button-group.css',
      'element-ui/lib/theme-chalk/dialog.css',
      'element-ui/lib/theme-chalk/slider.css',
      'element-ui/lib/theme-chalk/input.css',
      'element-ui/lib/theme-chalk/select.css',
      'element-ui/lib/theme-chalk/option.css',
      'element-ui/lib/theme-chalk/form.css',
      'element-ui/lib/theme-chalk/form-item.css',
      'element-ui/lib/theme-chalk/color-picker.css',
   ],

  build: {
    analyze: false,
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
    babel: {
      plugins: ['lodash', 'syntax-optional-chaining']
    }
  }
};
