module.exports = {
  name: "add_product",
  title: "Add Product",
  description: "",
  version: "v1",
  //input format
  input:{
    title: "Add Product",
    type: "object",
    properties: {
      "name": {
        "title": "product name",
        "type": "string",
        "minLength": 1
      },
      "owner_id" : {
      "title" : "owner_id",
      "type" : "number",
      "description" : "Enter the owner id"
      }
    }
  },
  //Output format 
  output: {
    title: "output",
  	type: "object",
  	properties: {
      // "id": {
      //   "title": "id",
      //   "type": "number",
      //   "displayTitle": "ID"
      // },
      // "name" : {
      //   "name" : "product name",
      //   "type" : "string",
      //   "minLength": 1,
      //   "displayTitle" : "name"
      // },
      // "code":{
      //   "code" : "product code",
      //   "type" : "string",
      //   "minlength" : 1,
      //   "displayTitle" : "code"
      // },
      // "description" : {
      //   "desciption" : "product description",
      //   "type" : "string",
      //  "displayTitle" : "description"
      // },
      // "unit":{
      //   "unit" : "product unit",
      //   "type" : "number",
      //   "displayTitle" : "unit"
      // },
      // "tax":{
      //   "tax" : "product tax",
      //   "type" : "number",
      //   "displayTitle" : "tax"
      // },
      // "category":{
      //   "unit" : "product category",
      //   "type" : "string",
      //   "displayTitle" : "category"
      // },
      // "active_flag":{
      //   "active_flag" : "product flag",
      //   "type" : "boolean",
      //   "displayTitle" : "active_flag"
      // },
      // "selectable":{
      //   "selectable" : "selectable",
      //   "type" : "boolean",
      //   "displayTitle" : "selectable"
      // },
      // "first_char":{
      //   "selectable" : "selectable",
      //   "type" : "string",
      //   "displayTitle" : "first_char"
      // },
      // "visible_to": {
      //   "title": "visible_to",
      //   "type": "string",
      //   "displayTitle": "Visible To"
      // },
      // "owner_id": {
      //   "title": "owner_id",
      //   "type": "object",
      //   "displayTitle": "User ID",
      //   "properties": {
      //     "id": {
      //       "title": "id",
      //       "type": "number",
      //       "displayTitle": "ID"
      //     },
      //     "name": {
      //       "title": "name",
      //       "type": "string",
      //       "displayTitle": "Name"
      //     },
      //     "email": {
      //       "title": "email",
      //       "type": "string",
      //       "displayTitle": "Email"
      //     },
      //     "has_pic": {
      //       "title": "has_pic",
      //       "type": "boolean",
      //       "displayTitle": "Has Picture"
      //     },
      //     "pic_hash": {
      //       "title": "pic_hash",
      //       "type": "string",
      //       "displayTitle": "Picture Hash"
      //     },
      //     "active_flag": {
      //       "title": "active_flag",
      //       "type": "boolean",
      //       "displayTitle": "Is Owner Active"
      //     },
      //     "value": {
      //       "title": "value",
      //       "type": "number",
      //       "displayTitle": "Value"
      //     }
      //   }
      // },
      // "files_count": {
      //   "title": "files_count",
      //   "type": "string",
      //   "displayTitle": "Files Count"
      // },
      // "followers_count": {
      //   "title": "followers_count",
      //   "type": "number",
      //   "displayTitle": "Followers Count"
      // },
      // "add_time": {
      //   "title": "Deal Created On",
      //   "type": "string",
      //   "format": "datetime",
      //   "propertyOrder": 11,
      //   "description": "Select/specify the date and time at which the deal is created"
      // },
      // "update_time": {
      //   "title": "update_time",
      //   "type": "string",
      //   "displayTitle": "Update Time"
      // },
      // "prices": {
      //   "title": "prices",
      //   "type": "array",
      //   "displayTitle": "prices",
      //   "items": {
      //     "type": "object",
      //     "properties": {
      //       "id": {
      //         "title": "id",
      //         "type": "number",
      //         "displayTitle": "ID"
      //       },
      //       "product_id": {
      //         "title": "id",
      //         "type": "number",
      //         "displayTitle": "product_ID"
      //       },
      //       "price": {
      //         "title": "price",
      //         "type": "number",
      //         "displayTitle": "price of product"
      //       },
      //       "currency": {
      //         "title": "Currency",
      //         "type": "string",
      //         "description": "Select the currency of the specified deal value. The default value of this field is set to the currency of the authorized user",
      //       },

      //     }
      //   }
      // },

      
    }
  },
  mock_input:{ 
      "name": "Unicorn tear",
  },
  //main execute funtion 
  execute: function(input, output){
    var request = require("request");
    var body = {
      name: input.name
    };
    request({
      method: "POST",
      url : "https://karma2.pipedrive.com/api/v1/products?api_token=97049486b4716ea06182578a7677aa81393d15de",
      header:{
        "Content-Type" : "application/json"
      },
      json:body
    }, function(error,response,body){
      try{
        if(body && typeof(body)==="string"){
          body = JSON.parse(body);   
        }
      }catch(e){
        return output(body);
      };
      if (error) {
        return output(error);
      }
      if(response.statusCode===403){
        return("the authentication information is incorrect")
      }
      if(response.statusCode===200){
        return output(null, { data : body});
      }
      output(null, body.data || body);
    }) 
  }
}
