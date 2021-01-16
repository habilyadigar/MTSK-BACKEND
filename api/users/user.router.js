const {
    createUser, 
    getUserByUserId,
    getUsers,
    updateUser,
    deleteUser,
    login
} =require("./user.controller");
const router = require("express").Router();
const {checkToken} = require("../../auth/validation");

router.get('/all',checkToken,getUsers);
router.post('/',createUser);
router.get('/',checkToken,getUserByUserId);
router.post('/update',checkToken,updateUser);
router.post('/delete',checkToken,deleteUser);
router.post('/login',login);


module.exports = router;