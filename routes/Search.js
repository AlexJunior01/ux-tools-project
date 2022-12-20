
const express = require("express");
const Pattern = require("../models/pattern.model.js");
const MiniSearch = require('minisearch');

const router = express.Router()

var SEARCH_IS_ACTIVE = false;
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

function activeSearch() {
  console.log("Carregando padrões na ferramente de busca!");
  Pattern.getAllVar().then(function(data) {
    miniSearch.addAll(data);
    SEARCH_IS_ACTIVE = true;
    return data;
  });
}

function deactivateSearch() {
  console.log("Removendo padrões da ferramente de busca!");
  miniSearch.removeAll();
  SEARCH_IS_ACTIVE = false;
}


router.post('/refresh', function(req, res) {
  deactivateSearch()
  activeSearch()
  res.status(200).send({"message": "Sucesso!"});
})

router.post("/patterns", function(req, res) {
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

      result = result.filter(is_not_zero);
      res.status(200).send(result);
      
    });
  } else {
    res.status(200).send([]);
  }
})


module.exports = router
