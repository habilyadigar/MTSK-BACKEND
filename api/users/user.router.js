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

router.get('/',checkToken,getUsers);
router.post('/',createUser);
router.get('/:userID',checkToken,getUserByUserId);
router.patch('/',checkToken,updateUser);
router.delete('/',checkToken,deleteUser);
router.post('/login',login);


module.exports = router;