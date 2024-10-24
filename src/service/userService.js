import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';
import bluebird from 'bluebird';



const salt = bcrypt.genSaltSync(10);


  
const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const createNewUser = async(email, password, username) => {
    let hashPass = hashUserPassword(password);
    //A simple SELECT query
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird,
      });

      const [rows, fields] = await connection.execute(
        'INSERT INTO users(email, password, username) VALUES(?, ?, ?)', [email, hashPass, username],
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
   
    try {
        const [rows, fields] = await connection.execute(
            'SELECT * from users',
          );
          console.log(">>>check rows: ", rows)
          return rows;
    } catch (error) {
        console.log(">>>check error: ", error)
    }
    
}

const deleteUser = async(id) => {
    //DELETE FROM users WHERE id='Alfreds Futterkiste';
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird,
      });
    ;    let users = []
       
        try {
            const [rows, fields] = await connection.execute(
                'DELETE FROM users WHERE id=?',[id]
              );
              console.log(">>>check rows: ", rows)
              return rows;
        } catch (error) {
            console.log(">>>check error: ", error)
        }
}

const getUserbyId = async(id) => {
    //DELETE FROM users WHERE id='Alfreds Futterkiste';
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird,
      });
    ;    let users = []
       
        try {
            const [rows, fields] = await connection.execute(
                'SELECT * FROM users WHERE id=?',[id]
              );
              console.log(">>>check rows: ", rows)
              return rows;
        } catch (error) {
            console.log(">>>check error: ", error)
        }
}

const updateUserInfor  = async(email, username, id) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird,
      });
    ;    let users = []
       
        try {
            const [rows, fields] = await connection.execute(
                'UPDATE users SET email = ?, username = ? WHERE id = ?', [email, username, id]
              );
              return rows;
        } catch (error) {
            console.log(">>>check error: ", error)
        }
}

module.exports = {
    createNewUser,getUserList, deleteUser, getUserbyId, updateUserInfor,

}