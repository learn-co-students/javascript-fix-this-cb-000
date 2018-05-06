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
      serve.apply(this, ["Happy Eating!", this.customer])
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
  var cakeNode = document.getElementById("cake")
  var updateCakeStatus = updateStatus.bind(cakeNode)

  mix.call(cake,updateCakeStatus)
}

function makePie() {
  var pieNode = document.getElementById("pie")
  var updatePieStatus = updateStatus.bind(pieNode)
  pie.decorate = cake.decorate.bind(pie)
  mix.call(pie,updatePieStatus)
}

function updateStatus(statusText) {
  document.getElementsByClassName("status")[0].innerText = statusText
}

function bake(updateFunction) {
  var status = "Baking at " + this.bakeTemp + " for " + this.bakeTime
  setTimeout(function() {
    cool(updateFunction)
  }, 2000)
  updateFunction(status)
}
function mix(updateFunction) {
  var status = "Mixing " + this.ingredients.join(", ")
  var item = (this.name.includes("Pie")) ? pie : cake
  setTimeout(function() {
    bake.call(item, updateFunction)
    }, 2000)
  updateFunction(status)
}

function cool(updateFunction) {
  var status = "It has to cool! Hands off!"
  var item = (this.name.includes("Pie")) ? pie : cake
  setTimeout(function() {
    item.decorate(updateFunction)
  }, 2000)
  updateFunction(status)
}

function makeDessert() {
  //add code here to decide which make... function to call
  //based on which link was clicked
  var pieNode = document.getElementById("pie")
  var cakeNode = document.getElementById("cake")

  if(this == cakeNode.getElementsByClassName('js-make')[0]){
    makeCake()
  }
  else if(this == pieNode.getElementsByClassName('js-make')[0]){
    makePie()
  }
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
