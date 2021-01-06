const pool = require('../../config/database');



module.exports = {
    create:(data,callback) => {
        pool.query('insert into USERS (userName,userSurname,userEmail,userTelephone,userTC,userPassword,userActive,userGender) values(?,?,?,?,?,?,?,?)',
        [
        data.userName,
        data.userSurname,
        data.userEmail,

        ],
        (error,results,fields)=>{
            if(error){
               return callback(error)
            }
            return callback(null,results)
          }
        );
    },
}