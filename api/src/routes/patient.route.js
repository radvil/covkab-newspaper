const router = require("express").Router();
const {
	getDocumentsLength,
	getPatients,
	getPatient,
	createPatient,
	updatePatient,
	deletePatient
} = require("../controllers/patient.controller");

const { uploadPatientPhoto } = require('../middlewares/multer');
const { checkAuth, checkRole } = require('../controllers/user.controller');

// define children routes of /patients.
router
	.route("/")
	.get(getPatients)
	.post(checkAuth, checkRole(['root', 'admin']), uploadPatientPhoto, createPatient);

router.route('/totalDocuments').get(getDocumentsLength);

router
	.route("/:id")
	.get(getPatient)
	.put(checkAuth, checkRole(['root', 'admin']), uploadPatientPhoto, updatePatient)
	.delete(checkAuth, checkRole(['root', 'admin']), deletePatient);


module.exports = router;
