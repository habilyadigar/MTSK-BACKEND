const {
    addOrder

} =require("./order.controller");
const router = require("express").Router();
const {checkToken} = require("../../auth/validation");

router.post('/addOrder',checkToken,addOrder);
//router.get('/',checkToken,getTempOrders);
//router.get('/cities',checkToken,getAddress);
//router.delete('/',checkToken,deleteTempOrder);
//router.post('/ADDress',checkToken,ADDress);


module.exports = router;