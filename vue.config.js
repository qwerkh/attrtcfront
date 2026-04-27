const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    pluginOptions: {
        i18n: {
            locale: 'en',
            fallbackLocale: 'en',
            localeDir: 'locales',
            enableLegacy: true,
            runtimeOnly: false,
            compositionOnly: true,
            fullInstall: true
        },
        vuetify: {
            // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
        }
    } , // 👇 ADD THIS PART
    pwa: {
        name: 'BWU-AMS',
        short_name: 'AMS',
        themeColor: '#1976D2',
        msTileColor: '#000000',

        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'default',

        manifestOptions: {
            display: 'standalone',
            background_color: '#ffffff'
        },
        iconPaths: {
            favicon32: 'img/icons/favicon-32x32.png',
            favicon16: 'img/icons/favicon-16x16.png',
            appleTouchIcon: 'img/icons/apple-touch-icon-152x152.png',
            maskIcon: 'img/icons/safari-pinned-tab.svg',
            msTileImage: 'img/icons/msapplication-icon-144x144.png'
        }

    }
})
