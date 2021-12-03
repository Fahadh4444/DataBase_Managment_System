const db = require('../config/db');

class Participant{
    constructor(userId, listingId, admin){
        this.userId = userId,
        this.listingId = listingId,
        this.admin = admin
    }

    create(){
        let sql = `
            INSERT into participants(
                user_id,
                listing_id,
                L_admin
            )
            Values(
                ${this.userId},
                ${this.listingId},
                "${this.admin}"
            );
        `;

        return db.execute(sql);
    }
}

module.exports = Participant;