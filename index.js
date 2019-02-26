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
    setTimeout(function() {
      updateFunction(serve.apply(this, "Happy Eating!", this.customer))
    }, 2000)
  }
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
  var updateCakeStatus = (statusText) => {document.getElementsByClassName("status")[0].innerText = statusText};
  mix.call(cake, updateCakeStatus)
}

pie.decorate = cake.decorate.bind(pie) ;

function makePie() {
  var updatePieStatus = (statusText) => {document.getElementsByClassName("status")[1].innerText = statusText};
  mix.call(pie, updatePieStatus) ;
}

function updateStatus(statusText) {
  document.getElementsByClassName("status")[0].innerText = statusText
}

function bake(updateFunction) {
  var status = "Baking at " + this.bakeTemp + " for " + this.bakeTime
  updateFunction(status)
  console.log(`bake has ${this.name}`)
  var next = cool.bind(this) ;
  setTimeout(next(updateFunction), 2000) ;

}

function mix(updateFunction) {
  var status = "Mixing " + this.ingredients.join(", ")
  updateFunction(status)
  console.log(`mix has ${this.name}`)
  var next = bake.bind(this) ;
  setTimeout(next(updateFunction), 2000)

}

function cool(updateFunction) {
  console.log(`cool has ${this.name}`)
  var status = "It has to cool! Hands off!"
  updateFunction(status)
  var next = cake.decorate.bind(this) ;
  setTimeout(next(updateFunction), 2000)
}

function makeDessert(e) {
  console.log(this)
e.path[0].id == "make-cake" ? makeCake() : makePie() ;
}

function serve(message, customer) {
  //you shouldn't need to alter this function
  return(customer + ", your " + this.name + " is ready to eat! " + message)
}

document.addEventListener("DOMContentLoaded", function(event) {
  //you shouldn't need to alter this function
  var cookLinks = document.getElementsByClassName("js-make")
  for(var i=0; i<cookLinks.length; i++) {
    cookLinks[i].addEventListener("click", makeDessert)
  }
});
