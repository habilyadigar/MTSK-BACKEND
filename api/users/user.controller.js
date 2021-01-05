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
        body.usersPassword = hashSync(body.usersPassword,salt);
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
                data : results
            });
        });
    },
    getUserByUserId: (req,res) =>{
        const usersId = req.params.id;
        getUserByUserId(usersId,(err,results)=>{
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
        body.usersPassword = hashSync(body.usersPassword,salt);
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
        const data = req.body;
        deleteUser(data, (err,results)=>{
            if(err){
                console.log(err);
                return;
            }
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
        getUserByUserEmail(body.usersEmail, (err, results) => {
            if(err){
                console.log(err);
            }
            if(!results){
                return res.json({
                    success:0,
                    data: "INVALID EMAIL OR PASSWORD11111"
                });
            }

            //const salt = genSaltSync(10);
            //hash=hashSync(body.usersPassword,salt)
            //console.log(hash)
            var sonuc = bcrypt.compare(body.usersPassword,results.usersPassword);
            console.log(sonuc)
            console.log(body.usersPassword)
            console.log(results.usersPassword)
            if(sonuc){
                results.usersPassword = undefined;
                const jsontoken = sign({user:results.usersEmail},"mtskbackend",{expiresIn: "24h"});
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