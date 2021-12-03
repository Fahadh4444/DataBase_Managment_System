const express = require('express');
const router = express.Router();

const {isSignedIn} = require("../controllers/authControllers");
const participantControllers = require("../controllers/participantControllers");
const {getUserById} = require("../controllers/userController");
const {getListingByID} = require("../controllers/listingControllers");

router.param("listingId", getListingByID);
router.param("userId", getUserById);

router
    .route("/add/:listingId/:userId")
    .post(isSignedIn, participantControllers.addParticipant);

router
    .route("/get/:userId")
    .get(isSignedIn, participantControllers.getParticipants);

module.exports = router;
