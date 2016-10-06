// TASK: Add interactivity to form


"use strict";


// Hold DOM elements for easy access
var jobRoleSelect = document.getElementById('title');



// Set focus on the first text field
document.getElementById("name").focus();

//Make sure that tshirt colors aren't available until tshirt design is chosen
var colorSelector = document.getElementById('colors-js-puns');
colorSelector.innerHTML = "";

//make sure that bitcoin and paypal payment options aren't available until selected
var paypal = document.getElementById('paypal');
var bitcoin = document.getElementById('bitcoin');
bitcoin.style.display = 'none';
paypal.style.display = 'none';



// Reveal a text field when the "Other" option is selected from the "Job Role" drop down menu
document.getElementById("title").addEventListener("change", function(){
	var basicSection = document.querySelector('.basic');
	var jobSelected = jobRoleSelect.value;
	
	if(jobSelected === 'other' ) {
		var otherText = document.createElement('input');
		// Add an text input field. Use the id of "other-title" 
		otherText.setAttribute('id', 'other-title');
		otherText.setAttribute('type', 'text');
		otherText.setAttribute('name', 'other_field');
		otherText.setAttribute('placeholder', 'Your Title');

		basicSection.appendChild(otherText);
	}  

	if(jobSelected !== 'other'){
		if(document.getElementById("other-title")) {
			basicSection.removeChild(document.getElementById("other-title"));
		}
	}
});


// T-Shirt Info section of the form.
// For the T-Shirt color menu, only display the options that match the design selected in the "Design" menu. 
document.getElementById("design").addEventListener("change", function(){
	var tShirtMenu = document.getElementById('design');
	var tSelection = tShirtMenu.value;
	var colorSelector = document.getElementById('colors-js-puns');
	
	if(tSelection) {
		colorSelector.innerHTML = "";
		
	}
	if(tSelection === "js puns") {
		// If the user selects "Theme - JS Puns" then the color menu should only display "Cornflower Blue," "Dark Slate Grey," and "Gold."
		colorSelector.innerHTML = '<label for="color">Color:</label><select id="color"><option value="cornflowerblue">Cornflower Blue</option><option value="darkslategrey">Dark Slate Grey</option><option value="gold">Gold</option></select>';
		//tColor.innerHTML = "<option value='cornflowerblue'>Cornflower Blue</option><option value='darkslategrey'>Dark Slate Grey</option><option value='gold'>Gold</option>"; 
		
	}
	if(tSelection === "heart js") {
		// If the user selects "Theme - I ♥ JS" then the color menu should only display "Tomato," "Steel Blue," and "Dim Grey."
		colorSelector.innerHTML = '<label for="color">Color:</label><select id="color"><option value="tomato">Tomato</option><option value="steelblue">Steel Blue</option><option value="dimgrey">Dim Grey</option></select>';
		
	}
});
	

// Register for Activities section of the form.
document.querySelector(".activities").addEventListener("change", function(){
	var main = document.getElementById("all");
	var framework = document.getElementById("framework");
	var libs = document.getElementById("libs");
	var express = document.getElementById("express");
	var node = document.getElementById("node");
	var build = document.getElementById("build");
	var npm = document.getElementById("npm");

	var frameworkLbl = document.getElementById("frameworkLabel");
	var libsLbl = document.getElementById("libsLabel");
	var expressLbl = document.getElementById("expressLabel");
	var nodeLbl = document.getElementById("nodeLabel");
	
	
	// If the user selects a workshop, don't allow selection of a workshop at the same date and time -- you should disable the checkbox and visually indicate that the workshop in the competing time slot isn't available.
	if(framework.checked) {
		express.disabled = true;
		expressLbl.style.color = "grey";
	}
	if(express.checked) {
		framework.disabled=  true;
		frameworkLbl.style.color = "grey";
	} 
	if(libs.checked) {
		node.disabled = true;
		nodeLbl.style.color = "grey";
	}
	if(node.checked) {
		libs.disabled = true;
		libsLbl.style.color = "grey";
	} 

	// When a user unchecks an activity, make sure that competing activities (if there are any) are no longer disabled.
	if(!framework.checked) {
		express.disabled = false;
		expressLbl.style.color = "black";
	}
	if(!express.checked) {
		framework.disabled = false;
		frameworkLbl.style.color = "black";
	}
	if(!libs.checked) {
		node.disabled = false;
		nodeLbl.style.color = "black";
	}
	if(!node.checked) {
		libs.disabled = false;
		libsLbl.style.color = "black";
	} 

	// Calculate running total of price of events selected
	var mainPrice = 200;
	var otherPrice = 100;
	var totalPrice = 0;

	if(main.checked){
		totalPrice += mainPrice;
	}
	if(framework.checked || express.checked) {
		totalPrice += otherPrice;
	} 
	if(libs.checked || node.checked) {
		totalPrice += otherPrice;
	} 
	if(build.checked) {
		totalPrice += otherPrice;
	} 
	if(npm.checked) {
		totalPrice += otherPrice;
	}

	var totalNumber = totalPrice.toString();
	var totalText = "Total is $" + totalNumber;
	document.getElementById('total').innerHTML = totalText;

	if(totalPrice === 0){
		document.getElementById('total').innerHTML = "";
	}
	
});
	
	

