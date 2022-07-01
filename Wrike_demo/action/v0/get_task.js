const request = require('request')
const url = "https://www.wrike.com/api/v4/tasks"
module.exports = {

  name: "get_task",

  title: "Get Task",

  description: "",
  version: "v0",

  input:{
    title: "Get Task",
    type: "object",
    properties: {

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
    var option = {
      "method" : "GET",
      "url" : url,
      "headers" : {
        "Authorization" : "Bearer " +   input.auth.access_token
        
       }
    }
    request(option, function(error,response,body){
      if(error){
        return(error)
      }
      
      try{

        body = (typeof body === "string") ? JSON.parse(body) : body;

      }catch(error){
        return (error);
      };

      if (response.statusCode && response.statusCode >= 200 && response.statusCode < 400){
        return output(null, { data : body});
      }
      else if (resp.statusCode == 400) {
        return("Bad Request")
      } 
      else if (resp.statusCode == 401) {
        return("Authorization Error")
      }
       else if (resp.statusCode == 403) {
        return("Forbidden Error")
      } 
      else if (resp.statusCode == 404) {
        return("Resource not found")
      } 
      else if (resp.statusCode > 400 && resp.statusCode < 500) {
        return("Unauthorized request sent by client")
      } 
      else if (resp.statusCode == 500) {
        return("Internal Server Error")
      } 
      else if (resp.statusCode == 503) {
        return("Service Unavialble Error")
      } 
      else if (resp.statusCode == 504) {
        return("Request Timeout Error")
      } 
      else if (resp.statusCode > 500) {
        return("Client Server Encountered an Error")
      } 
      return output(body);
     
      
     
    })
   
  }

}
// module.exports.execute({},function(err,res){
//   if(err){
//     console.log(err)
//   }
//   else{
//     console.log(res)
//   }
// })
