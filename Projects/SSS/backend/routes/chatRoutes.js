const express = require('express');
const router = express.Router();

const chatControllers = require("../controllers/chatControllers");
const {getUserById, getUsers} = require("../controllers/userController");
const {getListingByID} = require("../controllers/listingControllers");
const {isSignedIn} = require("../controllers/authControllers");

//* params 
router.param("listingId", getListingByID);
router.param("userId", getUserById);

//* Send Chat POST Route
router
    .route("/send/:listingId/:userId")
    .post(isSignedIn, chatControllers.sending);

//* Recive Chat GET Route
router
    .route("/recieve/:listingId")
    .get(isSignedIn, chatControllers.recieving);

//* GET User GET Route
router
    .route("/users/:listingId")
    .get(isSignedIn, getUsers);

module.exports = router;
