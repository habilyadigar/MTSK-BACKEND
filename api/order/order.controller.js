const { 
    addNewOrder 
} = require("./order.service")
const jwt_decode = require('jwt-decode');
const { checkToken } = require("../../auth/validation");
var dateTime = require('node-datetime');



module.exports = {
    addOrder: (req,res)=>{
        var dt = dateTime.create();
        var formatted = dt.format('Y-m-d');
        console.log(formatted);
        const body = req.body;
        const authHeader = req.headers.authorization
        const token = authHeader.split(' ')[1]
        var decoded = jwt_decode(token);
        console.log("decoded.id:",decoded.id);
        body.userID = decoded.id;
        body.orderDate = formatted;
        addNewOrder(body, (err,results)=>{
            if(err){
                return res.status(500).json({
                    success: 0,
                    message: "DATABASE CONNECTION ERROR"
                });
            }
            return res.status(200).json({
                success:1,
                data : body
            });
        });
    },
}