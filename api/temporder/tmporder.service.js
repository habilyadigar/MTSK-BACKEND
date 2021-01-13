const pool = require('../../config/database');
let rows_address,rows_basket;


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
    //stored procedure ile id yi vererek kullanıcıların adresini ve siparişini çekiyorum.
    getTmpOrders:(id ,callBack) => {
        pool.query('call spGetBasket(?);',
        [id],
        (error,results,fields) =>{
            if(error){
               return callBack(error);
            }
            return callBack(null,results[0]);
        });
    },
    
    getTmpAddress: (id ,callBack) => {
        var data = {siparisData:[],addressData : []}
         pool.query('call spGetBasket(?);',[id],
        (err,results)=>{
            if(err){
                return callBack(err);
            }
            data.siparisData = results[0];
            pool.query('call spGetUserAddress(?);',[id],
            (err,results)=>{
                if(err){
                    return callBack(err);
                }
                data.addressData = results[0];
                console.log(data)
                return callBack (null,data);
            });
        });
    },    
    //DELETE FROM `MTSK`.`tblTempOrder` WHERE (`userID` ='?') AND (`tOrderID`='?');
    deleteTmpOrders: (data,callBack) =>{
        console.log(data);
        pool.query("call spTempOrderDelete(?,?);",
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