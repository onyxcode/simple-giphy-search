const keys = {
    "giphy":"your api key here"
};
// 1. Grab box input
document.querySelector(".js-userinput").addEventListener('keyup', function(){
    let query = document.querySelector("#search");
    let typingTimer;                //timer identifier
    let doneTypingInterval = 1000;  //time in ms (1 second)

    //on keyup, start the countdown
    query.addEventListener('keyup', () => {
    clearTimeout(typingTimer);
    if (query.value) {
        typingTimer = setTimeout(doneTyping, doneTypingInterval);
    }
    });

    //user is "finished typing", do something
    function doneTyping () {
        pushToDOM(query.value);
    }
});

function pushToDOM(input) {
  // 2. Giphy API connection
  fetch(`https://api.giphy.com/v1/gifs/search?api_key=${keys["giphy"]}&q=${input}&limit=20`, {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
    },
})
   .then(response => response.json())
   .then(data => {
    // 3. Show the GIFs
    let container = document.querySelector(".js-container");
    container.innerHTML = ""; // Clear existing images
    for (let counter = 0; counter < data.data.length; counter++) {
        if (counter >= 20) {
            break; // Stop after 20 images
        }
        let imgElement = document.createElement("img");
        let uniqueParam = Date.now() + "_" + counter;
        imgElement.src = data.data[counter].images.fixed_height.url + "?timestamp=" + uniqueParam;
        container.appendChild(imgElement);
    };
   });
};