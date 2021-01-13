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
}