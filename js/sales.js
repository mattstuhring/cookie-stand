'use strict';

// GLOBAL variables
// ----------------------------------------------------------
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
// ----------------------------------------------------------
LocationStore.prototype.calculateNumberOfCustomers = function() {
  return Math.floor(Math.random() * (this.maxHourlyCustomers - this.minHourlyCustomers + 1)) + this.minHourlyCustomers;
};

// Number of cookies per hour; round to nearest whole number
// Save data to totalCookiesSoldPerHour array
// ----------------------------------------------------------
LocationStore.prototype.calculateCookiesSoldPerHour = function() {
  // Generate random number of customers
  var customersPerHour = this.calculateNumberOfCustomers();

  var cookiesPerHour = Math.round(customersPerHour * this.avgCookiesPerCustomer);
  this.totalCookiesSoldPerHour.push(cookiesPerHour);

  return cookiesPerHour;
};

// Calculate how many cookies were sold during the hours of operations (6am - 8am)
// ----------------------------------------------------------
LocationStore.prototype.calculateTotalCookiesSold = function(cookies) {
  return this.totalCookiesSold += cookies;
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

// HTML element creator function!
// ----------------------------------------------------------
function createTableElement(parent, el, content) {
  var child = document.createElement(el);

  if (content) {
    child.textContent = content;
  }

  parent.appendChild(child);

  return child;
}

// Create table headers 6am - 8pm
// ----------------------------------------------------------
function createTableHoursOfOperationTh() {
  // Create table row (tr) element
  var tableTr = createTableElement(locationsTable, 'tr', false);

  // Create empty header element
  createTableElement(tableTr, 'th', false);

  // Iterate through hours of operation to create table header (th) elements displaying 6am - 8pm
  for (var i = 0; i < hoursOfOperation.length; i++) {
    createTableElement(tableTr, 'th', hoursOfOperation[i]);
  }

  // Create Daily Location Total column
  createTableElement(tableTr, 'th', 'Daily Location Total');
}

// Create table Locaton data; Cookies per hour of operation
// ----------------------------------------------------------
function createTableCookiesPerHourTd() {
  // Iterate through to populate table data rows
  for (var j = 0; j < allLocationsArray.length; j++) {
    // Create new tr
    var tableTr = document.createElement('tr');
    locationsTable.appendChild(tableTr);

    // Add new td for location name
    createTableElement(tableTr, 'td', allLocationsArray[j].name);

    // Add new td for each cookies sold per hour data point
    for (var k = 0; k < allLocationsArray[j].totalCookiesSoldPerHour.length; k++) {
      createTableElement(tableTr, 'td', allLocationsArray[j].totalCookiesSoldPerHour[k]);
    }

    // Add new td for "Daily Location Total"
    createTableElement(tableTr, 'td', allLocationsArray[j].totalCookiesSold);
  }
}

// Caluclation Hourly totals of cookies sold between all locations
// ----------------------------------------------------------
function calculateAllLocationsCookiesPerHour() {
  var totals = [];
  var total = 0;
  for (var i = 0; i < allLocationsArray[0].totalCookiesSoldPerHour.length; i++) {
    var sum = 0;

    for (var j = 0; j < allLocationsArray.length; j++) {
      sum += allLocationsArray[j].totalCookiesSoldPerHour[i];
    }

    totals.push(sum);
    total += sum;
  }

  return [totals, total];
}

// Create table totals td
// ----------------------------------------------------------
function createTableTotalsTd() {
  // Create new tr for all locations hourly totals
  var tableTr = createTableElement(locationsTable, 'tr', false);

  // Add new td for location name
  createTableElement(tableTr, 'td', 'Totals');

  // Get totals from function
  var result = calculateAllLocationsCookiesPerHour();
  var totals = result[0];
  var total = result[1];

  // Add totals to the last row
  for (var i = 0; i < totals.length; i++) {
    createTableElement(tableTr, 'td', totals[i]);
  }

  // Add Daily Location Total
  createTableElement(tableTr, 'td', total);
}

// Let's put our DOM creater functions into work!
// Create HTML table with data!
// ----------------------------------------------------------
function createTableDomElements() {

  createTableHoursOfOperationTh();

  createTableCookiesPerHourTd();

  createTableTotalsTd();
}

// Create the locations data and store the data in the allLocationsArray
// ----------------------------------------------------------
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
// ----------------------------------------------------------
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

  // Toggle the add new form to either hide or show
  toggleDisplayClass.classList.toggle('toggle-form');

  // Display the new table to the DOM
  createTableDomElements();
});

// Toggle - hide & show "add store" form
var storeLink = document.getElementById('toggle-store-form');
var toggleDisplayClass = document.querySelector('.store-container');

// Toggle event handler
// ----------------------------------------------------------
var handleFormToggle = function(event) {
  event.preventDefault();

  toggleDisplayClass.classList.toggle('toggle-form');
};

// Create toggle event listener
storeLink.addEventListener('click', handleFormToggle);

// Call the location creator function to create DOM elements!
locationCreator();
