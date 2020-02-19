// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var fs = require ("fs"); 

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------
    app.get("/api/notes", function(req, res) {

        fs.readFile ("./db/db.json", function (err, data){
            if (err) { console.log (err); 
                throw (err); 
            }
        let notes = JSON.parse(data); 
        return res.json(notes);
        //return data;
        });
    });

    
};