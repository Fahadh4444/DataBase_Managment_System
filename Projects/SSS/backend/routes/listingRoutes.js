const express = require("express");
const router = express.Router();

const {isSignedIn} = require("../controllers/authControllers");
const {getUserById} = require("../controllers/userController");
const {createList, deleteList, updateList, getListing, getAllListings, getListingByID, image} = require("../controllers/listingControllers")


//* Params
router.param("userId", getUserById);
router.param("listingId", getListingByID);

//* Create List POST Route
router
    .route("/create/:userId")
    .post(isSignedIn, image, createList);

//* Delete List DELETE Route
router
    .route("/delete/:listingId/:userId")
    .delete(isSignedIn, deleteList);

//* Update List PUT Route
router
    .route("/update/:listingId")
    .put(isSignedIn, updateList);

//* Get List GET Route
router
    .route("/getlisting/:listingId")
    .get(isSignedIn, getListing);

//* Get All Lists GET Route
router
    .route("/getalllistings")
    .get(isSignedIn, getAllListings);

module.exports = router;