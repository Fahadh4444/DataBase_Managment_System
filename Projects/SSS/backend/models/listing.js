const db = require('../config/db');

class Listing{
    constructor(money, count, category, content, userId, picture){
        this.share = (money/count),
        this.userId = userId
        this.money = money,
        this.count = count,
        this.category = category,
        this.content = content,
        this.picture = picture
    }
    
    create(){
        let sql = `
            INSERT into listings(
                userid,
                L_count,
                L_content,
                L_share,
                L_category,
                L_photo
            )
            Values(
                ${this.userId},
                ${this.count},
                "${this.content}",
                ${this.share},
                "${this.category}",
                "${this.picture}"
            );
        `;

        return db.execute(sql);
    }
}

module.exports = Listing;