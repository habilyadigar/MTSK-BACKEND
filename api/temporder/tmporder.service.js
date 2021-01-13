const pool = require('../../config/database');



module.exports = {
    add:(data,callback) => {
        pool.query('insert into tblTempOrder (tOrderPiece,tOrderPrice,tOrderCase,userID) values(?,?,?,?)',
        [
        data.torderPiece,
        data.torderPrice,
        data.torderCase,
        data.userID,
        ],
        (error,results,fields)=>{
            if(error){
               return callback(error)
            }
            return callback(null,results)
          }
        );
    },
    //SELECT tOrderID,userID,tOrderPiece,tOrderPrice,tOrderCase from tblTempOrder
    //stored procedure ile id yi vererek kullanıcıları çekiyorum.
    getTmpOrders:(id ,callBack) => {
        pool.query('call spGetBusket(?)',
        [id],
        (error,results,fields) =>{
            if(error){
               return callBack(error);
            }
            return callBack(null,results[0]);
        });
    },    

    deleteTmpOrders: (data,callBack) =>{
        pool.query("DELETE FROM `MTSK`.`tblTempOrder` WHERE (`userID` ='?') AND (`tOrderID`='?');",
        [
        data.userID, 
        data.tOrderID
        ],
        (error,results,fields) =>{
            if(error){
                callBack(error);
            }
            console.log(results)
            return callBack(null,results['affectedRows']);          
        });
    }, 

    
}