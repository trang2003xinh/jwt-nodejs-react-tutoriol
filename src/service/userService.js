import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';
import bluebird from 'bluebird';



const salt = bcrypt.genSaltSync(10);


  
const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const createNewUser = (email, password, username) => {
    let hashPass = hashUserPassword(password);
    //A simple SELECT query
    connection.query(
    'INSERT INTO users(email, password, username) VALUES(?, ?, ?)', [email, hashPass, username],
    function (err, results, fields) {
        if (err) {
            console.log(err)
        }
    }
    );
}

const getUserList = async() => {
    // create the connection, specify bluebird as Promise
const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'jwt',
    Promise: bluebird,
  });
;    let users = []
    // connection.query(
    //     'SELECT * from users',
    //     function (err, results, fields) {
    //         if (err) {
    //             console.log(err)
    //             return users;
    //         }
    //         users = results;
    //         console.log(">>>run get user list: ", users)
    //         return users;
    //     }
    // );
    try {
        const [rows, fields] = await connection.execute(
            'SELECT * from users',
            ['Morty', 14]
          );
          console.log(">>>check rows: ", rows)
          return rows;
    } catch (error) {
        console.log(">>>check error: ", error)
    }
    
}


module.exports = {
    createNewUser,getUserList,
}