/**
 * Created by svetlananikitina on 15/06/2017.
 */


//module that returns the current date and time

// exports.myDateTime = function () {
//     return Date();
// };
// var fetch = require('node-fetch');
// require('es6-promise').polyfill();
// require('isomorphic-fetch');


// var fruits = ['Banana','Apple','Orange','Mango'];
//
// //print array of fruits
// function loadFruits() {
//     document.getElementById("fruits").innerHTML = fruits;
// }
//
// //print fruit
// function myFunction() {
//     var fruit = prompt("What is your favorite fruit?");
//     fruits[fruits.length]= fruit;
//     document.getElementById("fruits").innerHTML = fruits;
//
// }
var sessionId = Math.random().toString(36).substring(7);

var d = document.getElementById("messageForBot");


d.addEventListener("keypress", submitMessage);

function submitMessage (event) {
    if (event.keyCode == 13 || event.which == 13) {
        //alert("This text we send to Bot");
        var message = event.target.value;
        console.log(message);
        sendToBot(message)

        // var messages = this.state.messages;
        // messages.push(message);
        // this.state.socket.emit("new-message", [message, session_id]);

        // xhttp.open("POST", "https://sleepy-sierra-80270.herokuapp.com/", true);
        // xhttp.send();
        var userinput = document.createElement("LI");
        var usertext = document.createTextNode(message);
        userinput.appendChild(usertext);
        userinput.setAttribute("class","list-group-item");
        document.getElementById("list-group").appendChild(userinput);


    }
    else {
        return false;
    }
}



var serverURL = 'https://sleepy-sierra-80270.herokuapp.com/'
// var serverURL = 'http://localhost:5000/'

//send the message to bot
function sendToBot (message) {
    fetch(serverURL,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                message,// querystring.stringify(message),
                sessionId: sessionId})
        })
        .then(r=> r.json())
        //.then(j => console.log(j)
        .then( function (j) {
                console.log(j);
                // alert('recieved answ from wit bot');
                // var body = JSON.parse(j);
                var body = j;

                if (body.type === 'msg') {
                    // res.send(body.msg)
                    // document.getElementById("list-group").innerHTML = "Recieved answer from WitBot: "+body.msg;

                    var node = document.createElement("LI");

                    var textnode = document.createTextNode("Bot responds: " + body.msg);
                    node.appendChild(textnode);
                    node.setAttribute("class","list-group-item list-group-item-info");
                    document.getElementById("list-group").appendChild(node);

                    // let messages = ['fisrt msg', 'second', 'third'];
                    //
                    // return messages.map(function(body) {
                    //     let li = createNode('li'), //create elements we need to display
                    //         span = createNode('span');
                    //     let ul = document.getElementById('messages');
                    //
                    //     console.log(body);
                    //
                    //     span.innerHTML = "response is : "+ body;
                    //     append (li, span);
                    //     append (ul, li);
                    // })
                }

                if (body.type === 'action' && body.action === 'show_place') {
                    if (body.entities.location  && body.entities.location[0].value) {


                        var image = document.createElement("img");
                        // image.setAttribute("src", "elem.link");
                        image.setAttribute("src", "https://media-cdn.tripadvisor.com/media/photo-s/01/13/e0/26/driving-through-the-dolomites.jpg");
                        image.setAttribute("height", "200");
                        image.setAttribute("width", "200");
                        image.setAttribute("alt", "place");
                        image.setAttribute("class","img-thumbnail");
                        document.getElementById("pictures").appendChild(image);
                    }

                }


            }


        )

        // .then(function(body) {
        // console.log(body);
        //
        // let messages = ['hi', 'hehe', 'yhy'];
        //
        // return messages.map(function(body) {
        //     let li = createNode('li'), //create elements we need to display
        //         span = createNode('span');
        //     let ul = document.getElementById('messages');
        //
        //     console.log(body);
        //
        //     span.innerHTML = "response is : "+ body;
        //     append (li, span);
        //     append (ul, li);
        // })

    // })

}




function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el); // Append the second parameter(element) to the first one
}

console.log('after');

