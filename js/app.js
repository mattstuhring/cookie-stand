'use strict';

// Get the container element where I display all locations
var locationsContainer = document.getElementById('locations-container');

// Hours of operation 6am - 8pm
var hoursOfOperation = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];

// **********************************************************************
// Location - 1st and Alki
// **********************************************************************
var location1stAndAlki = {
  minHourlyCustomers: 23,
  maxHourlyCustomers: 65,
  avgCookiesPerCustomer: 6.3,
  numberOfCustomers: function() {
    // Generates random number between maxHourlyCustomers & minHourlyCustomers
    // The max & min are inclusive;
    return Math.floor(Math.random() * (this.maxHourlyCustomers - this.minHourlyCustomers + 1)) + this.minHourlyCustomers;
  },
  cookiesSoldPerHour: [],
  totalCookiesSold: 0
};

// Data - Create store data for 1st and Alki
// ----------------------------------------------------------
for (var i = 0; i < hoursOfOperation.length; i++) {
  // Number of customers per hour
  var customers = location1stAndAlki.numberOfCustomers();

  // Number of cookies per hour; round to nearest whole number
  var cookies = Math.round(customers * location1stAndAlki.avgCookiesPerCustomer);

  // Formatted cookies per hour. ex "6am: 24 cookies"
  var result = `${hoursOfOperation[i]}: ${cookies} cookies`;

  // Add result to object property "cookiesSoldPerHour"
  location1stAndAlki.cookiesSoldPerHour.push(result);

  // Increment total number of cookies sold
  location1stAndAlki.totalCookiesSold += cookies;
}

// Log to console for debugging cookie data
console.log(location1stAndAlki.cookiesSoldPerHour);
console.log(location1stAndAlki.totalCookiesSold);

// DOM - Add an unordered list populated with store data
// ----------------------------------------------------------
// Create section element
var location1stAndAlkiSectionEl = document.createElement('section');

// Append section element to container
locationsContainer.appendChild(location1stAndAlkiSectionEl);

// Create h2 element
var location1stAndAlkiH2El = document.createElement('h2');

// Add location name to h2
location1stAndAlkiH2El.textContent = '1st and Alki';

// Append h2 to the section element
location1stAndAlkiSectionEl.appendChild(location1stAndAlkiH2El);

// Create unordered list
var location1stAndAlkiUlEl = document.createElement('ul');

// Append ul to the container element
location1stAndAlkiSectionEl.appendChild(location1stAndAlkiUlEl);

// Lets populate some data in that unordered list!
// ----------------------------------------------------------
// Iterate through array of data located in property cookiesSoldPerHour
for (i = 0; i < location1stAndAlki.cookiesSoldPerHour.length; i++) {
  // Create a new list item (li)
  var location1stAndAlkiLiEl = document.createElement('li');

  // Add cookies sold per hour
  location1stAndAlkiLiEl.textContent = location1stAndAlki.cookiesSoldPerHour[i];

  // Append li to the undordered list
  location1stAndAlkiUlEl.appendChild(location1stAndAlkiLiEl);
}

// **********************************************************************
// Location - SeaTac Airport
// **********************************************************************
var locationSeaTacAirport = {
  minHourlyCustomers: 3,
  maxHourlyCustomers: 24,
  avgCookiesPerCustomer: 1.2,
  numberOfCustomers: function() {
    // Generates random number between maxHourlyCustomers & minHourlyCustomers
    // The max & min are inclusive;
    return Math.floor(Math.random() * (this.maxHourlyCustomers - this.minHourlyCustomers + 1)) + this.minHourlyCustomers;
  },
  cookiesSoldPerHour: [],
  totalCookiesSold: 0
};

// Data - Create store data for SeaTac Airport
// ----------------------------------------------------------
for (i = 0; i < hoursOfOperation.length; i++) {
  // Number of customers per hour
  customers = locationSeaTacAirport.numberOfCustomers();

  // Number of cookies per hour
  cookies = Math.round(customers * locationSeaTacAirport.avgCookiesPerCustomer);

  // Formatted cookies per hour. ex "6am: 24 cookies"
  result = `${hoursOfOperation[i]}: ${cookies} cookies`;

  // Add result to object property "cookiesSoldPerHour"
  locationSeaTacAirport.cookiesSoldPerHour.push(result);

  // Increment total number of cookies sold
  locationSeaTacAirport.totalCookiesSold += cookies;
}

// Log to the console for debugging cookie data
console.log(locationSeaTacAirport.cookiesSoldPerHour);
console.log(locationSeaTacAirport.totalCookiesSold);

// DOM - Add an unordered list populated with store data
// ----------------------------------------------------------
// Create section element
var locationSeaTacAirportSectionEl = document.createElement('section');

