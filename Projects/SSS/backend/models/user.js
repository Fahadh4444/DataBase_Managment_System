const db = require('../config/db');

class User{
    constructor(username, email, mobileno, dob, password){
        this.username = username,
        this.email = email,
        this.mobileno = mobileno,
        this.dob = dob,
        this.password = password
    }

    create(){
        let d = new Date();
        let year = d.getFullYear();
        let month = d.getMonth()+1;
        let date = d.getDate();

        let createAtDate = `${year}-${month}-${date}`;
        let sql = `
            INSERT INTO users(
                username,
                email,
                mobileno,
                dob,
                password,
                createdAt
            )
            VALUES(
                '${this.username}',
                '${this.email}',
                '${this.mobileno}',
                '${this.dob}',
                '${this.password}',
                '${createAtDate}'
            );
        `;

        return db.execute(sql);
    }

    find(){
        let sql = `
            SELECT * FROM users WHERE username = "${this.username}";
        `;
        return db.execute(sql);
    }
}

module.exports = User;