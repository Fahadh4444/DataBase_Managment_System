const db = require('../config/db');
const Chat = require("../models/chat");


exports.sending = (req, res) => {
    const {content} = req.body;
    const userId = req.profile.userid;
    const listingId = req.listing.listingid;
    let msg = new Chat(content, userId, listingId);

    msg.create()
    .then((c) => {
        res.send("Yes");
    })
    .catch((err) => {
        res.send(err);
    })
}

exports.recieving = (req, res) => {
    const listingId = req.listing.listingid;
    let sql = ` SELECT * FROM chats WHERE listingid = ${listingId};`;
    db.execute(sql)
    .then((msgs) => {
        console.log(msgs[0]);
        res.send(msgs[0]);
    })
    .catch((err) => {
        res.send(msgs);
    })
}

