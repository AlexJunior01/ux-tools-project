// Lista de padrões para simular o banco e dados
const patterns = 
[
  {"id": 0,
  "title": "identify real points of UX improvement",
  "description": "In the stabilization stage, startups seek to rapidly evolve their business sustainably. In this stage, the focus is to develop products and services that are easy to maintain and create an efficient infrastructure for user support and appoint professionals qualified (skilled) in customer experience (or customer success)."},
  
  {"id": 1,
  "title": "bring together user information",
  "description": "Startups operate in a very dynamic market. To evolve rapidly and improve their product and services, the startups usually collect user feedback through different touch-points, e.g., marketing, support, and sales."},
  
  {"id": 2,
  "title": "document demands coming from users ",
  "description": "Startups are able to quickly react to changes to fit their products and services to market demands. Something that can take months for traditional companies to change, startups usually have little time to monitor and understand the behavior of their users to make decisions."},
  
  {"id": 3,
  "title": "identify [UX] problems/improvements through metrics",
  "description": "Software startups typically operate in uncertain contexts and under a lack of resources. Metrics can help startups optimize these few resources by making the right decisions at the right time. "},
  
  {"id": 4,
  "title": "identify UX insights from user data",
  "description": "Startups struggle to rapidly evolve a product to market, and then scale their activities. Startups operate in a reactive manner and gathering feedback from customers and users is the main way to adjust the direction of their business."},
  
  {"id": 5,
  "title": "responding to users' demands ",
  "description": "Many software startups recognize the importance of having a customer-centric business model. The customer-centric mindset implies listening to the customers/users, seeking to offer positive experiences through interaction with your products and services."},
  
  {"id": 6,
  "title": "conduct product research/evaluations with real users",
  "description": "Many startup entrepreneurs are well aware of the importance of a good user experience to the success of their products and services. "},
  
  {"id": 7,
  "title": "document UX artifacts and decisions",
  "description": "Operating in uncertain markets and with limited resources, startups need more flexible work practices rather than more structured and rigid processes to evolve quickly."},
  
  {"id": 8,
  "title": "promote UX culture",
  "description": "Few startups are able to embrace UX work from day one. In the beginning, the team is small and the professionals work on several fronts, accumulating roles to achieve a functional and a more stable version of the product."},
  
  {"id": 9,
  "title": "understand the value of UX ",
  "description": "Software startups operate within the highly competitive market, focusing on innovative and disruptive ideas with value propositions that meet the desires of their customers. In this way, startups face many uncertainties in the market, regarding product features and resources."},
  
  {"id": 10,
  "title": "improve communication between teams",
  "description": "Time pressure and lack of resources lead startups to adopt more flexible managerial and organizational practices."},
  
  {"id": 11,
  "title": "how to start doing UX",
  "description": "In the beginning, startups focus on validating and developing products and services as soon as possible towards gaining a customer base rapidly."},
  
  {"id": 12,
  "title": "professional input on UX",
  "description": "Startups have lots of business details to manage and prioritize in the early stages."},
  
  {"id": 13,
  "title": "define roles and jobs description for UX ",
  "description": "Only a few startups have financial resources and the desire to invest in UX design activities before the company begins to grow and attract users in fact. Startups seek to evolve quickly by adopting flexible practices."}
]

// Var responsável por guardar o score de cada padrão
var orderedPatters = [
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


// Importação da lib de busca
let miniSearch = new MiniSearch({
  fields: ['title', 'description'], // fields to index for full-text search
  storeFields: ['id'] // fields to return with search results
})
miniSearch.addAll(patterns);

// Adiciona um elemento a lista  de padrões
function addPattern(idx) {
  let patternList = document.getElementById("patternList");

  const item = document.createElement("li");
  const text = document.createTextNode(patterns[idx]["title"]);

  item.appendChild(text);
  patternList.appendChild(item);
}

/* 
Reorganiza a lista de padrões, tanto para adição de uma nova palavra quanto remoção

  type == 'INC' => Adiciona uma nova palavra buscando ela e incrementado o score dos padrões
  type == 'DEC' => Remove uma palavra buscando ela e decrementando o score dos padrões

*/
function redefinePatternsOrder(keyword, type) {
  // Busca palavras 
  results = miniSearch.search(keyword);
  console.log(results);


  // Atualiza score dos padrões
  results.forEach(function(serchResult) {
    const inputiId = serchResult.id;
    const inputScore = serchResult.score;

    orderedPatters.forEach(function({ id }, idx){
      if (id === inputiId && type == 'INC') {
        orderedPatters[idx].score += inputScore
      } 
    
      if (id === inputiId && type == 'DEC') {
        orderedPatters[idx].score -= inputScore
      } 
    });
  })
  

  // Reordena lista de scores
  orderedPatters.sort((a, b) => {
    return b.score - a.score;
  });
  console.log(orderedPatters);
  
  // Apaga lista atual
  document.getElementById("patternList").innerHTML = "";

  // Escreve lista reodenada
  orderedPatters.forEach(function(pattern) {
    if (pattern.score > 0) {
      addPattern(pattern.id)
    }
  });

}

// Função responsável por lidar com a adição de uma palavras a busca
function addWord() {

  // Pega palavra buscada
  const field = document.getElementById('searchBar')
  const keyWord = field.value;

  // Adiciona palavra a lista de palavras escolhidas
  let wordsList = document.getElementById("selectedWordsList");
  wordsList.innerHTML += '<li> <a class="tile">' + keyWord + '<button onclick="deleteWord(this);">X</button> <\a> </li>';
      
  // Reordena padrões
  redefinePatternsOrder(keyWord, 'INC');

  // Zera o campo da busca
  field.value = '';
}

// Função responsável por lidar com a remoção de uma palavras a busca
function deleteWord(currentEl){
  // Captura o valor da palavra removida
  currentEl.innerHTML = ''
  const keyWord = currentEl.parentNode.textContent

  // Remove palavra da lista
  currentEl.parentNode.parentNode.removeChild(currentEl.parentNode);

  // Atualiza padrões
  redefinePatternsOrder(keyWord, 'DEC');
}

// Configurando barra de pesquisa para disparar função com Enter
document.getElementById("searchBar")
  .addEventListener("keyup", function(e) {
    if (e.code === 'Enter') { addWord()}
  });
