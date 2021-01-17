var soap = require('soap');
var url = 'http://localhost:8000/wsdl?wsdl';


soap.createClient(url,(err, client)=> {
  if (err){
    console.log(err);
    return err;
  }
  var args = {
    cityID : "1",
    openAddress: "Muratlı-Tekirdağ",
    districtID : "12",
    userID : "1"
  };

  client.addAddress(args,function(err, res) {
    if (err){
      console.log(err);
      throw err;
    }
    console.log(res);
  });
});
