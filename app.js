const dogList = ['Capi', 'Tedi', 'Maks', 'Floki', 'Reksi'];
let dogs = dogList;

const menu = document.querySelector('.dog-list');

const deck = document.querySelector('.div-dog');


// clear the screen for testing
deck.innerHTML = '';

// Let's loop over the numbers in our array
dogs.forEach(function(dog) {
	// This is the dog we're on...
	//dog is already defined as function(dog)
	//console.log(dog);

	// We're creating a DOM element for the dog
	var elem = document.createElement('li');
	elem.innerHTML = (`${dog}`);
	// inside menu is 5x elem <li>xxnameofdogxx</li>
	menu.appendChild(elem);

	//function to display selected dog in deck
	function displaySelectedDog() {
		$(deck).append(`<h2>${dog}</h2>
					<img class='photodog' src='img/${dog}.jpg' alt="Puppy" id="${dog}"><br>
					Clicks: <span id='click${dog}'></span>`);
	}

	// when we click a dog in menu, display a dog name in deck
	elem.addEventListener('click', (function(dogCopy) {
		return function() {
			if (deck.innerHTML === '') {
				displaySelectedDog();
			} else {
				deck.innerHTML = '';
				displaySelectedDog();
			}
		};
	})(dog));
});


// when we click a dog in deck, countclick should change for +1
//let selectedDog = $('.div-dog').children('img');

let numCapi = 0;
let numTedi = 0;
let numMaks = 0;
let numFloki = 0;
let numReksi = 0;

deck.addEventListener('click', function() {
	// reads attribute id='click${dog} of clicked dog'
	// help: https://stackoverflow.com/questions/4740297/get-attribute-of-child-element
	let atr = $(this).children('span').attr('id');
	//console.log(atr); //atr = clickCapi
	//this prints correct value (each dog has correct name)

	if (atr == 'clickCapi') {
		numCapi+=1;
		document.getElementById(atr).innerHTML = numCapi;
		
	} else if (atr == 'clickTedi') {
		numTedi+=1;
		document.getElementById(atr).innerHTML = numTedi;

	} else if (atr == 'clickMaks') {
		numMaks+=1;
		document.getElementById(atr).innerHTML = numMaks;

	} else if (atr == 'clickFloki') {
		numFloki+=1;
		document.getElementById(atr).innerHTML = numFloki;

	} else if (atr == 'clickReksi') {
		numReksi+=1;
		document.getElementById(atr).innerHTML = numReksi;
	}
});