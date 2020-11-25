const dbUri = (process.env.NODE_ENV == 'production') 
    ? "mongodb+srv://radvil:rapgod@covkab.r1hff.mongodb.net/CovKab?retryWrites=true&w=majority"
    : "mongodb://localhost:27017/cvd_db";
const apiPort = process.env.PORT || 3000;

module.exports = {
  DB: dbUri,
  SECRET: 'injoker',
  PORT: apiPort,
};
