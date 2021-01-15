const { 
    addNewOrder,
    order 
} = require("./order.service")
const jwt_decode = require('jwt-decode');
const { checkToken } = require("../../auth/validation");
var dateTime = require('node-datetime');
const xml2js = require('xml2js');
const builder = new xml2js.Builder({
    rootName: 'mtsk',
    renderOpts: { pretty: false },
    xmldec : { 'version': '1.0', 'encoding': 'UTF-8', 'standalone': true }
});


module.exports = {
    addOrder: (req,res)=>{
        var dt = dateTime.create();
        var formatted = dt.format('Y-m-d');
        console.log(formatted);
        const body = req.body;
        const authHeader = req.headers.authorization
        const token = authHeader.split(' ')[1]
        var decoded = jwt_decode(token);
        console.log("decoded.id:",decoded.id);
        body.userID = decoded.id;
        body.orderDate = formatted;
        addNewOrder(body, (err,results)=>{
            if(err){
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
    getOrderXml:(req,res)=>{
        const authHeader = req.headers.authorization
        const token = authHeader.split(' ')[1]
        var decoded = jwt_decode(token);
        console.log("decoded.id:",decoded.id);
        id = decoded.id;
        order (id,(err,results)=>{
            if(err){
                console.log(err);
                return;
            }
            res.set('Content-Type', 'text/xml');
            try {
                console.log(results[0].orderDate)
                var xmlObj = builder.buildObject(results[0])
                res.send(xmlObj)
            } catch (err) {
                res.sendStatus(400)
            }
        });
    }
}