const pool = require('../../config/database');

module.exports = {
    create:(data,callback) => {
        pool.query('insert into USERS (userName,userSurname,userEmail,userTelephone,userTC,userPassword,userActive,userGender) values(?,?,?,?,?,?,?,?)',
        [
        data.userName,
        data.userSurname,
        data.userEmail,
        data.userTelephone,
        data.userTC,
        data.userPassword,
        data.userActive,
        data.userGender
        ],
        (error,results,fields)=>{
            if(error){
               return callback(error)
            }
            return callback(null,results)
          }
        );
    },
    getUsers: callBack => {
        pool.query('select id,userName,userSurname,userEmail,userTelephone,userTC,userGender,userPassword,userActive from USERS', 
        [],
        (error,results,fields) =>{
            if(error){
               return callBack(error);
            }
            return callBack(null,results);
        });
    },
    getUserByUserId: (id,callBack)=>{
        pool.query('select id,userName,userSurname,userEmail,userTelephone,userTC,userGender,userPassword,userActive from USERS where id=?   ',[id],
        (error,results,fields) =>{
            if(error){
                callBack(error);
            }
            return callBack(null,results[0]);
            }       
        );
    },
    updateUser: (data,callBack) => {
        pool.escape.query('update USERS set userName =?,userSurname=?,userEmail=?,userTelephone=?,userTC=?,userGender=?,userPassword=?,userActive=? where id =?',
        [
          data.id,
          data.userName,
          data.userSurname,
          data.userEmail,
          data.userTelephone,
          data.userTC,
          data.userPassword,
          data.userActive,
          data.userGender
        ],
        (error,results,fields) =>{
            if(error){
                callBack(error);
            }
            return callBack(null,results[0]);
        }   
    );    
    },
    deleteUser: (data,callBack) =>{
        pool.query('delete from USERS where id = ?',
        [data.id],
        (error,results,fields) =>{
            if(error){
                callBack(error);
            }
            return callBack(null,results[0]);
          }            
        );
    },
    getUserByUserEmail: (userEmail, callBack) => {
        pool.query('select * from USERS where userEmail = ?',
        [userEmail],
        (error,results,fields) =>{
            if(error){
                callBack(error);
            }
            return callBack(null,results[0]);
        }
        );
    },
};