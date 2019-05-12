module.exports = {
  secret: "secret-catchphrase",
  database:
    process.env.NODE_ENV === "production"
      ? process.env.MONGOLAB_URI
      : "mongodb://localhost:27017/grocery-list",
  port: process.env.PORT || 3001
};
