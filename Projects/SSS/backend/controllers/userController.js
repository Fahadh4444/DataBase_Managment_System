const db = require('../config/db');
const User = require("../models/user");


exports.getUserById = (req, res, next, id) => {
    let sql = `SELECT * FROM users WHERE userid = ${id};`;
    db.execute(sql)
    .then((u) => {
        req.profile = u[0][0];
        next();
    })
    .catch((err)=>{
        res.json({error : err});
        next()
    })
};


exports.getUsers = (req, res) => {
    const {listingid} = req.listing;
    let sql = `
        select username, email, mobileno
        from users
        inner join participants
        on
        (participants.listing_id = ${listingid} and users.userid = participants.user_id);
    `;
    db.execute(sql)
    .then((l) => {
        console.log(l[0]);
        res.send(l[0]);
    })
    .catch((err) => {
        res.send(err);
    })
}