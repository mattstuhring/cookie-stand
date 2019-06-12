'use strict';
var Store = function(name, min, max, avg){
  this.name = name;
  this.min = min;
  this.max = max;
  this.avg = avg;

};


var storeForm = document.getElementById('store');

storeForm.addEventListener('submit', function(event){
  event.preventDefault();
  console.log(event);
  var name = event.target.name.value;
  var min = event. target.min.value;
  var max = event.target.max.value;
  var avg = event.target.avg.value;

  var newStore = new Store(name, min, max, avg);
  LocationStore.allLocationsArray.push(newStore);
});
