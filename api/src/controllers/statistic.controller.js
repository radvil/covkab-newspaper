let { Article, Patient, Portfolio, User } = require('../models');

/**
 * @DESC To GET all items total.
 */
exports.getTotals = async (req, res, next) => {
  try {
    let totalArticles = await Article.countDocuments();
    if (!totalArticles) totalArticles = 0;

    let totalPatients = await Patient.countDocuments();
    if (!totalPatients) totalPatients = 0;

    let totalPortfolios = await Portfolio.countDocuments();
    if (!totalPortfolios) totalPortfolios = 0;

    let totalUsers = await User.countDocuments();
    if (!totalUsers) totalUsers = 0;

    let totalODP = await Patient.countDocuments({ status: 'odp' });
    if (!totalODP) totalODP = 0;

    let totalPDP = await Patient.countDocuments({ status: 'pdp' });
    if (!totalPDP) totalPDP = 0;

    let totalOTG = await Patient.countDocuments({ status: 'otg' });
    if (!totalOTG) totalOTG = 0;

    let totalPositive = await Patient.countDocuments({ status: 'positive' });
    if (!totalPositive) totalPositive = 0;

    return res.json({
      success: true,
      message: 'GET all total succeed',
      doc: {
        totalPositive,
        totalPDP,
        totalODP,
        totalOTG,
        totalArticles,
        totalPortfolios,
        totalPatients,
        totalUsers,
      },
    });
  } catch (ex) {
    return next(ex);
  }
};
