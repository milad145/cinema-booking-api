export default {
    database: process.env.DB_CONFIG,
    environment: 'development',
    port: process.env.PORT || 3300,
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    accessTokenExpireTime: "5h",
    adminUsername: process.env.ADMIN_USERNAME,
    adminPassword: process.env.ADMIN_PASSWORD
};
