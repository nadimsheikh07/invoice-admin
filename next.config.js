const { i18n } = require('./next-i18next.config')
const withOffline = require('next-offline')

const isProd = process.env.NODE_ENV === 'production'

function getBasePath() {
    var basePath = ''
    if (isProd && process.env.BASE_PATH) {
        if (process.env.BASE_PATH.startsWith("/")) {
            basePath = process.env.BASE_PATH;
        } else {
            basePath = "/" + process.env.BASE_PATH;
        }
    }
    return basePath
}

const nextConfig = {
    assetPrefix: getBasePath(),
    dynamicAssetPrefix: true,
    basePath: getBasePath(),
    publicRuntimeConfig: {
        basePath: getBasePath(),
    },
    trailingSlash: true,
    env: {
        BASE_PATH: process.env.BASE_PATH,
        FIREBASE_NOTIFICATION: process.env.FIREBASE_NOTIFICATION,
        API_URL: process.env.API_URL,
    },
    i18n
}
module.exports = withOffline(nextConfig)