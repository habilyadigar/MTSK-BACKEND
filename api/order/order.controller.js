const { 
    addNewOrder,
    order 
} = require("./order.service")
const jwt_decode = require('jwt-decode');
const { checkToken } = require("../../auth/validation");
var dateTime = require('node-datetime');
const xml2js = require('xml2js');
const builder = new xml2js.Builder({
    rootName: 'mtsk-xml',
    renderOpts: { pretty: false }
});
var format = require('date-format');
var dateFormat = require('dateformat');

module.exports = {
    addOrder: (req,res)=>{
        //var dt = dateTime.create();
        //var formatted = dt.format('Y-m-d');
        //console.log(formatted);
        const body = req.body;
        var date=dateFormat(new Date(), "yyyy-mm-dd");
        const authHeader = req.headers.authorization
        const token = authHeader.split(' ')[1]
        var decoded = jwt_decode(token);
        console.log("decoded.id:",decoded.id);
        body.userID = decoded.id;
        body.orderDate = date;
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
        //console.log("decoded.id:",decoded.id);
        id = decoded.id;
        order (id,(err,results)=>{
            if(err){
                console.log(err);
                return;
            }
            results[0].orderDate = dateFormat(results[0].orderDate,"yyyy-mm-d",true);     
            res.set('Content-Type', 'text/xml');
            try {
                //console.log(results);
                var xmlObj = builder.buildObject(results[0]);
                res.send(xmlObj);
            } catch (err) {
                res.sendStatus(400);
            }
        });
    }
}