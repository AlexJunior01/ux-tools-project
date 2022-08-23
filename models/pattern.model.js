const sql = require("./db.js");

// constructor
const Pattern = function(pattern) {
    this.id = pattern.id;
    this.name = pattern.name;
    this.description = pattern.description;
    this.context = pattern.context;
    this.problem = pattern.problem;
    this.forces = pattern.forces;
    this.solution = pattern.solution;
};


Pattern.getAll = (callback) => {
    let query = "SELECT * FROM pattern;";
    
    sql.query(query, (err, results) => {
      if (err) {
        console.log("error: ", err);
        callback(null, err);
        return;
      }
      
      return callback(null, results);
    });
};

module.exports = Pattern;