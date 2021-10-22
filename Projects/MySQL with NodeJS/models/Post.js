const db = require('../config/db');

class Post{
    constructor(title, body){
        this.title = title,
        this.body = body
    }

    save(){
         let d = new Date();
         let year = d.getFullYear();
         let month = d.getMonth()+1;
         let date = d.getDate();

         let createAtDate = `${year}-${month}-${date}`;

         let sql = `
            INSERT INTO posta(
                title,
                body,
                created_at
            )
            VALUES(
                '${this.title}',
                '${this.body}',
                '${createAtDate}'
            );
          `;
        return db.execute(sql);
     }

     static findAll(){
         let sql = "SELECT * FROM posta;";
         return db.execute(sql);
     }

     static findById(id){
         let sql = `SELECT * FROM posta WHERE id = ${id};`;
         return db.execute(sql);
     }
}

module.exports = Post;