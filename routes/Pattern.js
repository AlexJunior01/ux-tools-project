
const express = require("express");
const Pattern = require("../models/pattern.model.js");
const fileUpload = require('express-fileupload');
const fs = require('fs');
const { type } = require('os');


const router = express.Router()

function getCategory(category) {
  return category.category;
}

function generateFileName(patternId) {
  const prefix =  __dirname + '/../patternsHTML/pattern_html'
  const sufix =  Date.now() + '.html'

  uploadPath = prefix + '-' + patternId + '-' + sufix;
  return uploadPath;
}

function getPath(obj) {
  return obj.html
}

// Retorna uma lista com todas categorias existentes
router.get("/category/all", function(req, res) {
  Pattern.getCategories((err, data) => {
    if (err) {
      console.log("Erro" + err) 
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    }
    else {
      var finalData = JSON.parse(JSON.stringify(data)).map(getCategory);
      res.status(200).send(finalData);
    } 
      
  })
})

// 
router.get("/category/:category", function(req, res) {
  var category = req.params.category;
  Pattern.getArticlesByCategory(category, (err, data) => {
    if (err) {
      console.log("Erro" + err) 
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    }
    else {
      res.status(200).send(data);
    } 
      
  })

})

// retorna um objeto com o campo html com a estruturação do código
router.get("/:patternId", function(req, res) {
  var patternId = req.params.patternId;


  Pattern.getPatternHTML(patternId, (err, data) => {
    if (err) {
      console.log("Erro" + err) 
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    }
    else {
      var filePath = JSON.parse(JSON.stringify(data)).map(getPath)[0]
      const finaldata = fs.readFileSync(filePath, 'utf8');
      res.status(200).send({"html": finaldata});
    } 
      
  })
})

router.post("/", function(req, res) {
  const pattern = req.body

  Pattern.insertPattern(pattern, (err, data) => {
    if (err) {
      console.log("Erro" + err) 
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    }
    else {
      res.status(200).send({"message": "Pattern salvo com sucesso."});
    } 
      
  })
})

router.patch("/:patternId", function(req, res) {
  const pattern = req.body
  const patternId = req.params.patternId;

  Pattern.updatePattern(pattern, patternId, (err, data) => {
    if (err) {
      console.log("Erro" + err) 
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    }
    else {
      res.status(200).send({"message": "Pattern atualizado com sucesso."});
    } 
      
  })
})

router.delete("/:patternId", function(req, res) {
  const patternId = req.params.patternId;

  Pattern.deletePattern(patternId, (err, data) => {
    if (err) {
      console.log("Erro" + err) 
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    }
    else {
      res.status(200).send({"message": "Pattern removido com sucesso."});
    } 
      
  })
})

router.post('/:patternId/html_file', function(req, res) {
  let htmlFile;
  let uploadPath;
  const patternId = req.params.patternId;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  
  htmlFile = req.files.pattern_html;
  uploadPath = generateFileName(patternId);

  
  htmlFile.mv(uploadPath, function(err) {
    if (err)
      return res.status(500).send(err);
  });

  Pattern.updateHtmlFile(uploadPath, patternId, (err, data) => {
    if (err) {
      console.log("Erro" + err) 
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    }
    else {
      res.status(200).send({"message": "HTML added with success."});
    } 
      
  })

});


module.exports = router;
