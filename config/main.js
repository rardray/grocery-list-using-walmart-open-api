module.exports = {
  secret: "secret-catchphrase",
  database: process.env.MONGOLAB_URI,
  port: process.env.PORT || 3001
};
