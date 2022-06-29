// Add your function in module.exports
const request = require("request"); 
module.exports = {

  "name":"deal_id",

  "label":"Deal Id",
	
	"mock_input": {
		"auth": { }
	},
	"search": true,
  "execute": function (input, options, output){
	

	//var flag = false
	return request({
		method : "GET",
		url :  "https://karma2.pipedrive.com/api/v1/deals?api_token=97049486b4716ea06182578a7677aa81393d15de" + `&limit=${10}&start=${input.page * 10}`,
		// qs:{
		// 	"limit" : 10,
		// 	"start" : input.page * 10 
		// }
	}, function(err,response,body){

		if (err) {
			return output(err);
		  }
			var flag = false
			 body  = JSON.parse(body)
			if (response && response.statusCode == 200 && body) {
				let nextPageFlag = (body && body.additional_data && body.additional_data.pagination && body.additional_data.pagination.more_items_in_collection) ? true : false;
				console.log("next flag value -->>",nextPageFlag)
				if (flag)
					nextPageFlag = false
				var data = {
					"results": filterData(body),
					"next_page": nextPageFlag
				};

				return output(null, data);
			} else if (body.errors && body.errors.length) {
				return output(body.errors[0].detail || "Something went wrong");
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
	//body = JSON.parse(body)
	var arr = [];
	if (!body.data || body.data && body.data.length < 1) {
		return arr
	}
	body.data.forEach(function (item, index) {
		arr.push({
			"id": String(item.id),
			"value": item.title
		});
	});
	
	return arr
}
// module.exports.execute({},{},function(err,res){
// 	if(err){
// 		    console.log(err)
// 		  }
// 		 console.log((res))
// })