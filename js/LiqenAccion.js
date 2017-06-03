var contenido = {};
var sePuede = false;
//var urlPrueba = 'file:///C:/Users/Borja-PC/Dropbox/TFG/PAGINA_EJEMPLO/ejemplo_seleccion_final.html';
//var pathAnnot = "//*[@id=\"parent\"]";
//var urlPrueba = 'http://revistafal.com/la-migracion-calificada-en-mexico/'; //id=4
//var pathAnnot = '//*[@id=\"content\"]/div[1]'; 
var urlPrueba = "http://www.bbc.com/mundo/noticias/2011/08/110810_migracion_profesionistas_mexico_an.shtml"; //id=5
var pathAnnot = "//*[@id=\"blq-content\"]/div[2]/div[1]/div[4]/div"; 
//Browser Action
chrome.browserAction.onClicked.addListener(function(activeTab) {
  var newURL = chrome.extension.getURL('appInicio.html');
  //chrome.tabs.create({ url: 'file:///C:/Users/Borja-PC/Dropbox/TFG/PAGINA_EJEMPLO/ejemplo_seleccion_final.html' });
  //chrome.tabs.create({ url: newURL });
  chrome.tabs.create({ url: urlPrueba });
  getQuestionAPI();
});

//function insertTagsFromQuestion(node_divPopAnnot) {

chrome.tabs.onUpdated.addListener(function(tabId , info, tab) {
  console.log(info);
  if (info.status == "complete") {
    waitForTags();
    if(tab.url == urlPrueba){
      //console.log("entra!!!!!!!!!!!!");
      chrome.tabs.executeScript({
        code: "\
              var s = document.createElement('script');\
              s.type='text/javascript';\
              s.src = chrome.extension.getURL('js/LiqenSelecction.js');\
              (document.head || document.documentElement).appendChild(s);\
              "
        //file: "js/LiqenSelecction.js"
      });
      chrome.tabs.executeScript({
        code: "\
              var s = document.createElement('link');\
              s.rel='stylesheet';\
              s.type='text/css';\
              s.href = chrome.extension.getURL('css/LiqenSelecction.css');\
              (document.head || document.documentElement).appendChild(s);\
              "
        //file: "js/LiqenSelecction.js"
      });
      chrome.tabs.executeScript({
        code: "OnInsert(\
        '"+chrome.extension.getURL('appInicio.html')+"',\
        '"+chrome.extension.getURL('img/glyphicons-224-chevron-right.png')+"',\
        '"+chrome.extension.getURL('img/glyphicons-52-eye-open.png')+"',\
        '"+chrome.extension.getURL('img/glyphicons-248-note.png')+"',\
        '"+pathAnnot+"');"
      });
      sePuede = true;
    }
  }
});

function getQuestionAPI() {
  var data = null;

  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      var Data = JSON.parse(this.responseText);
      //console.log(this.responseText);
      contenido['question'] = Data;
      contenido['tags'] = new Array();
      contenido['author'] = 1;
      getTagsFormQuestions(Data);
    }
  });

  xhr.open("GET", "https://liqen-core.herokuapp.com/questions/1");
  xhr.setRequestHeader("cache-control", "no-cache");

  xhr.send(data);
}

function getTagsFormQuestions(question) {
  console.log(question);
  for (var i = 0; i < question["answer"].length; i++) {
    getTagsAPI(question["answer"][i]["tag"]);
  }
}

function getTagsAPI(idTag){
  var data = null;

  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      console.log(this.responseText);
        //console.log(this.responseText);
        var Data = JSON.parse(this.responseText);
        console.log(Data);
        contenido['tags'].push(Data);
    }
  });
  var url = "https://liqen-core.herokuapp.com/tags/"+idTag;
  xhr.open("GET", url);
  xhr.setRequestHeader("cache-control", "no-cache");

  xhr.send(data);
}

function waitForTags(){
  //PONER URL == ^http*
  if (!contenido["question"]  || contenido['tags'].length != contenido["question"]["answer"].length || !sePuede) {
    console.log("Entra if");
    setTimeout(function(){waitForTags()}, 3000);
  }
  else {
    console.log("Entra else");
    console.log(contenido);
    sePuede = false;
    chrome.tabs.executeScript({
      code: "insertPopAnnot(\
            '"+chrome.extension.getURL('appInicio.html')+"',\
            "+JSON.stringify(contenido)+");"
    });
  }
}

/*  //Inicio sesion del usuario
    var data = new FormData();
    data.append("email", X);
    data.append("password", Y);

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log(this.responseText);
      }
    });

    xhr.open("POST", "https://liqen-core.herokuapp.com/sessions");
    xhr.send(data);
*/