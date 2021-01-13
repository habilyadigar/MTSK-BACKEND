const { 
    add, 
    getAddressCities,
    //getTmpOrders,
    getTmpOrdersAndAddress,
    addAddress,
    deleteTmpOrders 
} = require("./tmporder.service")
const jwt_decode = require('jwt-decode');
const { checkToken } = require("../../auth/validation");

module.exports = {
    addOrder: (req,res)=>{
        const body = req.body;
        add(body, (err,results)=>{
            if(err){
                //console.log(err);
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
 
    getTempOrders:(checkToken,res)=>{
        const id = checkToken["decoded"].id;
        //console.log(id);
        getTmpOrdersAndAddress (id, (err,results)=>{
            if(err){
                console.log(err);
                return;
            }
            return res.json({
                success:1,
                data: results
            });
        });
    },
    deleteTempOrder: (req,res)=>{
        const data = req.body;
        const authHeader = req.headers.authorization
        const token = authHeader.split(' ')[1]
        var decoded = jwt_decode(token);
        console.log("decoded.id:",decoded.id);
        data.userID = decoded.id;
        deleteTmpOrders(data, (err,results)=>{
            if(err){
                console.log(err);
                return;
            }                
            if(!results){
                return res.json({
                    success:0,
                    message: "ORDER OR USER NOT FOUND"
                });
            }
            return res.json({
                success:1,
                message: "ORDER DELETED"
            });
        });
    },
//////////////////////////////ADDRESS//////////////////////////////
    ADDress: (req,res)=>{
        const body = req.body;
        const authHeader = req.headers.authorization
        const token = authHeader.split(' ')[1]
        var decoded = jwt_decode(token);
        //console.log("decoded.id:",decoded.id);
        body.userID = decoded.id;
        addAddress(body, (err,results)=>{
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
    getAddress:(req,res)=>{
        getAddressCities ((err,results)=>{
            if(err){
                console.log(err);
                return;
            }
            return res.json({
                success:1,
                data: results
            });
        });
    }


}