const { Article } = require('./article.model');
const { Portfolio } = require('./portfolio.model');
const { User } = require('./user.model');
const { Patient } = require('./patient.model');
const { About, Contact } = require('./info.model');
const { Message } = require('./message.model');
const { Residence } = require('./residence.model');

module.exports = {
  Article,
  Portfolio,
  User,
  Patient,
  About,
  Contact,
  Message,
  Residence
};
