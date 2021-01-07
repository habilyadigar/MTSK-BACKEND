const pool = require('../../config/database');



module.exports = {
    add:(data,callback) => {
        pool.query('insert into tblTempOrders (t_orderPiece,t_orderTotalPrice,t_orderCase,userID) values(?,?,?,?)',
        [
        data.t_orderPiece,
        data.t_orderTotalPrice,
        data.t_orderCase,
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
        pool.query('SELECT t_orderPiece,t_orderTotalPrice,t_orderCase,userID from tblTempOrders',
        //View gelecek. id si x olan kişinin verdiği siparişler şeklinde. 
        [],
        (error,results,fields) =>{
            if(error){
               return callBack(error);
            }
            return callBack(null,results);
        });
    },










    
}