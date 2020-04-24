
let url = "/shoppingList";
let xhr = new XMLHttpRequest();
xhr.open("GET",url,true);
  
// Next, add an event listener for when the HTTP response is loaded
xhr.addEventListener("load", function() {
    let responseStr = xhr.responseText;  // get the JSON string 
    let gList = JSON.parse(responseStr);  // turn it into an object
    let img = document.getElementById("cardImg");
    img.src = gList.photo;
    img.style.display = 'block';
    let msg = document.getElementById("message");
    msg.textContent = gList.message;
    msg.className = gList.font;
    document.querySelector(".postcard").style.backgroundColor = gList.color;
});
// Actually send request to server
xhr.send();


