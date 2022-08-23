const patterns = 
[
  {"id": 0,
  "name": "identify real points of UX improvement",
  "description": "In the stabilization stage, startups seek to rapidly evolve their business sustainably. In this stage, the focus is to develop products and services that are easy to maintain and create an efficient infrastructure for user support and appoint professionals qualified (skilled) in customer experience (or customer success)."},
  
  {"id": 1,
  "name": "bring together user information",
  "description": "Startups operate in a very dynamic market. To evolve rapidly and improve their product and services, the startups usually collect user feedback through different touch-points, e.g., marketing, support, and sales."},
  
  {"id": 2,
  "name": "document demands coming from users ",
  "description": "Startups are able to quickly react to changes to fit their products and services to market demands. Something that can take months for traditional companies to change, startups usually have little time to monitor and understand the behavior of their users to make decisions."},
  
  {"id": 3,
  "name": "identify [UX] problems/improvements through metrics",
  "description": "Software startups typically operate in uncertain contexts and under a lack of resources. Metrics can help startups optimize these few resources by making the right decisions at the right time. "},
  
  {"id": 4,
  "name": "identify UX insights from user data",
  "description": "Startups struggle to rapidly evolve a product to market, and then scale their activities. Startups operate in a reactive manner and gathering feedback from customers and users is the main way to adjust the direction of their business."},
  
  {"id": 5,
  "name": "responding to users' demands ",
  "description": "Many software startups recognize the importance of having a customer-centric business model. The customer-centric mindset implies listening to the customers/users, seeking to offer positive experiences through interaction with your products and services."},
  
  {"id": 6,
  "name": "conduct product research/evaluations with real users",
  "description": "Many startup entrepreneurs are well aware of the importance of a good user experience to the success of their products and services. "},
  
  {"id": 7,
  "name": "document UX artifacts and decisions",
  "description": "Operating in uncertain markets and with limited resources, startups need more flexible work practices rather than more structured and rigid processes to evolve quickly."},
  
  {"id": 8,
  "name": "promote UX culture",
  "description": "Few startups are able to embrace UX work from day one. In the beginning, the team is small and the professionals work on several fronts, accumulating roles to achieve a functional and a more stable version of the product."},
  
  {"id": 9,
  "name": "understand the value of UX ",
  "description": "Software startups operate within the highly competitive market, focusing on innovative and disruptive ideas with value propositions that meet the desires of their customers. In this way, startups face many uncertainties in the market, regarding product features and resources."},
  
  {"id": 10,
  "name": "improve communication between teams",
  "description": "Time pressure and lack of resources lead startups to adopt more flexible managerial and organizational practices."},
  
  {"id": 11,
  "name": "how to start doing UX",
  "description": "In the beginning, startups focus on validating and developing products and services as soon as possible towards gaining a customer base rapidly."},
  
  {"id": 12,
  "name": "professional input on UX",
  "description": "Startups have lots of business details to manage and prioritize in the early stages."},
  
  {"id": 13,
  "name": "define roles and jobs description for UX ",
  "description": "Only a few startups have financial resources and the desire to invest in UX design activities before the company begins to grow and attract users in fact. Startups seek to evolve quickly by adopting flexible practices."}
]

const Pattern = require("./models/pattern.model.js");
const MiniSearch = require('minisearch')
const express = require("express");
var app = express();
const port = 3000

const suggestions = ["UX", "UI", "Software Engineer", "Pattern", "Access"]

// Importação da lib de busca
let miniSearch = new MiniSearch({
    fields: ['name', 'description'], // fields to index for full-text search
    storeFields: ['id'] // fields to return with search results
})
miniSearch.addAll(patterns);


function get_ordered_patterns() {
  // Envia uma lista com os padrões vazios para iniciar a busca
    return [
        {"id": 0, "score": 0},
        {"id": 1, "score": 0},
        {"id": 2, "score": 0},
        {"id": 3, "score": 0},
        {"id": 4, "score": 0},
        {"id": 5, "score": 0},
        {"id": 6, "score": 0},
        {"id": 7, "score": 0},
        {"id": 8, "score": 0},
        {"id": 9, "score": 0},
        {"id": 10, "score": 0},
        {"id": 11, "score": 0},
        {"id": 12, "score": 0},
        {"id": 13, "score": 0}
    ]
}

function is_not_zero(pattern) {
  return pattern.score > 0.001;
}

function search_word(actual_pattern, word) {
  // Busca palavras 
  var results = miniSearch.search(word);
  console.log(results);

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

// API
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.get("/suggestions", function(req, res) {
  // retorna lista de palavras sugeridas
  res.send(suggestions);
})



app.get("/patterns", function(req, res) {
  // possui um query params tags com a lista de palavras
  // retorna os padrões ordenados
  const query_words = req.body.tags;
  console.log(query_words);

  if(!Array.isArray(query_words) || !query_words.length) {
    res.send([]);
  }

  var patterns = get_ordered_patterns();
  updated_patterns = query_words.reduce(search_word, patterns)

  updated_patterns.sort((a, b) => {
    return b.score - a.score;
  });

  // TODO: Adicionar banco de dados e busca por description e name
  res.send(updated_patterns.filter(is_not_zero));
})


// retorna um objeto com o campo html com a estruturação do código
app.get("/article/:articleId", function(req, res) {


})

app.listen(port, () => {
 console.log("Server running on port 3000");
});   