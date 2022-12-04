var SEARCH_IS_ACTIVE = false;
const port = 3000
const suggestions = ["UX", "TESTE", "Software Engineer", "Pattern", "Access"];

var cors = require('cors');
const Pattern = require("./models/pattern.model.js");
const MiniSearch = require('minisearch');
const express = require("express");




// Importação da lib de busca
let miniSearch = new MiniSearch({
    fields: ['name', 'solution', 'problem'], // fields to index for full-text search
    storeFields: ['id', 'name', 'description', 'problem'] // fields to return with search results
})

function is_not_zero(pattern) {
  return pattern.score > 0.001;
}

function search_word(actual_pattern, word) {
  // Busca palavras 
  var results = miniSearch.search(word);

    // Atualiza score dos padrões
  results.forEach(function(serchResult) {
    const inputiId = serchResult.id;
    const inputScore = parseFloat(serchResult.score.toFixed(4));

    actual_pattern.forEach(function({ id }, idx){
      if (id === inputiId) {
        actual_pattern[idx].score += inputScore
      }
    });
  });

  return actual_pattern;
}

function getCategory(category) {
  return category.category;
}


// API
var app = express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


function activeSearch() {
  console.log("Ativando ferramenta de busca!");
  Pattern.getAllVar().then(function(data) {
    miniSearch.addAll(data);
    SEARCH_IS_ACTIVE = true;
    return data;
  });
}

app.post("/patterns", function(req, res) {
  if (!SEARCH_IS_ACTIVE) {
    activeSearch();
    res.status(500).send({"message": "Erro no servidor, tente novamente!"});
  } else if (req.body.tags) {
    const query_words = req.body.tags;
    var result;

    Pattern.getForSearch().then(function(data) {
      result = query_words.reduce(search_word, data);

      result.sort((a, b) => {
        return b.score - a.score;
      });

      let teste = result.filter(is_not_zero);
      res.status(200).send(teste);
      
    });
  } else {
    res.status(200).send([]);
  }
})


// Retorna uma lista com todas categorias existentes
app.get("/category/all", function(req, res) {
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
app.get("/article/:category", function(req, res) {
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
app.get("/pattern/:patternId", function(req, res) {
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
      var finalData = JSON.parse(JSON.stringify(data))
      res.status(200).send(finalData[0]);
    } 
      
  })
})

app.post("/pattern", function(req, res) {
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

app.patch("/pattern/:patternId", function(req, res) {
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

app.delete("/pattern/:patternId", function(req, res) {
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

app.listen(port, () => {
 console.log("Server running on port 3000. System is active?" + SEARCH_IS_ACTIVE);
 
});   