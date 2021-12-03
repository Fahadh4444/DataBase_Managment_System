const db = require('../config/db');
const Participant = require("../models/participant");

exports.addParticipant = (req,res) => {
    const userId = req.profile.userid;
    const listingId = req.listing.listingid;
    const admin = req.listing.userid;

    let p = new Participant(userId, listingId, admin);

    p.create()
    .then((response) => {
        res.send(response);
    })
    .catch((err) => {
        res.send(err)
    })
}

exports.getParticipants = (req, res) => {
    const userId = req.profile.userid;

    let sql =  `
        select listingid, L_category
        from listings
        inner join participants
        on 
        (listings.L_accepted >= listings.L_count and listings.listingid = participants.listing_id and participants.user_id = ${userId});
    `
    db.execute(sql)
    .then((p) => {
        res.json(p[0])
    })
    .catch((err) => {
        res.send(err);
    })
}