const { Db } = require("typeorm");
const sql = require("./db.js");

// constructor
class Pattern {
  constructor(pattern) {
    this.id = pattern.id;
    this.name = pattern.name;
    this.category = pattern.category;
    this.description = pattern.description;
    this.context = pattern.context;
    this.problem = pattern.problem;
    this.forces = pattern.forces;
    this.solution = pattern.solution;
  }

  static getAll(callback) {
    let query = "SELECT * FROM pattern;";

    sql.query(query, (err, results) => {
      if (err) {
        console.log("error: ", err);
        callback(null, err);
        return;
      }

      return callback(null, results);
    });
  }

  static getAllVar() {
    return new Promise(function (resolve, reject) {
      let query = "SELECT * FROM pattern;";
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

  static getForSearch() {
    return new Promise(function (resolve, reject) {
      let query = "SELECT id, name, description, 0 as score FROM pattern;";
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

  static getCategories(callback) {
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

  static getArticlesByCategory(category, callback) {
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

  static getPatternHTML(patternId, callback) {
    let query = `select html from pattern where id = '${patternId}';`;

    sql.query(query, (err, results) => {
      if (err) {
        console.log("error: ", err);
        callback(null, err);
        return;
      }

      return callback(null, results);
    });
  }

  static insertPattern(pattern, callback) {
    const query = 'INSERT INTO pattern SET ?';

    sql.query(query, pattern, (err, results) => {
      if (err) {
        console.log("error: ", err);
        callback(null, err);
        return;
      }

      return callback(null, results);
    });
  }

  static updatePattern(pattern, id, callback) {
    const query = 'UPDATE pattern SET ? WHERE id = ?';

    sql.query(query, [pattern, id], (err, results) => {
      if (err) {
        console.log("error: ", err);
        callback(null, err);
        return;
      }

      return callback(null, results);
    });
  }

  static deletePattern(id, callback) {
    const query = 'DELETE FROM pattern WHERE id = ?';

    sql.query(query, id, (err, results) => {
      if (err) {
        console.log("error: ", err);
        callback(null, err);
        return;
      }

      return callback(null, results);
    });
  }
}

module.exports = Pattern;