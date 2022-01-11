const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


let apiQuotes=[];

// SHOW LOADING
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
    //This is the one of benefit to why we must use main container for design. Thanks to this we could make hidden the main design and we said that loader will be visible.
        
    
}

// HIDE LOADING

function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
    
}


// SHOW NEW QUOTE
function newQuote() {
    loading();
    setTimeout(set,1200);
    // Pick a random quote from apiQuotes array
    function set() {
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    
    // Check if Author field is blank and replace it with 'Unknown'
    if(!quote.author){
        authorText.textContent = 'Unknown';

    }
    else{
        authorText.textContent=quote.author;
    }

    // Check Quote Length to determine styling
    if(quote.text.length>100){

        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote');
    }


    //Set Quote , Hide Loader
    quoteText.textContent=quote.text;
    complete();
}
    
}



// Get Quotes From API
async function getQuotes() {
    const apiUrl = 'https://type.fit/api/quotes';

try {
    const response = await fetch(apiUrl);
    //when we use fetch method to read some data.We have to use async function like we did up side.Now we took a data from API.
    apiQuotes = await response.json();
    //We took a data from API and now we are converting  this data  to json format.

    //Okayyy.Now we have datas.
    //The second step we must do in here . We are gonna create a function who can change the quotes dynamically when we press the button.
    newQuote();
    //We created this function named -- NewQuote-- on up side. 
    //We used this funciton in here because we wanna when we call the function named getQuotes at the same time this function be triggered too.
    
} catch (error) {
    
}
}

//TWEET QUOTE

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}


// EVENT LISTENERS

newQuoteBtn.addEventListener('click',newQuote);
twitterBtn.addEventListener('click',tweetQuote);



// ON LOAD
getQuotes();
complete();
