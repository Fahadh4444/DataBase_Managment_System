const express = require('express');
const router = express.Router();

const chatControllers = require("../controllers/chatControllers");
const {getUserById, getUsers} = require("../controllers/userController");
const {getListingByID} = require("../controllers/listingControllers");
const {isSignedIn} = require("../controllers/authControllers");


router.param("listingId", getListingByID);
router.param("userId", getUserById);


router
    .route("/send/:listingId/:userId")
    .post(isSignedIn, chatControllers.sending);

router
    .route("/recieve/:listingId")
    .get(isSignedIn, chatControllers.recieving);

router
    .route("/users/:listingId")
    .get(isSignedIn, getUsers);

module.exports = router;
