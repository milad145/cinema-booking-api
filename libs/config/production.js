import TokenGenerator from '../modules/tokenGenerator.js'

const tokenGenerator = new TokenGenerator(64, true, true, true, false)
process.env.ACCESS_TOKEN_SECRET = tokenGenerator.newToken()

export default {
    database: process.env.DB_CONFIG,
    environment: 'production',
    port: process.env.PORT || 3000,
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    accessTokenExpireTime: "2h"
};
