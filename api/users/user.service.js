const pool = require('../../config/database');

module.exports = {
    create:(data,callback) => {
        pool.query('insert into tblUsers (userName,userSurname,userEmail,userTelephone,userTC,userPassword,userActive,userGender) values(?,?,?,?,?,?,?,?)',
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
        pool.query('select userID,userName,userSurname,userEmail,userTelephone,userTC,userGender,userPassword,userActive from tblUsers', 
        [],
        (error,results,fields) =>{
            if(error){
               return callBack(error);
            }
            return callBack(null,results);
        });
    },
    //getUserByUserIdforxml:(userID,callback) => {
    //    pool.query('select userID,userName,userSurname,userEmail,userTelephone,userTC,userGender,userPassword,userActive from tblUsers where userID = ?;',[userID],
    //        (err,results)=>{
    //            if(err){
    //                return callback(err);
    //            }
    //            //console.log(results);
    //            return callback(null,results);
    //        }
    //    );
    //},
    getUserByUserId: (userID,callBack)=>{
        pool.query('select userID,userName,userSurname,userEmail,userTelephone,userTC,userGender,userPassword,userActive from tblUsers where userID = ?',[userID],
        (error,results,fields) =>{
            if(error){
                callBack(error);
            }
            return callBack(null,results[0]);
            }
        );
    },
    updateUser: (data,callBack) => {
        pool.query('update tblUsers set userName =?,userSurname=?,userEmail=?,userTelephone=?,userTC=?,userGender=?,userPassword=?,userActive=? where userID =?',
        [
          data.userName,
          data.userSurname,
          data.userEmail,
          data.userTelephone,
          data.userTC,
          data.userGender,
          data.userPassword,    
          data.userActive,
          data.userID            
        ],
        (error,results,fields) =>{
            if(error){
                callBack(error);
            }
            console.log(results)
            return callBack(null,results["changedRows"]);
        }
    );
    },
    
    deleteUser: (id,callBack) =>{
        //console.log(data.userID)
        pool.query("DELETE FROM MTSK.tblUsers WHERE userID = ?",
        [id],
        (error,results,fields) =>{
            console.log(results)
            if(error){
                callBack(error);
            }
            return callBack(null,results["affectedRows"]); 
        });
    },
    getUserByUserEmail: (userEmail, callBack) => {
        pool.query('select * from tblUsers where userEmail = ? ',
        [userEmail],
        (error,results,fields) =>{
            if(error){
                callBack(error);
            }
            return callBack(null,results[0]);
        }
        );
    }


    
};