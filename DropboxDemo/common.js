const url  = "https://api.dropboxapi.com/2/files/list_folder";
const request = require("request")
const access_token = "sl.BKY8KMScOxN5fVvOoCW4RPQLimyiKl-JafINqUhie8oQL3G2YxIssWsBGjt9qEn1R7dmKXoxyIGsXtifsXr8Q-psw6PQalJz0_X3dXdMHmTcPKYN5l6ljxaVyuEh_31uYSTR6U0A2kZk";
module.exports = {
        filesListFolder: function(input){
        return new Promise((resolve,reject) =>{
            request({
                "method" : "POST",
                "url" : url,
                "headers" : {
                    "Authorization" : "Bearer sl.BKf4h64hFkpxAr0wr075kM61tfw8jHCd-F-TT_cYCqwK1W6CNu1l2gVH4wCDJbqcQvd4P5_aQJpFMHD3bvX9RrlVeNLkUXCzw1IPR_dEbQs25NrZjs4jkZrsneUsTgD-P-PmeFPDVjAb",
                    "Content-Type" : "application/json" 
                },
                "json" : input
            },(err,res) => {
                if(err){
                    console.log(err);
                    reject(err)
                }
                // console.log(res.body.entries)
                //console.log(res.body.entries)
                resolve(res)

            })
        })
       
    }
}
module.exports.filesListFolder({path : ''})