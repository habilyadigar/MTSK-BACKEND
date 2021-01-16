const {
    //addOrderXml,
    addOrder, 
    getAddress,
    getTempOrders,
    //ADDress,
    deleteTempOrder,
    ClearTempOrder,
    addAddressXml,
} =require("./tmporder.controller");
const router = require("express").Router();
const {checkToken} = require("../../auth/validation");

router.get('/',checkToken,getTempOrders);
router.post('/',checkToken,addOrder);
//router.post('/',checkToken,addOrderXml);
router.get('/getaddress',getAddress);
router.post('/delete',checkToken,deleteTempOrder);
router.get('/clear',checkToken,ClearTempOrder);
//router.post('/ADDress',checkToken,ADDress);
router.post('/ADDress',checkToken,addAddressXml);

module.exports = router;