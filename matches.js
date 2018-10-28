var config = {

	apiKey: "AIzaSyBm3Hs6wm71g51eQuvmJgxIxW_prxWhQi8",
	authDomain: "vex-936.firebaseapp.com",
	databaseURL: "https://vex-936.firebaseio.com",
	projectId: "vex-936",
	storageBucket: "vex-936.appspot.com",
	messagingSenderId: "519294114406"

};
firebase.initializeApp(config);
var db = firebase.firestore();

var current = "";
firebase.auth().onAuthStateChanged(function(account) {

	if (account) {

		$(".navbar-brand").html("936" + account.email.substring(0, 1).toUpperCase());
		current = "936" + account.email.substring(0, 1);
		if (account.email == "a@hkis.edu.hk") {

			$("#navbar").attr("style", "background-color: #99aaff !important");

		} else if (account.email == "b@hkis.edu.hk") {

			$("#navbar").attr("style", "background-color: #ff9999 !important");

		} else if (account.email == "c@hkis.edu.hk") {

			$("#navbar").attr("style", "background-color: #bababa !important");

		}
		db.collection("teams").get().then(function(qS) {

			qS.forEach(function(doc) {

				$("select:not(#autonomous)").append("<option value = '" + doc.id + "'>" + doc.id + "</option");

			});

		});

	} else {

		window.open("index.html", "_self");

	}

});
$("#signout").click(function() {

	$("nav button").attr("disabled", "true");
	firebase.auth().signOut().then(function() {

		window.open("index.html", "_self");

	}).catch(function(error) {

		alert("An error occurred: " + error.message);

	});

});

$("#show").click(function() {

	$("#show").hide();
	$("#input").show();

});