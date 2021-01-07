const { 
    add, 
    //getUserByUserEmail,
    //getUserByUserId,
    getTmpOrders,
    //updateUser,
    //deleteUser 
} = require("./tmporder.service")

module.exports = {
    addOrder: (req,res)=>{
        const body = req.body;
        add(body, (err,results)=>{
            if(err){
                console.log(err);
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
    getTempOrders:(req,res)=>{
        getTmpOrders((err,results)=>{
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











}