const { 
    add, 
    getAddressCities,
    //getTmpOrders,
    getTmpOrdersAndAddress,
    addAddress,
    deleteTmpOrders,
    deleteAllTmpOrders,
} = require("./tmporder.service")
const jwt_decode = require('jwt-decode');
const { checkToken } = require("../../auth/validation");
const xml2js = require('xml2js');
const bodyParser = require('body-parser');


module.exports = {
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
    addOrder: (req,res)=>{
        const body = req.body;
        const authHeader = req.headers.authorization
        const token = authHeader.split(' ')[1]
        var decoded = jwt_decode(token);
        console.log("decoded.id:",decoded.id);
        body.userID = decoded.id;
        add(body, (err,results)=>{
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
    ClearTempOrder: (req,res)=>{
        const data = req.body;
        const authHeader = req.headers.authorization
        const token = authHeader.split(' ')[1]
        var decoded = jwt_decode(token);
        //console.log("decoded.id:",decoded.id);
        data.userID = decoded.id;
        deleteAllTmpOrders(data, (err,results)=>{
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
                message: "ORDERS CLEARED"
            });
        });
    },


//////////////////////////////ADDRESS//////////////////////////////
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
    },
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
    
}