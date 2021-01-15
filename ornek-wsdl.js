const { json } = require('body-parser')
const { db, jwt} = require('../app')
const router = require('express').Router()
const { request } = require('express')
const { verifyToken } = require('../middlewares/verifyToken')
const xml2js = require('xml2js');
const { route } = require('./auth')

const builder = new xml2js.Builder({
    rootName: 'Shelter',
    renderOpts: { pretty: false }
});

// Shelter routes

// Get Shelter - XML
router.get("/shelter", (req, res) => {
    var ShelterId = req.query.id
    let sql = "SELECT * FROM Shelters WHERE ShelterId = ?"
    let query = db.query(sql, ShelterId, (err, result) => {
        if(err) return res.sendStatus(400)
        res.set('Content-Type', 'text/xml');
        try{
            var xmlObj = builder.buildObject(result[0])
            res.send(xmlObj)
            }  
        catch(err){
            res.sendStatus(400)
        }
    })
})

// Add Shelter - XML
router.post('/shelter', verifyToken, (req, res) => {
    const authHeader = req.headers.authorization
    if(authHeader){
        const token = authHeader.split(' ')[1]
        jwt.verify(token, 'secretkey', (err, userData) => {
            if(err) res.status(403).send("Forbidden")
            else {
                var UserRole = userData['UserRole']
                if (UserRole === 0 || UserRole === null) return res.status(403).send("Forbidden")
                var sqlData = {
                    ShelterCityId: req.body.Shelters.Shelter[0].ShelterCityId,
                    ShelterCountryId: req.body.Shelters.Shelter[0].ShelterCountryId,
                    ShelterName: req.body.Shelters.Shelter[0].ShelterName,
                }
                let sql = "INSERT INTO Shelters SET ?"
                let query = db.query(sql, sqlData, (err, result) => {
                    if(err) throw err;
                    res.sendStatus(200)
                })
            }
    })
}})

// Delete Shelter - XML
router.delete('/shelter', verifyToken, (req, res) => {
    const authHeader = req.headers.authorization
    if(authHeader){
        const token = authHeader.split(' ')[1]
        jwt.verify(token, 'secretkey', (err, userData) => {
            if(err) res.status(403).send("Forbidden")
            else {
                var UserRole = userData['UserRole']
                if (UserRole === 0 || UserRole === null) return res.status(403).send("Forbidden")
                var ShelterId = req.body.Shelter.ShelterId
                let sql = "DELETE FROM Shelters WHERE ShelterId = ?"
                let query = db.query(sql, ShelterId, (err, result) => {
                    if(err) throw err;
                    res.sendStatus(200)
                })
            }
    })
}})

// Add Shelter - XML
router.put('/shelter', verifyToken, (req, res) => {
    const authHeader = req.headers.authorization
    if(authHeader){
        const token = authHeader.split(' ')[1]
        jwt.verify(token, 'secretkey', (err, userData) => {
            if(err) res.status(403).send("Forbidden")
            else {
                var UserRole = userData['UserRole']
                if (UserRole === 0 || UserRole === null) return res.status(403).send("Forbidden")
                var ShelterId = req.body.Shelters.Shelter[0].ShelterId
                var sqlData = {
                    ShelterCityId: req.body.Shelters.Shelter[0].ShelterCityId,
                    ShelterCountryId: req.body.Shelters.Shelter[0].ShelterCountryId,
                    ShelterName: req.body.Shelters.Shelter[0].ShelterName,
                }
                let sql = "UPDATE Shelters SET ? WHERE ShelterId = ?"
                let query = db.query(sql, [sqlData, ShelterId ], (err, result) => {
                    if(err) throw err;
                    res.sendStatus(200)
                })
            }
    })
}})