const db = require('../config/db');

class Chat{
    constructor(content, userId, listingId){
        this.content = content,
        this.userId = userId,
        this.listingId = listingId
    }
    create(){
        let sql = `
            INSERT into chats(
                userId,
                listingId,
                c_content
            )
            Values(
                ${this.userId},
                ${this.listingId},
                "${this.content}"
            );
        `;

        return db.execute(sql);
    }
}

module.exports = Chat;