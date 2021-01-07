const { 
    create, 
    getUserByUserEmail,
    getUserByUserId,
    getUsers,
    updateUser,
    deleteUser 
} = require("./user.service")
const bcrypt = require("bcrypt")
const {genSaltSync, hashSync, compareSync} = require("bcrypt")
const { sign } = require("jsonwebtoken");
const { token } = require("morgan");

module.exports = {
    createUser: (req,res)=>{
        const body = req.body;
        const salt = genSaltSync(10);
        body.userPassword = hashSync(body.userPassword,salt);
        create(body, (err,results)=>{
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
    getUserByUserId: (req,res) =>{
        const userID = req.params.userID;
        getUserByUserId(userID, (err,results)=>{
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success:0,
                    message: "USER IS NOT FOUND"
                })
            }
            return res.json({
                success:1,
                data : results
            });
        });
    },
    getUsers:(req,res)=>{
        getUsers((err,results)=>{
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
    updateUser: (req,res)=>{
        const body = req.body;
        const salt = genSaltSync(10);
        body.userPassword = hashSync(body.userPassword,salt);
        updateUser(body,(err,results)=>{
            if(err){
                console.log(err);
                return false;                
            }
            if(!results){
                return res.json({
                    success:0,
                    message: "FAILED TO UPDATE USER"
                })
            }
            return res.json({
                success:1,
                message:"UPDATE SUCCESFULLY"
            });
        });
    },
    deleteUser: (req,res)=>{
        var data = req.body;
        deleteUser(data, (err,results)=>{
            if(err){
                console.log(err);
                return;
            }
            console.log(results)      
            if(!results){             
                return res.json({
                    success:0,
                    message: "USER NOT FOUND"
                });
            }
            return res.json({
                success:1,
                message: "USER DELETED"
            });
        });
    },
    login: (req,res) => {
        const body = req.body;
        getUserByUserEmail(body.userEmail, (err, results) => {
            if(err){
                console.log(err);
            }
            if(!results){
                return res.json({
                    success:0,
                    data: "INVALID EMAIL OR PASSWORD"
                });
            }
            var sonuc = bcrypt.compare(body.userPassword,results.userPassword);
            if(sonuc){
                results.userPassword = undefined;
                const jsontoken = sign({user:results.userEmail},"mtskbackend",{expiresIn: "24h"});
                return res.json({
                    success:1,
                    message: "LOGIN SUCCES!!",
                    token: jsontoken
                });
            }else{
                return res.json({
                    success:0,
                    data: "INVALID EMAIL OR PASSWORD"
                });
            }
        });
    }

};