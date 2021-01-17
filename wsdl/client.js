var soap = require('soap');
var url = 'http://localhost:8000/wsdl?wsdl';

// Create client
soap.createClient(url,(err, client)=> {
  if (err){
    console.log(err);
    return err;
  }
  /* 
  * Parameters of the service call: they need to be called as specified
  * in the WSDL file
  */
  var args = {
    cityID : "1",
    openAddress: "yeşilsırt",
    districtID : "12",
    userID : "1"
  };

  // call the service
  client.addAddress(args,function(err, res) {
    if (err){
      console.log(err);
      throw err;
    }
    // print the service returned result
    console.log(res); 
  });
});
