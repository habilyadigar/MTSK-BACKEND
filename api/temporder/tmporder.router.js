const {
    addOrder, 
    getAddress,
    getTempOrders,
    ADDress,
    deleteTempOrder
} =require("./tmporder.controller");
const router = require("express").Router();
const {checkToken} = require("../../auth/validation");

router.get('/',checkToken,getTempOrders);
router.post('/',checkToken,addOrder);
router.get('/cities',checkToken,getAddress);
router.post('/delete',checkToken,deleteTempOrder);
router.post('/ADDress',checkToken,ADDress);

module.exports = router;