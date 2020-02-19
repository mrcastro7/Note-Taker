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

    // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------
    app.post("/api/notes", function(req, res) {

        fs.readFile ("./db/db.json", function (err, data){
            if (err) throw (err); 
            let notes = JSON.parse(data); 
    
            let nextID = getNextID(notes) + 1;  

            let newNote = {
                id: nextID, 
                title: req.body.title, 
                text: req.body.text
            }
            notes.push(newNote); 
    
            let noteStr = JSON.stringify(notes);

        fs.writeFile ("./db/db.json", noteStr, (err)=>{
            if (err) throw err; 
            return res.json (newNote); 
        }); 
        });
    }); 

// API DELETE Requests
    app.delete ("/api/notes/:id", function (req, res){

        console.log ('delete ' + req.params.id); 
        fs.readFile ("./db/db.json", function (err, data){
            if (err) throw (err); 
            let notes = JSON.parse(data); 
            console.log(notes);

            for (let i=0;i<notes.length;i++){
                if (notes[i].id==req.params.id){

                    notes.splice(i,1);  
                    console.log (" "); 
                    console.log (notes); 

                    let noteStr = JSON.stringify(notes);

                fs.writeFile ("./db/db.json", noteStr, (err)=>{
                    if (err) throw err; 
                    return res.json (true); 
                }); 
            }
            }
        }); 
    });

    function getNextID (notes){
        var maxID = 0; 
        for (let i=0;i<notes.length;i++){
            maxID = Math.max(notes[i].id, maxID); 
        }
        return maxID; 
    }


};