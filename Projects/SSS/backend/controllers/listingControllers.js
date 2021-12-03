const multer = require("multer");
const path = require("path");

const db = require('../config/db');
const User = require("../models/user");
const List = require("../models/listing");

exports.getListingByID = (req, res, next, id) => {
    let sql = `SELECT * FROM listings WHERE listingid = ${id};`;
    db.execute(sql)
    .then((l) => {
        req.listing = l[0][0];
        next();
    })
    .catch((err)=>{
        res.json({error : err});
        next();
    })
}

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});

exports.image = multer({
    storage: storage,
    fileFilter: function(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
            req.fileValidationError = 'Only image files are allowed!';
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    },
}).single("L_photo");

exports.createList = (req, res) => {
    const {money, count, category, content} = req.body;
    const userId = req.profile.userid;
    const picture = "NULL";
    if(req.file){
        picture = req.file.filename;
    }
    let listing = new List(money, count, category, content, userId, picture);

    listing.create()
    .then((l) => {
        res.json(l);
    })
    .catch((err) => {
        if(err){
            res.json({error: err})
        }
    });
};


exports.deleteList = (req, res) => {
    const {listingid} = req.listing;
    const ownerid = req.listing.userid;
    const {userid} = req.profile;
    if(ownerid != userid){
        res.send(" You are not allowed to make this operation");
        return;
    }
    let sql = `DELETE FROM listings WHERE listingid = ${listingid};`

    db.execute(sql)
    .then(() => {
        let q = `DELETE FROM participants WHERE listing_id = ${listingid};`;
        db.execute(q)
        .then(() => {
            res.send("DONE");
        })
        .catch((err) => {
            res.send(err);
        })
    })
    .catch((err) => {
        res.send(err);
    })


}

exports.updateList = (req,res) => {
    const {listingid, L_count, L_accepted} = req.listing;
    let sql = `UPDATE listings SET L_accepted=L_accepted+1 WHERE listingid=${listingid};`
    db.execute(sql)
    .then((r) => {
        res.json({msg: "Success!!!", L_count, L_accepted})
    })
    .catch((err) => {
        res.json(err);
    })
}


exports.getListing = (req, res) => {
    console.log(req.listing);
    const {listingid} = req.listing;
    let sql = `SELECT * FROM listings WHERE listingid = ${listingid};`;
    db.execute(sql)
    .then((l) => {
        res.send(l[0][0]);
    })
    .catch((err) => {
        res.send(err);
    })
}

exports.getAllListings = (req, res) => {
    let sql = `SELECT * FROM listings;`;
    db.execute(sql)
    .then((l) => {
        res.send(l[0]);
    })
    .catch((err) => {
        res.send(err);
    })
}
