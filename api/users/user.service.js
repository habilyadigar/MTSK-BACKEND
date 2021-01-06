const pool = require('../../config/database');

module.exports = {
    create:(data,callback) => {
        pool.query('insert into tbl_users (usersName,usersSurname,usersEmail,usersTelephone,usersTC,usersPassword,usersIsActive,usersSex) values(?,?,?,?,?,?,?,?)',
        [
        data.usersName,
        data.usersSurname,
        data.usersEmail,
        data.usersTelephone,
        data.usersTC,
        data.usersPassword,
        data.usersIsActive,
        data.usersSex
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
        pool.query('select usersId,usersName,usersSurname,usersEmail,usersTelephone,usersTC,usersSex,usersPassword,usersIsActive from tbl_users', 
        [],
        (error,results,fields) =>{
            if(error){
               return callBack(error);
            }
            return callBack(null,results);
        });
    },
    getUserByUserId: (usersId,callBack)=>{
        pool.query('select usersId,usersName,usersSurname,usersEmail,usersTelephone,usersTC,usersSex,usersPassword,usersIsActive from tbl_users where usersId=?   ',[usersId],
        (error,results,fields) =>{
            if(error){
                callBack(error);
            }
            return callBack(null,results[0]);
            }       
        );
    },
    updateUser: (data,callBack) => {
        pool.escape.query('update tbl_users set usersName =?,usersSurname=?,usersEmail=?,usersTelephone=?,usersTC=?,usersSex=?,usersPassword=?,usersIsActive=? where usersId =?',
        [
          data.usersId,
          data.usersName,
          data.usersSurname,
          data.usersEmail,
          data.usersTelephone,
          data.usersTC,
          data.usersPassword,
          data.usersIsActive,
          data.usersSex
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
        pool.query('delete from tbl_users where usersId = ?',
        [data.usersId],
        (error,results,fields) =>{
            if(error){
                callBack(error);
            }
            return callBack(null,results[0]);
          }            
        );
    },
    getUserByUserEmail: (usersEmail, callBack) => {
        pool.query('select * from tbl_users where usersEmail = ?',
        [usersEmail],
        (error,results,fields) =>{
            if(error){
                callBack(error);
            }
            return callBack(null,results[0]);
        }
        );
    },
};