const sql = require("./db.js");

// constructor
const Pattern = function(pattern) {
    this.id = pattern.id;
    this.name = pattern.name;
    this.category = pattern.category;
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

Pattern.getAllVar = function() {
  return new Promise(function (resolve, reject) {
    let query = "SELECT * FROM pattern;"
    sql.query(query, (err, result) => {
      if (err) {
        console.log("error: ", err);
        callback(null, err);
        return;
      }
      var jsonData = JSON.parse(JSON.stringify(result));
      resolve(jsonData);
    });
  });
}

Pattern.getForSearch = function() {
  return new Promise(function (resolve, reject) {
    let query = "SELECT id, name, description, 0 as score FROM pattern;"
    sql.query(query, (err, result) => {
      if (err) {
        console.log("error: ", err);
        callback(null, err);
        return;
      }
      var jsonData = JSON.parse(JSON.stringify(result));
      resolve(jsonData);
    });
  });
}

Pattern.getCategories = (callback) => {
  let query = "SELECT DISTINCT(category) FROM pattern;";
    
  sql.query(query, (err, results) => {
    if (err) {
      console.log("error: ", err);
      callback(null, err);
      return;
    }
    
    return callback(null, results);
  });
}

Pattern.getArticlesByCategory = (category, callback) => {
  let query = `select id, description, name, category from pattern where category = '${category}';`;
    
  sql.query(query, (err, results) => {
    if (err) {
      console.log("error: ", err);
      callback(null, err);
      return;
    }
    
    return callback(null, results);
  });
}

module.exports = Pattern;