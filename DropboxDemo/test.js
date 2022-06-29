var Dropbox = require('dropbox').Dropbox;

var dbx = new Dropbox({ accessToken: 'sl.BKXKXsWnYGkrizOgmoaRwgcLDRUkReYU-X6raJthcRRWQsR6bbqgmlxeYvPxRHW_-K5pVe2grlg2sFC5-z06deBrDh1eEODqBYzwiQxTqbNVJGyOVkruLGEa3mKQxM7C8z3CRkPuK899' });
//console.log(dbx)

// dbx.filesListFolder({path: ''})

//   .then(function(response) {

//     console.log(response.result);

//   })

//   .catch(function(error) {

//     console.log(error);

//   });

dbx.filesGetMetadata({path: req.body.storageItem})

  .then(function(response) {

    console.log(response);

  })

  .catch(function(error) {

    console.log(error);

  });