// Payment Info section of the form. Display payment sections based on chosen payment option
document.getElementById("payment options").addEventListener("change", function(){
	var paymentOption = document.getElementById('payment');
	var paymentSelection = paymentOption.value;
	var container = document.getElementById('payment-container');
	var creditCard = document.getElementById('credit-card');
	var bitcoin = document.getElementById('bitcoin');
	var paypal = document.getElementById('paypal');
	
	// "Credit Card" payment option isselected by default so display of the #credit-card div... 
    // hide the "Paypal" and "Bitcoin information.
    if(paymentSelection === "credit card") {
        bitcoin.style.display = 'none';
        paypal.style.display = 'none';
        creditCard.style.display = 'block';

    }if(paymentSelection === "paypal") {
        console.log('paypal');
        // If user selects the "PayPal" payment option, display the Paypal information, and hide the credit card + Bitcoin
        bitcoin.style.display = 'none';
        paypal.style.display = 'block';
        creditCard.style.display = 'none';

    } if(paymentSelection === "bitcoin") {
        console.log('bitcoin');
        /// If user selects the "Bitcoin" payment option, display the Bitcoin information, and hide the credit card + paypal.
        bitcoin.style.display = 'block';
        paypal.style.display = 'none';
        creditCard.style.display = 'none';                
    }
});
	
	
	

// Form validation. Display error messages and don't let the user submit the form if any of these validation errors exist:
document.querySelector(".button").addEventListener("click", function(e) {
	
	// Name field can't be empty
    var nameInput = document.getElementById("name");
    var nameLabel = document.getElementById("nameLabel");
	if(nameInput.value.length === 0) {
		e.preventDefault();
        nameLabel.innerHTML = "Name: (please provide name)";
        nameLabel.style.color = "red";
    } else {
    	nameLabel.innerHTML = "Name:";
        nameLabel.style.color = "black";
    }

	// Email field must be a validly formatted e-mail address
	function validateEmail(email) {
  		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  		return re.test(email);
	}
 
	var emailInput = document.getElementById("mail");
    var emailLabel = document.getElementById("emailLabel");

	if(!validateEmail(emailInput.value)) {
		e.preventDefault();
		emailLabel.innerHTML = "Email: (please provide a valid email address)";
        emailLabel.style.color = "red";
    } else {
    	emailLabel.innerHTML = "Email:";
        emailLabel.style.color = "black";
    }


   	//check there's a valid credit card number
	var ccNum = document.getElementById('cc-num').value;
      var ccNumLbl = document.getElementById("cc-numLbl");


// takes the form field value and returns true on valid number
//algorithm found here: https://gist.github.com/DiegoSalazar/4075533
function valid_credit_card(value) {
  // accept only digits, dashes or spaces
	if (/[^0-9-\s]+/.test(value)) return false;

	// The Luhn Algorithm. It's so pretty.
	var nCheck = 0, nDigit = 0, bEven = false;
	value = value.replace(/\D/g, "");

	for (var n = value.length - 1; n >= 0; n--) {
		var cDigit = value.charAt(n),
			  nDigit = parseInt(cDigit, 10);

		if (bEven) {
			if ((nDigit *= 2) > 9) nDigit -= 9;
		}

		nCheck += nDigit;
		bEven = !bEven;
	}

	return (nCheck % 10) == 0;
}

//if(ccNum.length===0 && valid_credit_card(ccNum)) {

	if(ccNum.length===0 || !valid_credit_card(ccNum)) {
  
        ccNumLbl.style.color = "red";
        e.preventDefault();
    } else {
        ccNumLbl.style.color = "black";
    }

    //check there's a zip code
	var zip = document.getElementById("zip");
    var zipLbl = document.getElementById("zipLbl");
	if(zip.value.length === 0) {
        zipLbl.style.color = "red";
        e.preventDefault();

    } else {
        zipLbl.style.color = "black";
    }

    //check there's a cvv
	var cvv = document.getElementById("cvv");
    var cvvLbl = document.getElementById("cvvLbl");
	if(cvv.value.length === 0) {
        cvvLbl.style.color = "red";
        e.preventDefault();

    } else {
        cvvLbl.style.color = "black";
    }

    //Check that at least 1 activity has been selected
    var activities = document.getElementsByClassName("activity");
    var counter = 0;
    var activityReminder = document.getElementById("activityReminder");
    var lineBreak = document.getElementById("lineBreak");

    for(var i = 0; i < activities.length; i++){
    	if(activities[i].checked === true) {
    		counter++;
    	}
    }

    if(counter < 1){
    	e.preventDefault();
    	activityReminder.innerHTML = "Please select an Activity";
    	activityReminder.style.color = "red";
    	lineBreak.innerHTML = "<br>";
    } if(counter >= 1){
    	activityReminder.innerHTML = "";
    	lineBreak.innerHTML = "";
    }

    //Check that a tshirt has been selected
    var tShirtMenu = document.getElementById('design');
    var tSelection = tShirtMenu.value;
    var tshirtReminder = document.getElementById("tshirtReminder");

	if(tSelection === "selectTheme"){
    	tshirtReminder.innerHTML = "Don't forget to choose a tshirt";
    	tshirtReminder.style.color = "red";
    	e.preventDefault();
    } else if (tSelection === "js puns" || tSelection === "heart js") {
    	tshirtReminder.innerHTML = "";
    }
});