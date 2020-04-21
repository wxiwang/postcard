// Always include at top of Javascript file
"use strict";

// UPLOAD IMAGE using a post request
// Called by the event listener that is waiting for a file to be chosen

function uploadFile() {
  
    // get the file chosen by the file dialog control
    const selectedFile = document.getElementById('fileChooser').files[0];
    // store it in a FormData object
    const formData = new FormData();
    // name of field, the file itself, and its name
    formData.append('newImage',selectedFile, selectedFile.name);
    
    // build a browser-style HTTP request data structure
    const xhr = new XMLHttpRequest();
    // it will be a POST request, the URL will this page's URL+"/upload" 
    xhr.open("POST", "/upload", true);
  
    // callback function executed when the HTTP response comes back
    xhr.onloadend = function(e) {
        // Get the server's response body
        console.log(xhr.responseText);
        // now that the image is on the server, we can display it!
        let newImage = document.getElementById("serverImage");
        newImage.src = "../images/"+selectedFile.name;
    }
  
    // actually send the request
    xhr.send(formData);
}

// Add event listener to the file input element
document.getElementById("fileChooser").addEventListener("change",uploadFile);


//Font display
let currentFont = document.querySelector("#fonts span");
let currentFontName = "flower";
document.querySelectorAll("#fonts input").forEach(i => {
  i.addEventListener("change", function () {
    
    if (i.checked) {
      console.log("checked");
      i.previousElementSibling.innerHTML = "&#10070;";
      currentFont.innerHTML = "&#11046;";
      currentFont = i.previousElementSibling;
      document.querySelector("#message").className = i.value;
      currentFontName = i.value;
    }
  });
});

//Color display
let colors = [
  "#e6e2cf",
  "#dbcaac",
  "#c9cbb3",
  "#bbc9ca",
  "#A6A5B5",
  "#B5A6AB",
  "#ECCFCF",
  "#eceeeb",
  "#BAB9B5"
];

const colorButton = document.querySelectorAll(".color-button");

colorButton.item(0).style.border = "1px solid black";
let currentColor = colorButton.item(0);
let currentIndex = 0;
colorButton.forEach(function (button,index){
  button.addEventListener("click", function () {
    currentColor.style.border = "none";
    button.style.border = "1px solid black";
    document.querySelector(".postcard").style.backgroundColor = colors[index];
    currentColor = button;
    currentIndex = index;
  });

  button.addEventListener("mouseover", function () {
    button.style.border = "1px dashed";
    document.querySelector(".postcard").style.backgroundColor = colors[index];
  });
  button.addEventListener("mouseout", function () {
    if (button == currentColor) {
      button.style.border = "1px solid";
    } else {
      button.style.border = "none";
      document.querySelector(".postcard").style.backgroundColor = colors[currentIndex];
    }
  });
});

//write json file
const fs = require('fs')
let share_button = document.getElementById("share");

share_button.addEventListener("click", function () {
  
  let data = {
    "photo":document.getElementById('serverImage').src,
    "message":document.getElementById("message").textContent,
    "font":currentFontName,
    "color":colors[currentIndex]
  }
  var xhr = new XMLHttpRequest(); 
  xhr.open("POST", '/data');
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.onloadend = function(e) {
    console.log(xhr.responseText);
    window.location = "https://postcard-wxiwang.glitch.me/display.html";
  }
  xhr.send(JSON.stringify(data));
})