// Append section element to container
locationsContainer.appendChild(locationSeaTacAirportSectionEl);

// Create h2 element
var locationSeaTacAirportH2El = document.createElement('h2');

// Add location name to h2
locationSeaTacAirportH2El.textContent = 'SeaTac Airport';

// Append h2 to the container element
locationSeaTacAirportSectionEl.appendChild(locationSeaTacAirportH2El);

// Create unordered list
var locationSeaTacAirportUlEl = document.createElement('ul');

// Append ul to the container element
locationSeaTacAirportSectionEl.appendChild(locationSeaTacAirportUlEl);

// Lets populate some data in that unordered list!
// ----------------------------------------------------------
// Iterate through array of data located in property cookiesSoldPerHour
for (i = 0; i < locationSeaTacAirport.cookiesSoldPerHour.length; i++) {
  // Create a new list item (li)
  var locationSeaTacAirportLiEl = document.createElement('li');

  // Add cookies sold per hour
  locationSeaTacAirportLiEl.textContent = locationSeaTacAirport.cookiesSoldPerHour[i];

  // Append li to the undordered list
  locationSeaTacAirportUlEl.appendChild(locationSeaTacAirportLiEl);
}

// **********************************************************************
// Location - Seattle Center
// **********************************************************************
var locationSeattleCenter = {
  minHourlyCustomers: 11,
  maxHourlyCustomers: 38,
  avgCookiesPerCustomer: 3.7,
  numberOfCustomers: function() {
    // Generates random number between maxHourlyCustomers & minHourlyCustomers
    // The max & min are inclusive;
    return Math.floor(Math.random() * (this.maxHourlyCustomers - this.minHourlyCustomers + 1)) + this.minHourlyCustomers;
  },
  cookiesSoldPerHour: [],
  totalCookiesSold: 0
};

// Data - Create store data for Seattle Center
// ----------------------------------------------------------
for (i = 0; i < hoursOfOperation.length; i++) {
  // Number of customers per hour
  customers = locationSeattleCenter.numberOfCustomers();

  // Number of cookies per hour
  cookies = Math.round(customers * locationSeattleCenter.avgCookiesPerCustomer);

  // Formatted cookies per hour. ex "6am: 24 cookies"
  result = `${hoursOfOperation[i]}: ${cookies} cookies`;

  // Add result to object property "cookiesSoldPerHour"
  locationSeattleCenter.cookiesSoldPerHour.push(result);

  // Increment total number of cookies sold
  locationSeattleCenter.totalCookiesSold += cookies;
}

// Log to console for debugging cookie data
console.log(locationSeattleCenter.cookiesSoldPerHour);
console.log(locationSeattleCenter.totalCookiesSold);

// DOM - Add an unordered list populated with store data
// ----------------------------------------------------------
// Create section element
var locationSeattleCenterSectionEl = document.createElement('section');

// Append section element to container
locationsContainer.appendChild(locationSeattleCenterSectionEl);

// Create h2 element
var locationSeattleCenterH2El = document.createElement('h2');

// Add location name to h2
locationSeattleCenterH2El.textContent = 'Seattle Center';

// Append h2 to the container element
locationSeattleCenterSectionEl.appendChild(locationSeattleCenterH2El);

// Create unordered list
var locationSeattleCenterUlEl = document.createElement('ul');

// Append ul to the container element
locationSeattleCenterSectionEl.appendChild(locationSeattleCenterUlEl);

// Lets populate some data in that unordered list!
// ----------------------------------------------------------
// Iterate through array of data located in property cookiesSoldPerHour
for (i = 0; i < locationSeattleCenter.cookiesSoldPerHour.length; i++) {
  // Create a new list item (li)
  var locationSeattleCenterLiEl = document.createElement('li');

  // Add cookies sold per hour
  locationSeattleCenterLiEl.textContent = locationSeattleCenter.cookiesSoldPerHour[i];

  // Append li to the undordered list
  locationSeattleCenterUlEl.appendChild(locationSeattleCenterLiEl);
}

// **********************************************************************
// Location - Capitol Hill
// **********************************************************************
var locationCapitolHill = {
  minHourlyCustomers: 20,
  maxHourlyCustomers: 38,
  avgCookiesPerCustomer: 2.3,
  numberOfCustomers: function() {
    // Generates random number between maxHourlyCustomers & minHourlyCustomers
    // The max & min are inclusive;
    return Math.floor(Math.random() * (this.maxHourlyCustomers - this.minHourlyCustomers + 1)) + this.minHourlyCustomers;
  },
  cookiesSoldPerHour: [],
  totalCookiesSold: 0
};

