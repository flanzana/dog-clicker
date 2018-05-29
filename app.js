let model = {
	//none dog is selected by default
	currentDog: null,

	//list of my dogs
	dogs: [
		{
			name: 'Capi',
			imgSrc: 'img/Capi.jpg',
			clickCount: 0
		},
		{
			name: 'Tedi',
			imgSrc: 'img/Tedi.jpg',
			clickCount: 0
		},
		{
			name: 'Maks',
			imgSrc: 'img/Maks.jpg',
			clickCount: 0
		},
		{
			name: 'Floki',
			imgSrc: 'img/Floki.jpg',
			clickCount: 0
		},
		{
			name: 'Reksi',
			imgSrc: 'img/Reksi.jpg',
			clickCount: 0
		}
	]
}; // end of model


let octopus = {
	init: function() {
		//set current dog
		model.currentDog = model.dogs[0];

		//initialize both views
		viewDogList.init();
		viewDogDisplay.init();
	},

	getCurrentDog: function() {
		return model.currentDog;
	},

	getDogs: function() {
		return model.dogs;
	},

	// set the currently-selected dog to the object passed in
	setCurrentDog: function(dog) {
		model.currentDog = dog;
	},

	// increments the counter for the currently-selected dog
	incrementCounter: function() {
		model.currentDog.clickCount++;
		viewDogDisplay.render();
	}
}; // end of octopus


let viewDogList = {
	init: function() {
		// store the DOM element for easy access later
		this.dogListElem = document.getElementById('dog-list');

		// update the DOM elements with the right values
		this.render();
	},

	render: function() {
		let dog, elem, i;
		// get the dogs from octopus
		let dogs = octopus.getDogs();

		// empty dog list
		this.dogListElem.innerHTML = '';

		// loop over dogs
		//for (i = 0; i < dogs.length; i++) {
		for (dog of dogs) {
			//dog = dogs[i];

			// create "buttons" and write the name of dog
			elem = document.createElement('li');
			elem.textContent = dog.name;

			// set current dog on click (using closure-in-a-loop to connect the value of the dog variable to the click event function)
			elem.addEventListener('click', (function(dogCopy) {
				return function() {
					octopus.setCurrentDog(dogCopy);
					viewDogDisplay.render();
				};
			})(dog));

			// finally, add element to the list
			this.dogListElem.appendChild(elem);

		}
	}
}; // end of viewList


let viewDogDisplay = {
	//
	init: function() {
		// store atributes of selected dog to DOM elements for easy access later
		this.dogElem = document.getElementById('dog-display');
		this.dogNameElem = document.getElementById('dog-name');
		this.dogImgElem = document.getElementById('dog-img');
		this.countElem = document.getElementById('dog-count');

		//increment counter on click
		this.dogImgElem.addEventListener('click', function() {
			octopus.incrementCounter();
		});

		//update DOM elements with the right values
		this.render();
	},

	render: function() {
		//update DOM elements with values from the current dog
		let currentDog = octopus.getCurrentDog();
		this.countElem.textContent = currentDog.clickCount;
		this.dogNameElem.textContent = currentDog.name;
		this.dogImgElem.src = currentDog.imgSrc;
	}
}; // end of viewDogDisplay


//load the functions
octopus.init();