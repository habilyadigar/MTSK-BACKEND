const {
    addOrder, 
    getUserByUserId,
    getTempOrders,
    updateUser,
    deleteUser,
    login
} =require("./tmporder.controller");
const router = require("express").Router();
const {checkToken} = require("../../auth/validation");

router.get('/',checkToken,getTempOrders);
router.post('/',checkToken,addOrder);
//router.get('/:userID',checkToken,getUserByUserId);
//router.patch('/',checkToken,updateUser);
//router.delete('/',checkToken,deleteUser);
//router.post('/login',login);


module.exports = router;