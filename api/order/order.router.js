const {
    addOrder,
    getOrderXml

} =require("./order.controller");
const router = require("express").Router();
const {checkToken} = require("../../auth/validation");

router.post('/addOrder',checkToken,addOrder);
router.get('/',checkToken,getOrderXml);
//router.get('/cities',checkToken,getAddress);
//router.delete('/',checkToken,deleteTempOrder);
//router.post('/ADDress',checkToken,ADDress);


module.exports = router;