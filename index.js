var config = {

	apiKey: "AIzaSyBm3Hs6wm71g51eQuvmJgxIxW_prxWhQi8",
	authDomain: "vex-936.firebaseapp.com",
	databaseURL: "https://vex-936.firebaseio.com",
	projectId: "vex-936",
	storageBucket: "vex-936.appspot.com",
	messagingSenderId: "519294114406"

};
firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(function(account) {

	if (account) {

		window.open("teams.html", "_self");

	}

});

document.getElementsByTagName("form")[0].onsubmit = function(event) {

	event.preventDefault();
	if ($("input[name='team']:checked").val() == null) {

		$(".custom-control-input, custom-control-label").addClass("is-invalid");
		if ($("#password").val().length < 6) {

			$("#password").addClass("is-invalid");

		}

	} else if ($("#password").val().length < 6) {

		$("#password").addClass("is-invalid");

	} else {

		$("button").attr("disabled", "true");
		firebase.auth().signInWithEmailAndPassword($("input[name='team']:checked").val() + "@hkis.edu.hk", $("#password").val()).then(function() {

			firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
			window.open("teams.html", "_self");

		}).catch(function(error) {

			$("button").removeAttr("disabled");
			if (error.code == "auth/wrong-password") {

				$("#password").addClass("is-invalid");

			} else {

				alert("An error occurred: " + error.message);

			}

		});

	}

}

$("input[type=radio]").click(function() {

	$(".custom-control-input, custom-control-label").removeClass("is-invalid");

});

$("#password").on("input", function() {

	if ($("#password").val().length >= 6) {

		$("#password").removeClass("is-invalid");

	}

});