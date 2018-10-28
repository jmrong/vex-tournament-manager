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

firebase.auth().onAuthStateChanged(function(account) {

	if (account) {

		display();

	} else {

		window.open("index.html", "_self");

	}

});
$("nav button").click(function() {

	$("nav button").attr("disabled", "true");
	firebase.auth().signOut().then(function() {

		window.open("index.html", "_self");

	}).catch(function(error) {

		alert("An error occurred: " + error.message);

	});

});

function display() {

	db.collection("936a").get().then(function(qS) {

		qS.forEach(function(doc) {

			var team = doc.data();
			$("tbody").append("<tr><th scope = 'row'>" + team.number + "<br><small>" + team.name + "</small></th><td>" + team.org + "</td><td>" + team.location + "</td></tr>");

		});

	});

}