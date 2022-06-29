// Add your function in module.exports
const request = require("request");
// const { output } = require("../trigger/v1/new_product");
const api_token = "97049486b4716ea06182578a7677aa81393d15de"
const base_url = "https://karma2.pipedrive.com/api/v1/webhooks"
module.exports = {

  "name":"owner_id",

  "label":"Owner Id",
	// add input data lookup will depend on for
	// eg: if auth is oauth so add access_token inside auth object
	// you can also add other input properties which are mentioned in action/trigger
	"mock_input": {
		"auth": { }
	},
	"search": true,
  "execute": function (input, options, output){
  	// to access auth info use input.auth , eg: input.auth.username
  	// and to return output use output callback like this output(null, [{ id : "item_id", value : "Item Title"}])
  	// output should be an array of objects containing id and value keys.
    // your code goes here
	var flag = false
	return request({
		method : "GET",
		url :  "https://karma2.pipedrive.com/api/v1/users?api_token=97049486b4716ea06182578a7677aa81393d15de"
	}, function(err,response,body){
		if (err) {
			return output(err);
		  }
		if(response.statusCode===200){
			// var nextPageFlag = (body && body.additional_data && body.additional_data.pagination && body.additional_data.pagination.more_items_in_collection) ? true : false;
			// 	if (flag)
			// 		nextPageFlag = true
			console.log("input.page value---->>>",input.page)
			let result = filterData(body)
			let data = {
				"results": result.slice(0,10)

			};
			let nextPageFlag = data.results && data.results.length >= 10;
			if (flag)
				nextPageFlag = false;

			data["next_page"] = nextPageFlag;
			return output(null, data);






			// var data = {
			// 	"results": filterData(body),
			// 	"next_page" : true
			// };
			//let b = filterData(body)
			
			//console.log("Value of b",b)
			
			//return output(null, data);

		}
		  return  output(null,body);
	})


    output(null, [
    	{
    		id : "item_1",
    		value : "Item 1"
    	},
    	{
    		id : "item_2",
    		value : "Item 2"
    	}
    ]);
  }

}
function filterData(body) {
	body = JSON.parse(body)
	var arr = [];
	if (!body.data || body.data && body.data.length < 1) {
		return arr
	}
	body.data.forEach(function (item, index) {
		arr.push({
			"id": String(item.id),
			"value": item.name
		});
	});
	//console.log("array value",arr)
	return arr
}
// let input = {
//   webhook : "https://webhook.site/218344b6-769d-4da6-bed5-68a3dc6636a9"
// }
// let options = {
// 	method : "GET",
// 	url :  "https://karma2.pipedrive.com/api/v1/users?api_token=97049486b4716ea06182578a7677aa81393d15de"
// }
module.exports.execute({},{},function(err,res){
	if(err){
		    console.log(err)
		  }
		 // console.log(JSON.parse((res)))
})