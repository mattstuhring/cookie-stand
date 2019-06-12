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
var Location = function(name, minHourlyCustomers, maxHourlyCustomers, avgCookiesPerCustomer, totalCookiesSoldPerHour, totalCookiesSold) {
  this.name = name;
  this.minHourlyCustomers = minHourlyCustomers;
  this.maxHourlyCustomers = maxHourlyCustomers;
  this.avgCookiesPerCustomer = avgCookiesPerCustomer;
  this.totalCookiesSoldPerHour = totalCookiesSoldPerHour;
  this.totalCookiesSold = totalCookiesSold;
};

// Generates random number between maxHourlyCustomers & minHourlyCustomers
// The max & min are inclusive;
Location.prototype.calculateNumberOfCustomers = function() {
  return Math.floor(Math.random() * (this.maxHourlyCustomers - this.minHourlyCustomers + 1)) + this.minHourlyCustomers;
};

// Number of cookies per hour; round to nearest whole number
// Save data to totalCookiesSoldPerHour array
Location.prototype.calculateCookiesSoldPerHour = function() {
  // Generate random number of customers
  var customersPerHour = this.calculateNumberOfCustomers();

  var cookiesPerHour = Math.round(customersPerHour * this.avgCookiesPerCustomer);
  this.totalCookiesSoldPerHour.push(cookiesPerHour);

  return cookiesPerHour;
};

// Calculate how many cookies were sold during the hours of operations (6am - 8am)
Location.prototype.calculateTotalCookiesSold = function(cookies) {
  this.totalCookiesSold += cookies;
};

// Data - Create store data for location
// ----------------------------------------------------------
Location.prototype.makeData = function() {
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
      console.log(calcArr[m][n]);
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
    new Location('1st and Alki', 23, 65, 6.3, [], 0),
    new Location('SeaTac Airport', 3, 24, 1.2, [], 0),
    new Location('Seattle Center', 11, 38, 3.7, [], 0),
    new Location('Capitol Hill', 20, 38, 2.3, [], 0),
    new Location('Alki', 2, 16, 4.6, [], 0)
  ];

  for (var i = 0; i < locations.length; i++) {
    locations[i].makeData();
    allLocationsArray.push(locations[i]);
  }

  createTableDomElements();
}

// Call the location creator function!
locationCreator();
