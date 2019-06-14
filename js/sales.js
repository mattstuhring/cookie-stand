'use strict';

// Get the container element where I display all locations
var locationsTable = document.getElementById('locations-table');

// Hours of operation 6am - 8pm
var hoursOfOperation = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];

// Store each location object into array
var allLocationsArray = [];

// **********************************************************
// Constructor - Locations
// **********************************************************
var LocationStore = function(
  name,
  minHourlyCustomers,
  maxHourlyCustomers,
  avgCookiesPerCustomer,
  totalCookiesSoldPerHour,
  totalCookiesSold
) {
  this.name = name;
  this.minHourlyCustomers = minHourlyCustomers;
  this.maxHourlyCustomers = maxHourlyCustomers;
  this.avgCookiesPerCustomer = avgCookiesPerCustomer;
  this.totalCookiesSoldPerHour = totalCookiesSoldPerHour;
  this.totalCookiesSold = totalCookiesSold;
};

// Generates random number between maxHourlyCustomers & minHourlyCustomers
// The max & min are inclusive;
LocationStore.prototype.calculateNumberOfCustomers = function() {
  return Math.floor(Math.random() * (this.maxHourlyCustomers - this.minHourlyCustomers + 1)) + this.minHourlyCustomers;
};

// Number of cookies per hour; round to nearest whole number
// Save data to totalCookiesSoldPerHour array
LocationStore.prototype.calculateCookiesSoldPerHour = function() {
  // Generate random number of customers
  var customersPerHour = this.calculateNumberOfCustomers();

  var cookiesPerHour = Math.round(customersPerHour * this.avgCookiesPerCustomer);
  this.totalCookiesSoldPerHour.push(cookiesPerHour);

  return cookiesPerHour;
};

// Calculate how many cookies were sold during the hours of operations (6am - 8am)
LocationStore.prototype.calculateTotalCookiesSold = function(cookies) {
  this.totalCookiesSold += cookies;
};

// Data - Create store data for location
// ----------------------------------------------------------
LocationStore.prototype.makeData = function() {
  for (var i = 0; i < hoursOfOperation.length; i++) {
    // Number of cookies per hour; round to nearest whole number
    var cookies = this.calculateCookiesSoldPerHour();

    // Increment total number of cookies sold
    this.calculateTotalCookiesSold(cookies);
  }
};

// Create table headers 6am - 8pm
function createTableHoursOfOperationTh() {
  var tableTr, tableTh;

  // Create table row (tr) element
  tableTr = document.createElement('tr');
  locationsTable.appendChild(tableTr);
  // Create empty header element
  tableTh = document.createElement('th');
  tableTr.appendChild(tableTh);

  // Iterate through hours of operation to create table header (th) elements displaying 6am - 8pm
  for (var i = 0; i < hoursOfOperation.length; i++) {
    tableTh = document.createElement('th');
    tableTh.textContent = hoursOfOperation[i];
    tableTr.appendChild(tableTh);
  }

  // Create Totals column
  tableTh = document.createElement('th');
  tableTh.textContent = 'Daily Location Total';
  tableTr.appendChild(tableTh);
}

// Create table Locaton data; Cookies per hour of operation
function createTableCookiesPerHourTd() {
  var tableTd, tableTr;

  // Iterate through to populate table data rows
  for (var j = 0; j < allLocationsArray.length; j++) {
    // Create new tr
    tableTr = document.createElement('tr');
    locationsTable.appendChild(tableTr);

    // Add new td for location name
    tableTd = document.createElement('td');
    tableTd.textContent = allLocationsArray[j].name;
    tableTr.appendChild(tableTd);

    // Add new td for each cookies sold per hour data point
    for (var k = 0; k < allLocationsArray[j].totalCookiesSoldPerHour.length; k++) {
      tableTd = document.createElement('td');
      tableTd.textContent = allLocationsArray[j].totalCookiesSoldPerHour[k];
      tableTr.appendChild(tableTd);
    }

    // Add new td for "Daily Location Total"
    tableTd = document.createElement('td');
    tableTd.textContent = allLocationsArray[j].totalCookiesSold;
    tableTr.appendChild(tableTd);
  }
}

