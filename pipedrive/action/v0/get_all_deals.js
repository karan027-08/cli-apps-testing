
module.exports = {

  name: "get_all_deals",

  title: "Get All Deals",

  description: "",
  version: "v0",

  input:{
    title: "Get All Deals",
    type: "object",
    properties: {
      "Deal id":{
        "title" : "deal_id",
        "type" : "number",
        "description" : "Select the deal id " 
      }
    }
  },

  output: {
    title: "output",
  	type: "object",
  	properties: {

    }
  },

  mock_input:{},

  execute: function(input, output){
    // to access auth info use input.auth , eg: input.auth.username
    // and to return output use output callback like this output(null, { 'notice' : 'successful'})
    // your code here
    var request = require("request");
    var path1 = "https://karma2.pipedrive.com/api/v1/deals?limit=500&api_token=97049486b4716ea06182578a7677aa81393d15de";
    var y = "Bearer" +input.auth.access_token
    var option = {
      "method" : "GET",
      "url" : path1,
      "headers" :{
        "Accept" : "application/json",
        "Content-Type" : "application/json",
        "Authorization" : y
      }
      
    }
//     request('https://karma2.pipedrive.com/api/v1/deals?limit=500&api_token=97049486b4716ea06182578a7677aa81393d15de', function (error, response, body) {
//   console.error('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   console.log('body:', body); // Print the HTML for the Google homepage.
// });
    request(option, function(error,response,body){
      try{
        if(body && typeof(body)==="string"){
          body = JSON.parse(body);
          //console.log(body)
        }
      }catch(e){
        return output(body);
      };
      if(response.statusCode===403){
        return("the authentication information is incorrect")
      }
      if(response.statusCode===200){
        return output(null, { data : body});
      }
      
      output(body);
    })


    
  }

}
