var xtoken = '';
var oldbody = '';
var curUser = '';

async function getLogin() { // called via 'login' button
    let uname = document.getElementById('root-username'); 
    let pswd = document.getElementById('root-password');
    let error = document.getElementById('login-errormsg');
    let logout = document.getElementById('logout-button');

    const resetInput = () => {
        pswd.value = '';
        uname.value = '';
    }

    await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            uname: uname.value, 
            pswd: pswd.value
        })
    })
    .then((res) => {
        if (res.status === 200) {
            error.style.visibility = 'hidden';
            logout.style.visibility = 'visible';
            logout.textContent = uname.value;
            curUser = uname.value;
            resetInput();

            xtoken = res.headers.get('X-Token');

            generate_cardling();
        }
        else {
            error.style.visibility = 'visible';
            resetInput()
        }
    })
    .catch((err) => {throw new Error(err)});
}

async function doLogout() {
    let logout = document.getElementById('logout-button');

    await fetch('/logout', {
        method: 'get',
        headers: {
            'uname': `${logout.innerText}`,
            'X-Token': `${xtoken}`
        }
    })
    .then(() => {
        logout.style.visibility = 'hidden'; 
        xtoken=''
        let loginDisplay = document.getElementById('root-input');
        let cardbody = document.getElementById('content-container');
        let ul = document.getElementById('root-ul');
        let img = document.getElementById('card-img');

        img.style.display = 'none';
        clearSearchRating();
        ul.innerHTML = '';
        ul.style.display = 'none';
        cardbody.style.display = 'none';
        loginDisplay.style.display = 'flex';
    });
}

async function generate_cardling() {
    let rootbody = document.getElementById('root-input');
    let cardbody = document.getElementById('content-container');

    rootbody.style.display = 'none'; 
    cardbody.style.display = 'flex';
    clearSearchRating();
}

async function fetchCardlist() { // called via 'search' button
    const searchfield = document.getElementById('search-field');
    let ul = document.getElementById('root-ul');
    let loadSvg = document.getElementById('loading');
    let tint = document.getElementById('htm');
    let img = document.getElementById('card-img');
    img.style.display = 'none';
    tint.style.opacity = '.4';
    loadSvg.style.display = 'block';

    await fetch(`/api/v1/cards?search=${searchfield.value}`)
    .then((res) => res.json())
    .then((cards) => {
        populateCardList(ul, cards);
        clearSearchRating();
    }); 

    img.style.display = 'block';
    loadSvg.style.display = 'none'; 
    tint.style.opacity = '1';
    ul.style.display = 'block';
}

function clearSearchRating() {
    let ratingField = document.getElementById('rating-field')
    let searchField = document.getElementById('search-field')
    ratingField.value = '';
    searchField.value = '';
}
/* 
Put up each item from cards into 
a list that on hover over will display pointed to image
*/
async function populateCardList(ul, cards) {
    ul.innerHTML = ''; // clear current list
    let cardImg = document.getElementById('card-img');
    let ratingField = document.getElementById('rating-field');

    for(const card of cards) {
        let li = document.createElement('li')
        li.textContent = card.name;
        ul.appendChild(li);

        li.dataset.cid = card.id; // set a card id for each li element

        // attatch event handler for mouseover to display its image
        li.addEventListener("mouseover", async () => {
            cardImg.src = card.imageUrl;
            li.style.backgroundColor = 'rgb(0,0,200)';
            cardImg.visibility = 'visible';

            hoveredCard = li.dataset.cid;

            /* GET REQUEST TO CARD ENDPOINT ON HOVER DISPLAY */
            await fetch(`/api/v1/cards/${hoveredCard}/rating`, {
                method: 'GET',
                headers: {'X-Token': xtoken}
            })
            .then( (res) => res.text())
            .then( (rating) => {
               ratingField.value = rating; 
            })
            .catch((err) => console.log(err));
        })
        li.addEventListener("mouseleave", () => {
            li.style.backgroundColor = '';
            cardImg.visibility = 'hidden';
        })
        // add small M near end of list element
        addCardWatermark(card, li);
    }
    
}
function addCardWatermark(card, li) {
    let mark = document.createElement('div');
    mark.id = 'list-mark';
    if(card.kind === 'MTG') {
        mark.textContent = 'M';
        mark.style.backgroundColor = 'lightgreen';

    }
    else {
        mark.textContent = 'P'
        mark.style.backgroundColor = 'red';
    }
    
    li.appendChild(mark);

}

var hoveredCard = null;
async function rateCard() {
    if(hoveredCard !== null) {
        const userRating = document.getElementById('rating-field').value
        if(userRating > 5) {return false}; // stop user from posting more than 5 rating

        await fetch(`/api/v1/cards/${hoveredCard}/rating?user=${curUser}&rating=${userRating}`, {
            method: 'POST', 
            headers: {'X-Token': `${xtoken}`}
        })
        .then((res) => res.text)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

    }
}

