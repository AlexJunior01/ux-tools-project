//import MiniSearch from 'minisearch';

const patterns = 
    [
     {"title": "identify real points of UX improvement",
     "description": "In the stabilization stage, startups seek to rapidly evolve their business sustainably. In this stage, the focus is to develop products and services that are easy to maintain and create an efficient infrastructure for user support and appoint professionals qualified (skilled) in customer experience (or customer success)."},
     
     {"title": "bring together user information",
     "description": "Startups operate in a very dynamic market. To evolve rapidly and improve their product and services, the startups usually collect user feedback through different touch-points, e.g., marketing, support, and sales."},
     
     {"title": "document demands coming from users ",
     "description": "Startups are able to quickly react to changes to fit their products and services to market demands. Something that can take months for traditional companies to change, startups usually have little time to monitor and understand the behavior of their users to make decisions."},
     
     {"title": "identify [UX] problems/improvements through metrics",
     "description": "Software startups typically operate in uncertain contexts and under a lack of resources. Metrics can help startups optimize these few resources by making the right decisions at the right time. "},
     
     {"title": "identify UX insights from user data",
     "description": "Startups struggle to rapidly evolve a product to market, and then scale their activities. Startups operate in a reactive manner and gathering feedback from customers and users is the main way to adjust the direction of their business."},
     
     {"title": "responding to users' demands ",
     "description": "Many software startups recognize the importance of having a customer-centric business model. The customer-centric mindset implies listening to the customers/users, seeking to offer positive experiences through interaction with your products and services."},
     
     {"title": "conduct product research/evaluations with real users",
     "description": "Many startup entrepreneurs are well aware of the importance of a good user experience to the success of their products and services. "},
     
     {"title": "document UX artifacts and decisions",
     "description": "Operating in uncertain markets and with limited resources, startups need more flexible work practices rather than more structured and rigid processes to evolve quickly."},
     
     {"title": "promote UX culture",
     "description": "Few startups are able to embrace UX work from day one. In the beginning, the team is small and the professionals work on several fronts, accumulating roles to achieve a functional and a more stable version of the product."},
     
     {"title": "understand the value of UX ",
     "description": "Software startups operate within the highly competitive market, focusing on innovative and disruptive ideas with value propositions that meet the desires of their customers. In this way, startups face many uncertainties in the market, regarding product features and resources."},
     
     {"title": "improve communication between teams",
     "description": "Time pressure and lack of resources lead startups to adopt more flexible managerial and organizational practices."},
     
     {"title": "how to start doing UX",
     "description": "In the beginning, startups focus on validating and developing products and services as soon as possible towards gaining a customer base rapidly."},
     
     {"title": "professional input on UX",
     "description": "Startups have lots of business details to manage and prioritize in the early stages."},
     
     {"title": "define roles and jobs description for UX ",
      "description": "Only a few startups have financial resources and the desire to invest in UX design activities before the company begins to grow and attract users in fact. Startups seek to evolve quickly by adopting flexible practices."}
    ]
var idx = 0



function addPattern() {
  let patternList = document.getElementById("patternList");

  const item = document.createElement("li");
  const text = document.createTextNode(patterns[idx]["title"]);

  item.appendChild(text);
  idx = idx+1;

  patternList.appendChild(item);
}

function Delete(currentEl){
  currentEl.parentNode.parentNode.removeChild(currentEl.parentNode);
}


// configurando eventos
function addWord() {

  // Get elements
  const field = document.getElementById('searchBar')
  const keyWord = field.value;
  let wordsList = document.getElementById("selectedWordsDiv");

  wordsList.innerHTML += '<li> <a class="tile">' + keyWord + 
    '<button onclick="Delete(this);">X</button> <\a> </li>';
      
  // creating item 
  // const itemList = document.createElement("li");
  // let aItem = document.createElement("a")
  // aItem.classList.add("tile");
  // const text = document.createTextNode(keyWord);

  // // inserting in list
  // aItem.appendChild(text);
  // itemList.appendChild(aItem);
  // wordsList.appendChild(itemList);


  // Zerando campo
  field.value = '';
}

document.getElementById("searchBar")
  .addEventListener("keyup", function(e) {
    if (e.code === 'Enter') { addWord()}
  });