// Data - Create store data for Capitol Hill
// ----------------------------------------------------------
for (i = 0; i < hoursOfOperation.length; i++) {
  // Number of customers per hour
  customers = locationCapitolHill.numberOfCustomers();

  // Number of cookies per hour
  cookies = Math.round(customers * locationCapitolHill.avgCookiesPerCustomer);

  // Formatted cookies per hour. ex "6am: 24 cookies"
  result = `${hoursOfOperation[i]}: ${cookies} cookies`;

  // Add result to object property "cookiesSoldPerHour"
  locationCapitolHill.cookiesSoldPerHour.push(result);

  // Increment total number of cookies sold
  locationCapitolHill.totalCookiesSold += cookies;
}

// Log to console for debugging cookie data
console.log(locationCapitolHill.cookiesSoldPerHour);
console.log(locationCapitolHill.totalCookiesSold);

// DOM - Add an unordered list populated with store data
// ----------------------------------------------------------
// Create section element
var locationCapitolHillSectionEl = document.createElement('section');

// Append section element to container
locationsContainer.appendChild(locationCapitolHillSectionEl);

// Create h2 element
var locationCapitolHillH2El = document.createElement('h2');

// Add location name to h2
locationCapitolHillH2El.textContent = 'Capitol Hill';

// Append h2 to the container element
locationCapitolHillSectionEl.appendChild(locationCapitolHillH2El);

// Create unordered list
var locationCapitolHillUlEl = document.createElement('ul');

// Append ul to the container element
locationCapitolHillSectionEl.appendChild(locationCapitolHillUlEl);

// Lets populate some data in that unordered list!
// ----------------------------------------------------------
// Iterate through array of data located in property cookiesSoldPerHour
for (i = 0; i < locationCapitolHill.cookiesSoldPerHour.length; i++) {
  // Create a new list item (li)
  var locationCapitolHillLiEl = document.createElement('li');

  // Add cookies sold per hour
  locationCapitolHillLiEl.textContent = locationCapitolHill.cookiesSoldPerHour[i];

  // Append li to the undordered list
  locationCapitolHillUlEl.appendChild(locationCapitolHillLiEl);
}

// **********************************************************************
// Location - Alki
// **********************************************************************
var locationAlki = {
  minHourlyCustomers: 2,
  maxHourlyCustomers: 16,
  avgCookiesPerCustomer: 4.6,
  numberOfCustomers: function() {
    // Generates random number between maxHourlyCustomers & minHourlyCustomers
    // The max & min are inclusive;
    return Math.floor(Math.random() * (this.maxHourlyCustomers - this.minHourlyCustomers + 1)) + this.minHourlyCustomers;
  },
  cookiesSoldPerHour: [],
  totalCookiesSold: 0
};

// Data - Create store data for Alki
// ----------------------------------------------------------
for (i = 0; i < hoursOfOperation.length; i++) {
  // Number of customers per hour
  customers = locationAlki.numberOfCustomers();

  // Number of cookies per hour
  cookies = Math.round(customers * locationAlki.avgCookiesPerCustomer);

  // Formatted cookies per hour. ex "6am: 24 cookies"
  result = `${hoursOfOperation[i]}: ${cookies} cookies`;

  // Add result to object property "cookiesSoldPerHour"
  locationAlki.cookiesSoldPerHour.push(result);

  // Increment total number of cookies sold
  locationAlki.totalCookiesSold += cookies;
}

console.log(locationAlki.cookiesSoldPerHour);
console.log(locationAlki.totalCookiesSold);

// DOM - Add an unordered list populated with store data
// ----------------------------------------------------------
// Create section element
var locationAlkiSectionEl = document.createElement('section');

// Append section element to container
locationsContainer.appendChild(locationAlkiSectionEl);

// Create h2 element
var locationAlkiH2El = document.createElement('h2');

// Add location name to h2
locationAlkiH2El.textContent = 'Alki';

// Append h2 to the container element
locationAlkiSectionEl.appendChild(locationAlkiH2El);

// Create unordered list
var locationAlkiUlEl = document.createElement('ul');

// Append ul to the container element
locationAlkiSectionEl.appendChild(locationAlkiUlEl);

// Lets populate some data in that unordered list!
// ----------------------------------------------------------
// Iterate through array of data located in property cookiesSoldPerHour
for (i = 0; i < locationAlki.cookiesSoldPerHour.length; i++) {
  // Create a new list item (li)
  var locationAlkiLiEl = document.createElement('li');

  // Add cookies sold per hour
  locationAlkiLiEl.textContent = locationAlki.cookiesSoldPerHour[i];

  // Append li to the undordered list
  locationAlkiUlEl.appendChild(locationAlkiLiEl);
}
