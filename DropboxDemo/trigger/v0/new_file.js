// const request = require('request');
// const api_url = "https://api.dropboxapi.com/2/file_requests/list";
// const accessToken = "sl.BKWVvlJ8SRK4_nqGppCrr-XuZLjVRsdIj9nstrR3dcifYLPK_NJOXTSNIbgbd-x07KqxXkqYeVF58nX2i0Pq7V_soMbD_6IctYHBaMPH6KRWkEN-pgQjLlDRXsMXu-yucLgUwZxBAC-P";
const dbx = require("../../common")
//const Dropbox = require('dropbox').Dropbox;
module.exports = {

  name: "new_file",

  label: "New File",

  version: "v0",

  input: {
    type: "object",
    title: "New File",
    description: "Short description",
    properties: {
      event: {
        type: "string",
        enum: ["new_file"],
        isExecute: true
      },
      polling: {
        type: "boolean",
        default: true,
        options: {
          hidden: true
        }
      }
    }
  },

  output: {
    "new_file": {
      type: "object",
      properties: {

      }
    }
  },

  mock_data: {}, // output of trigger data

  mock_input: {},

  getUserData: function (input, options, output) {
    // will be called when testing trigger before it is created
    // return the actual data from your service which will be used for
    // creating output schema and it should be flat output json
    return output(null, []);
  },

  execute: function (input, options, output) {
    // will be called every 5 minutes
    // to access auth info use input.auth , eg: input.auth.username
    // and to return output use output callback like this output(null, [{ mykey : "key", value : "My Val"}])
    // output should be an array of objects or an empty array.
    dbx.filesListFolder({path :''})
      .then(function(response){
        let oldFile = [];
        let oldfolder = [];
        let newList = response.body.entries.filter((item) =>{
          if(item['.tag']==='file'){
            return !options.meta.oldFile.includes(item.id);
          }
          else if(item['.tag']==='folder'){
            return !options.meta.oldfolder.includes(item.id);
          }
          return false;
        })
        //console.log("New list ->>>>",newList);
        response.body.entries.forEach((item) =>{
          //console.log("for each",item['.tag'])
            
          if(item['.tag']==='file'){
            oldFile.push(item.id);
            
          }
          else{
            oldfolder.push(item.id);
          }
          
        })
        options.setMeta({
          'oldFile' : oldFile,
          'oldfolder' : oldfolder
        })
        return output(null,newList);

      })
      .catch(function(error){
        return output(null,error)
      })


   

  },

  activate: function (input, options, output) {
    // this function will be called whenever user activate or reactivates flow
    // to access auth info use input.auth , eg: input.auth.username
    // you can use this function to reset your cursor or timestamp

    // your code goes here

    this.validate(input,options,output);
    output(null, true);
  },

  validate: function (input, options, output) {
    // will be called when trigger is created 1st time
    // to access auth info use input.auth , eg: input.auth.username
    // to successfully validate auth info and other parameter provided by user call output(null, true)
    // in case auth or other info is invalid, prevent creating trigger by sending error output("Username or password is invalid")
  
     
    //var dbx = new Dropbox({ accessToken: "sl.BKWVvlJ8SRK4_nqGppCrr-XuZLjVRsdIj9nstrR3dcifYLPK_NJOXTSNIbgbd-x07KqxXkqYeVF58nX2i0Pq7V_soMbD_6IctYHBaMPH6KRWkEN-pgQjLlDRXsMXu-yucLgUwZxBAC-P"});
    dbx.filesListFolder({path: ''})
      .then(function(response) {
        //console.log(response)
        let oldFile = [];
        let oldfolder = [];
        response.body.entries.forEach((item) =>{
          
            //console.log("Item--->>>>>",item)
          if(item['.tag']==='file'){
            oldFile.push(item.id);
            
          }
          else{
            oldfolder.push(item.id);
          }
          
        })
        options.setMeta({
          'oldFile' : oldFile,
          'oldfolder' : oldfolder
        })
        return output(null,true);
        



       
      })
      .catch(function(error) {
        console.log(error);
        return output(null,false);
      });

    
  }
}


//module.exports.validate({},{"meta" : {}},output)

















// require('isomorphic-fetch'); // or another library of choice.
// var Dropbox = require('dropbox').Dropbox;
// var dbx = new Dropbox({ accessToken: "sl.BKWVvlJ8SRK4_nqGppCrr-XuZLjVRsdIj9nstrR3dcifYLPK_NJOXTSNIbgbd-x07KqxXkqYeVF58nX2i0Pq7V_soMbD_6IctYHBaMPH6KRWkEN-pgQjLlDRXsMXu-yucLgUwZxBAC-P"});
// dbx.filesListFolder({path: ''})
//   .then(function(response) {
//     console.log(response.result);
//   })
//   .catch(function(error) {
//     console.log(error);
//   });

// module.exports.execute({},{},function (err,res){
//     if(err){
//       console.log("in execute function",err)
//     }
//     console.log(res)
//   })
