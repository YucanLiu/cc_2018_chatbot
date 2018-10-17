const api_key = "x-api-key";
const api_val = "jWijnateZG61bIFjTQbL06xLdQahJvgh53x3OHwr";

function httpGet(request) {
    var xmlHttp = new XMLHttpRequest();
    const url='https://44igpn6yxd.execute-api.us-east-1.amazonaws.com/prod/chatbot?message=' + request;
    xmlHttp.open( "GET", url, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function httpGetAsync(request, callback){
    var xmlHttp = new XMLHttpRequest();

    const url='https://44igpn6yxd.execute-api.us-east-1.amazonaws.com/prod/chatbot?message=' + request;

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", url, true); // true for asynchronous
    xmlHttp.setRequestHeader(api_key, api_val);
    xmlHttp.send(null);
}

var botui = new BotUI('chat-bot');

botui.message.add({ // show a message
  content: 'Hell, how can I help you today?'
}).then(function () {
  startConversation();
});

function startConversation() {
  // while (true) {
    botui.action.text({ // show 'text' action
      action: {
        placeholder: ''
      }
    }).then(function (res) { // get the result
      httpGetAsync(res.value, function(response) {
        botui.message.add({
          // loading: true,
          content: response
        });
      });
    }).then(function () {
      startConversation();
    })
  // }
}