// Caluclation Hourly totals of cookies sold between all locations
function calculateAllLocationsCookiesPerHour() {
  var count = 1;
  var calcArr = [];
  var multiArr = [];
  var sum = [];
  var total = 0;
  var completeTotal = 0;

  // Create array of empty arrays. ex. [[], [], []]
  while (count <= allLocationsArray[0].totalCookiesSoldPerHour.length) {
    calcArr.push([]);
    count++;
  }

  // Store each location cookie data inside an array
  for (var l = 0; l < allLocationsArray.length; l++) {
    multiArr.push(allLocationsArray[l].totalCookiesSoldPerHour);
  }

  // Store arrays with the hourly cookies sold from all locations
  // ex. [[1,2,3], [4,5,6], [7,8,9]] -> [[1,4,7], [2,5,8], [3,6,9]]
  for (var m = 0; m < multiArr.length; m++) {
    for (var n = 0; n < multiArr[m].length; n++) {
      calcArr[n].push(multiArr[m][n]);
    }
  }

  // Sum totals from the array of arrays containing hourly cookies sold from all locations 
  for (m = 0; m < calcArr.length; m++) {
    for (n = 0; n < calcArr[m].length; n++) {
      total += calcArr[m][n];
      completeTotal += calcArr[m][n];
    }

    sum.push(total);
    total = 0;
  }

  return [sum, completeTotal];
}

// Create table totals td
function createTableTotalsTd() {
  var tableTr, tableTd;
  // Hourly totals from all locations
  // Create new tr
  tableTr = document.createElement('tr');
  locationsTable.appendChild(tableTr);

  // Add new td for location name
  tableTd = document.createElement('td');
  tableTd.textContent = 'Totals';
  tableTr.appendChild(tableTd);

  var sum = calculateAllLocationsCookiesPerHour()[0];
  var completeTotal = calculateAllLocationsCookiesPerHour()[1];

  // Add totals to the last row
  for (var i = 0; i < sum.length; i++) {
    tableTd = document.createElement('td');
    tableTd.textContent = sum[i];
    tableTr.appendChild(tableTd);
  }

  // Add Daily Location Total
  tableTd = document.createElement('td');
  tableTd.textContent = completeTotal;
  tableTr.appendChild(tableTd);
}

// Let's put our DOM functions into work!
function createTableDomElements() {

  createTableHoursOfOperationTh();

  createTableCookiesPerHourTd();

  createTableTotalsTd();
}

// Create the locations data and store the data in the allLocationsArray
function locationCreator() {
  var locations = [
    new LocationStore('1st and Alki', 23, 65, 6.3, [], 0),
    new LocationStore('SeaTac Airport', 3, 24, 1.2, [], 0),
    new LocationStore('Seattle Center', 11, 38, 3.7, [], 0),
    new LocationStore('Capitol Hill', 20, 38, 2.3, [], 0),
    new LocationStore('Alki', 2, 16, 4.6, [], 0)
  ];

  for (var i = 0; i < locations.length; i++) {
    locations[i].makeData();
    allLocationsArray.push(locations[i]);
  }

  createTableDomElements();
}

// **********************************************************
// Constructor - Store
// **********************************************************
var Store = function(name, min, max, avg){
  this.name = name;
  this.min = min;
  this.max = max;
  this.avg = avg;
};

// Save the form element in a variable
var storeForm = document.getElementById('store');

// Add eventlistener to the form
storeForm.addEventListener('submit', function(event){
  event.preventDefault();

  // Save all the form inputs
  var name = event.target.name.value;
  var min = parseInt(event.target.min.value);
  var max = parseInt(event.target.max.value);
  var avg = parseInt(event.target.avg.value);

  // Form validation!!!!!
  if (name === '' || typeof name !== 'string') {
    alert('Please enter a valid string');
    return;
  }

  if (min < 0 || typeof min !== 'number' || min >= max) {
    alert('Please enter number greater or equal to 0 and must be less than maximum');
    return;
  }

  if (max < 0 || typeof max !== 'number' || max <= min) {
    alert('Please enter number greater than the minimum');
    return;
  }

  if (avg <= 0 || typeof avg !== 'number') {
    alert('Please enter a number greater than 0');
    return;
  }

  // Create new Store objec from the new form data
  var formData = new Store(name, min, max, avg);

  // Create a new store
  var newStore = new LocationStore(formData.name, formData.min, formData.max, formData.avg, [], 0);
  newStore.makeData(); // Create store data; Cookies sold per hour ...

  // Add new store to the global all locations array
  allLocationsArray.push(newStore);

  // Remove the table from the DOM
  locationsTable.innerHTML = '';

  // Clear all form inputs
  storeForm.reset();

  toggleDisplayClass.classList.toggle('toggle-form');

  // Display the new table to the DOM
  createTableDomElements();
});

// Toggle - hide & show "add store" form
var storeLink = document.getElementById('toggle-store-form');
var toggleDisplayClass = document.querySelector('.store-container');

var handleFormToggle = function(event) {
  event.preventDefault();

  toggleDisplayClass.classList.toggle('toggle-form');
};

storeLink.addEventListener('click', handleFormToggle);



// Call the location creator function to create DOM elements!
locationCreator();
