let model = {
	//none dog is selected by default
	selectedDog: null,
	
	//array of objects of my dogs
	dogs: [
		{
			name: 'Capi',
			img: 'img/Capi.jpg',
			clickCount: 0
		},
		{
			name: 'Tedi',
			img: 'img/Tedi.jpg',
			clickCount: 0
		},
		{
			name: 'Maks',
			img: 'img/Maks.jpg',
			clickCount: 0
		},
		{
			name: 'Floki',
			img: 'img/Floki.jpg',
			clickCount: 0
		},
		{
			name: 'Reksi',
			img: 'img/Reksi.jpg',
			clickCount: 0
		}
	]
}; // end of model


let octopus = {

	// this function starts the entire app
	init: function() {
		//set selected dog when page opens to the first dog
		model.selectedDog = model.dogs[0];

		//initialize both views
		viewDogList.init();
		viewDogDisplay.init();
	},

	// whenever selected dog is changed, it will write new dog into selectedDog. view will change it
	getSelectedDog: function() {
		return model.selectedDog;
	},

	getAllDogs: function() {
		return model.dogs;
	},

	// set the currently-selected dog to the object passed in
	setSelectedDog: function(dog) {
		model.selectedDog = dog;
	},

	// counts clicks for the currently-selected dog
	clickCounter: function() {
		model.selectedDog.clickCount++;
		viewDogDisplay.render();
	}
}; // end of octopus


let viewDogList = {
	// init only gets called once
	init: function() {
		// store the DOM element for easy access later
		this.list = document.getElementById('dog-list');

		// update the DOM elements with the right values
		this.render();
	},

	render: function() {
		// get all dogs from octopus (which we would originally call directly from model)
		let dogs = octopus.getAllDogs();

		// empty dog list
		this.list.innerHTML = '';

		// loop over dogs
		// forEach doesnt work in this case because of objects in array!!
		for (let dog of dogs) {
			// create "buttons" and add small img and name of dog
			let elem = document.createElement('li');
			elem.innerHTML = (`<img src=${dog.img} alt=${dog.name} height=60px><p>${dog.name}</p>`);
			//elem.textContent = dog.name;

			// set current dog on click (using closure-in-a-loop to connect the value of the dog variable to the click event function)
			// everything you use eventlistener in a loop, you have to use the closure trick: create a function and return function inside otherwise for loop won't work!!!!!
			elem.addEventListener('click', (function(dogCopy) {
				return function() {
					octopus.setSelectedDog(dogCopy);
					viewDogDisplay.render();
				};
			})(dog));

			// finally, add all li elements to the list
			this.list.appendChild(elem);
		}
	}
}; // end of viewList


let viewDogDisplay = {
	// init only gets called once, render is called whenever for each selected dog

	init: function() {
		// store atributes of selected dog to DOM elements for easy access later
		//it is better to already have divs in HTML and then just write the attribute than to create each div again and again
		this.dogElem = document.getElementById('dog-display');
		this.dogNameElem = document.getElementById('dog-name');
		this.dogImgElem = document.getElementById('dog-img');
		this.countElem = document.getElementById('dog-count');

		//increment counter on click on dog photo
		this.dogImgElem.addEventListener('click', function() {
			octopus.clickCounter();
		});

		//update DOM elements in view with the values of selected dog
		this.render();
	},

	render: function() {
		//update DOM elements with values from the current dog
		let selectedDog = octopus.getSelectedDog();
		this.countElem.textContent = selectedDog.clickCount;
		this.dogNameElem.textContent = selectedDog.name;
		this.dogImgElem.src = selectedDog.img;
	}
}; // end of viewDogDisplay


//load the functions
octopus.init();



/* -------------------- my old code ----------------------------

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
	elem.innerHTML = (`<img src='img/${dog}.jpg' alt=${dog} height=100px><p>${dog}</p>`);
	// inside menu is 5x elem <li><img src='img/xxxx.jpg' alt="xxxx" height=100px id="xxxx"><p>xxxx</p></li>
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

*/