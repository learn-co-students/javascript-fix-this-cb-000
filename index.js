var cake = {
  name: "German Chocolate Cake",
  ingredients: ["eggs", "flour", "oil", "chocolate", "sugar", "butter"],
  topping: "coconut frosting",
  bakeTemp: "425 degrees",
  bakeTime: "45 minutes",
  customer: "Tommy",
  decorate: function(updateFunction) {

    var status = "Decorating with " + this.topping + ". Ready to eat soon!"
    updateFunction(status);
    setTimeout(() => {


      updateFunction(serve.apply(this, ["Happy Eating!", this.customer]))
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

  var updateCakeStatus = updateStatus.bind(this);

  mix.call(cake,updateCakeStatus);
}

function makePie() {

  var updatePieStatus = updateStatus.bind(this);
  pie.decorate = cake.decorate.bind(pie)
  mix.call(pie,updatePieStatus);

}

function updateStatus(statusText) {

  if (this.id === "pie") {
      this.getElementsByClassName("status")[0].innerText = statusText
  }else if (this.id === "cake") {
      this.getElementsByClassName("status")[0].innerText = statusText

  }
}

function bake(updateFunction) {

  var status = "Baking at " + this.bakeTemp + " for " + this.bakeTime
  updateFunction.call(this,status);
  setTimeout(() => {

    cool.call(this,updateFunction)
  }, 2000)
}

function mix(updateFunction) {

  var status = "Mixing " + this.ingredients.join(", ");

  updateFunction(status);
  setTimeout(() => {

  if (this === pie) {
      bake.call(pie,updateFunction);
  } else {
      bake.call(cake, updateFunction);
  }

  }, 2000)

}

function cool(updateFunction) {

  var status = "It has to cool! Hands off!"

    updateFunction(status);
    setTimeout(() => {

      if (this === cake){
        cake.decorate.call(this, updateFunction)
      }else {
        pie.decorate.call(this, updateFunction)
      }

    }, 3000)



}

function makeDessert() {

  //add code here to decide which make... function to call
  //based on which link was clicked

          if (this.parentNode.id === "pie") {

            makePie.call(this.parentNode);
          }else if (this.parentNode.id === "cake"){
            makeCake.call(this.parentNode);
          }

    }


var buttons = document.getElementsByClassName('js-make');
for(let i = 0; i < buttons.length; i++){
    buttons[i].addEventListener('click',makeDessert);
  }


function serve(message, customer) {
    return(customer + ", your " + this.name + " is ready to eat! " + message)
}
