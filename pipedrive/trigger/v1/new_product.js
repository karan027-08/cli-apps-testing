const request = require("request");
const api_token = "97049486b4716ea06182578a7677aa81393d15de"
const base_url = "https://karma2.pipedrive.com/api/v1/webhooks"
module.exports = {

  name: "new_product",

  label: "New Product",

  version: "v1",

  input: {
    type: "object",
    title: "New Product",
    description: "Short description",
    properties: {
      event: {
        type: "string",
        enum: ["new_product"]
      },
      polling: {
        type: "boolean",
        default: false,
        options: {
          hidden: true
        }
      }
    }
  },

  output: {
    "new_product": {
      type: "object",
      properties: {

      }
    }
  },

  mock_data: {}, // output of trigger data

  mock_input: {},

  execute: function (input, payload, output) {
    //console.log(payload)
    console.log(payload)
    console.log("Hi i ah here ")
    // return request({
    //   method : "POST",
    //   url : "https://karma2.pipedrive.com/api/v1/webhooks?api_token=97049486b4716ea06182578a7677aa81393d15de",
    //   json : {
    //    "subscription_url" : input.webhook,
    //    "event_action" : "added",
    //    "event_object" : "product"
    //   },
    //   header:{
    //     "Content-Type" : "application/json"
    //   },
    // },function(err,res){

    // })
   return output(null, payload);

    

  },

  register: function (input, output) {
    // request({
    //   "method" : "POST",
    //   "url" : baseUrl + '?api_token=' + access_token,
    //   "headers" : {
    //     "Accept" : "application/json",
    //     "Content-Type" : "application/json"
    //   },
    //   json:{
    //     "input" : input
    //   }
    // }, function (error, response, body) {
    // })
    return request({
      method : "POST",
      url : base_url+ "?api_token="+ api_token,
      json : {
       "subscription_url" : input.webhook,
       "event_action" : "added",
       "event_object" : "product"
      },
      header:{
        "Content-Type" : "application/json"
      },
    },
    
     function (err, response, body) {
      if (err) {
        return output(err);
      }
      return  output(null,body);
      });
      
  
  },
  

  unregister: function (input, options, output) {
    // will be invoked when user deletes the trigger for unregistering the webhook
    // webhook id will be available in input.webhookId

    // your code goes here
    request({
      method: "DELETE",
      url: base_url + "/"+input.webhookId + "?api_token="+ api_token ,
      json : {
        "id" : input.webhookId
       },
       header:{
         "Content-Type" : "application/json"
       },
    }, function (err, res, body) {
      if (err) {
        return output(err);
      }
      if (res && res.statusCode && res.statusCode >= 200 && res.statusCode < 500) {
        return output(null, {
          "message": "Webhook deleted successfully!!"
        });
      }
      output(body);
    });
  },
  activate: function(input, options, output)
  {
    // This function will be called whenever user activates the trigger/workflow. 
   // This function is useful in scenarios where you save cursor to figure out newly added/changed data in the
   // 3rd party services. You can update your cursor so that trigger won't fetch data of the period 
   // during which the trigger was deactivated.
 
   return output(null,true)
  }

}

// let input = {
//   webhook : "https://webhook.site/218344b6-769d-4da6-bed5-68a3dc6636a9"
// }
// module.exports.register(input,function (err,res){
//   if(err){
//     console.log(err)
//   }
//   console.log(JSON.parse(JSON.stringify(res)))
// })
// let payload = {
//   "a" : "v"
// }
// module.exports.execute(input,payload,function (err,res){
//   if(err){
//     console.log("in execute function",err)
//   }
//   //console.log(res)
// })
// module.exports.unregister(input,{},function (err,res){
//   if(err){
//     console.log(err)
//   }
//   console.log((JSON.stringify(res)))
// })

