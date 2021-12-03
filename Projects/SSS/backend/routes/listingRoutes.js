const express = require("express");
const router = express.Router();

const {isSignedIn} = require("../controllers/authControllers");
const {getUserById} = require("../controllers/userController");
const {createList, deleteList, updateList, getListing, getAllListings, getListingByID, image} = require("../controllers/listingControllers")


//Params
router.param("userId", getUserById);
router.param("listingId", getListingByID);

router
    .route("/create/:userId")
    .post(isSignedIn, image, createList);

router
    .route("/delete/:listingId/:userId")
    .delete(isSignedIn, deleteList);

router
    .route("/update/:listingId")
    .put(isSignedIn, updateList);

router
    .route("/getlisting/:listingId")
    .get(isSignedIn, getListing);

router
    .route("/getalllistings")
    .get(isSignedIn, getAllListings);

module.exports = router;