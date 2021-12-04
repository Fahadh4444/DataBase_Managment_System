const express = require('express');
const router = express.Router();

const {isSignedIn} = require("../controllers/authControllers");
const participantControllers = require("../controllers/participantControllers");
const {getUserById} = require("../controllers/userController");
const {getListingByID} = require("../controllers/listingControllers");

//* PARAMS
router.param("listingId", getListingByID);
router.param("userId", getUserById);

//* Add Participants POST Route
router
    .route("/add/:listingId/:userId")
    .post(isSignedIn, participantControllers.addParticipant);

//* Get Participants GET Route
router
    .route("/get/:userId")
    .get(isSignedIn, participantControllers.getParticipants);

module.exports = router;
