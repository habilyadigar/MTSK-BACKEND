const pool = require('../../config/database');



module.exports = {
    addNewOrder:(data,callback) => {
        pool.query('insert into tblOrders (orderPiece,orderDate,orderTotalPrice,userID,addressID,paymentID,shipmentID) values(?,?,?,?,?,?,?)',
        [
        data.orderPiece,
        data.orderDate,
        data.orderTotalPrice,
        data.userID,
        data.addressID,
        data.paymentID,
        data.shipmentID
        ],
        (error,results,fields)=>{
            if(error){
               return callback(error)
            }
            return callback(null,results)
          }
        );
    },
//SELECT userID,orderPiece,orderDate,orderTotalPrice,addressID,paymentID,shipmentID FROM tblOrders where userID = ?;
    order:(id,callback) => {
        pool.query('call spOrderDetails(?);',[id],
            (err,results)=>{
                if(err){
                    return callback(err);
                }
                return callback(null,results[0]);
            }
        );
    },
////////////////////////////CREDIT CARD SERVICES//////////////////////////















}