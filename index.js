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

var pie = {
  name: "Apple Pie",
  ingredients: ["apples", "flour", "eggs", "butter", "sugar"],
  topping: "streusel",
  bakeTemp: "350 degrees",
  bakeTime: "75 minutes",
  customer: "Tammy"
}

function makeCake() {
  //binding the HTML parentNode to the function updateCakeStatus
  var updateCakeStatus = updateStatus.bind(this);
  //calling our newly bound updateStatus function 
  //because we bound this function above, inside update
  //updateCakeStatus we can reference this and it
  //will point the the correct HTML element.
  updateCakeStatus("Prep")
  //Calling the cake's mix function with the cake
  //object and updateCakeStatus, which has been
  //bound to the updateStatus method.
  //Note: updateStatus didn't exist, AND it wasn't
  //part of any object - so binding this creates the
  //ability to reference the appropriate "this" element
  //so we can set the correct part of the HTML div
  mix.call(cake, updateCakeStatus)
}

function makePie() {
  //Creating a variable updatePieStatus and binding
  //the updateStatus function to the parentNode of
  //the HTML element.
  var updatePieStatus = updateStatus.bind(this);

  //Calling updatePieStatus, now referencing the
  //this object of our HTML element, with the
  //string "Prep"
  updatePieStatus("Prep")
  //pie has already been declared in the global
  //space.
  //binding cake's decorate function to the new
  //pie member function "decorate"
  pie.decorate = cake.decorate.bind(pie);

  //Calling mix, passing the pie object and 
  //the appropriate updatePieStatus function
  //which has previously been bound to the
  //appropriate HTML element.
  mix.call(pie, updatePieStatus);
}

function updateStatus(statusText) {
  //this is our HTML parentNode of the link that
  //was chased.
  //This is where we update the status on our link
  this.getElementsByClassName("status")[0].innerText = statusText
}

function bake(updateFunction) {
  //Set status using values from our cake or pie object
  //depending upon what "this" was set to
  var status = "Baking at " + this.bakeTemp + " for " + this.bakeTime
  //updateFunction was set previously to point to
  //the appropriate HTML element.  So when we take
  //the status, and use the this element it will  
  //point to the correct HTML element.
 updateFunction(status)

 //Our pointer function to set the timeout,
 //passing cool with the appropriate object (this), 
 //and the appropriate updateFunction already set
 //to the parentNode of our current HTML object.
  setTimeout(() => {
    cool.call(this, updateFunction)
  }, 2000)
}

function mix(updateFunction) {
  //our status message using "this" as the ingredients
  //for either our pie or our cake
  var status = "Mixing " + this.ingredients.join(", ")
  
  //our updateFunction has already been bound to
  //the appropriate HTML parentNode so we can
  //update the correct area of our HTML
  updateFunction(status)

  //Our pointer function, passing it the correct
  //object (this is either the pie or the cake) and
  //the updateFunction which has been bound to the
  //parentNode of our current HTML object.
  setTimeout(() => {
    bake.call(this, updateFunction)
  }, 2000)
}

function cool(updateFunction) {
  //Set status string to update on our HTML
  var status = "It has to cool! Hands off!"
  //updateFunction has been set to the HTML
  //parentNode, passing the status string to
  //update our HTML
  updateFunction(status)

  //Setting the timeout with our pointer function,
  //passing in the updateFunction for our object
  //and calling the appropriate "this" decorate
  //object (which was set when cool.call(obj, val)) was
  //invoked
  setTimeout(() => {
    this.decorate(updateFunction)
  }, 2000)
}

function makeDessert() {

  //this is the anchor tag
  //we need to look up one level to determine
  //if this div id is cake or pie
  if(this.parentNode.id == "cake"){
    //here we makeCake, using the parentNode div
    //so that we know how to update the status
    //on our HTML page
    makeCake.call(this.parentNode)
  } else {
    makePie.call(this.parentNode)
  }
}

function serve(message, customer) {
  //you shouldn't need to alter this function
  return(customer + ", your " + this.name + " is ready to eat! " + message)
}

document.addEventListener("DOMContentLoaded", function(event) {
  //you shouldn't need to alter this function
  //here we get handles on both of the anchor tags
  var cookLinks = document.getElementsByClassName("js-make")
  
  //here we setup the event listener for the anchor tag links onclick
  for(var i=0; i<cookLinks.length; i++) {
    cookLinks[i].addEventListener("click", makeDessert)
  }
});
