/*
The way that I could undrestand how this code works:

User clicks on [Make a Cake] link:
1. we know we need to make a cake so we call #makeCake
2. we need a way to update the status of our cake. We make a copy of #updateStatus that knows what is 'this' so it
  can correctly change the status for us in for the right <div>.
3. we call the new #updateStatus function that we just made and we pass it the new status which is "prep".
4* The status has changed to ["prep"], only for a milli second.
5. Now we want to call #mix function on this cake so #mix can change the stauts for us too. We set everything for #mix to work.
  It needs a function so it can also change the status. Since we have a ready function that knows how to change status of this
  particular cake we are passing the same function to that.
6* In #mix we chnage the status to ["Mixing " + this.ingredients.join(", ").]
7. After 2 seconds we call #bake function and let #bake function know how to update the status
8* The status has changed to ["Baking at " + this.bakeTemp + " for " + this.bakeTime]
9. After 2 seconds we call #cool function and let #cool function know how to update the status
10* The status has changed to ["It has to cool! Hands off!"]
11. After 2 seconds we call #decorete function that belongs to cake itself and let #decorete function know how
  to update the status
12* The status has changed to ["Decorating with " + this.topping + ". Ready to eat soon!"]
13. After 2 seconds we call #updateCakeStatus and pass to it #serve function and let #serve function know how about the cake by passing
  cake as 'this' to it. 
14* The status has changed to ["Decorating with " + this.topping + ". Ready to eat soon!"]


In all phases we are passing cake as 'this' with methods like call and apply.
mix(updateCakeStatus) -> bake(updateCakeStatus) -> cool(updateCakeStatus) -> this.decorate(updateCakeStatus) -> updateCakeStatus(serve)
this = cake               this = cake               this = cake               this = cake                         this = cake
*/

var cake = {
  name: "German Chocolate Cake",
  ingredients: ["eggs", "flour", "oil", "chocolate", "sugar", "butter"],
  topping: "coconut frosting",
  bakeTemp: "425 degrees",
  bakeTime: "45 minutes",
  customer: "Tommy",
  decorate: function(updateFunction) {
    var status = "Decorating with " + this.topping + ". Ready to eat soon!"
    updateFunction(status)
    setTimeout(() => {
      updateFunction(serve.apply(this, ["Happy Eating!", this.customer]))
    }, 2000)
  }
}
function cool(updateFunction) {
  var status = "It has to cool! Hands off!"
  updateFunction(status)

  setTimeout(() => {
    this.decorate(updateFunction)
  }, 2000)
}

var pie = {
  name: "Apple Pie",
  ingredients: ["apples", "flour", "eggs", "butter", "sugar"],
  topping: "streusel",
  bakeTemp: "350 degrees",
  bakeTime: "75 minutes",
  customer: "Tammy"
}

function makeCake() {
  var updateCakeStatus = updateStatus.bind(this) // make a function to update status of the cake
  updateCakeStatus("Prep") // using that function to set the status to "Prep"
  mix.call(cake, updateCakeStatus)
}

function makePie() {
  var updatePieStatus = updateStatus.bind(this)
  updatePieStatus("Prep")
  pie.decorate = cake.decorate.bind(pie)
  mix.call(pie, updatePieStatus)
}

function updateStatus(statusText) {
  this.getElementsByClassName("status")[0].innerText = statusText
}

function mix(updateFunction) {
  var status = "Mixing " + this.ingredients.join(", ")
  updateFunction(status)

  setTimeout(() => {
    bake.call(this, updateFunction)
  }, 2000)
}

function bake(updateFunction) {
  var status = "Baking at " + this.bakeTemp + " for " + this.bakeTime
  updateFunction(status)

  setTimeout(() => {
    cool.call(this, updateFunction)
  }, 2000)
}

function cool(updateFunction) {
  var status = "It has to cool! Hands off!"
  updateFunction(status)

  setTimeout(() => {
    this.decorate(updateFunction)
  }, 2000)
}

function makeDessert() {
  if(this.parentNode.id === "cake") {
    makeCake.call(this.parentNode)
  } else {
    makePie.call(this.parentNode)
  }
}

function serve(message, customer) {
  return(customer + ", your " + this.name + " is ready to eat! " + message)
}

document.addEventListener("DOMContentLoaded", function(event) {
  var cookLinks = document.getElementsByClassName("js-make")
  for(var i=0; i<cookLinks.length; i++) {
    cookLinks[i].addEventListener("click", makeDessert)
  }
});
