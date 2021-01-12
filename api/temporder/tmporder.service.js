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
    getTmpOrders: callBack => {
        pool.query('SELECT tOrderID,userID,tOrderPiece,tOrderPrice,tOrderCase from tblTempOrder',
        //View gelecek. id si x olan kişinin verdiği siparişler ve adresi şeklinde. 
        [],
        (error,results,fields) =>{
            if(error){
               return callBack(error);
            }
            return callBack(null,results);
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