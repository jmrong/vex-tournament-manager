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
		display();

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

function toggleStar(team) {

	if ($("#team_" + team).hasClass("table-warning")) {

		$("#team_" + team).removeClass("table-warning");
		db.collection(current).doc(team).update({ star: false }).catch(function(error) {

			alert("An error occurred: " + error.message);

		});

	} else {

		$("#team_" + team).addClass("table-warning");
		db.collection(current).doc(team).update({ star: true }).catch(function(error) {

			alert("An error occurred: " + error.message);

		});

	}

}

function display() {

	$("tbody").empty();
	if (filter == "rank" && desc) {

		db.collection("teams").orderBy(filter, (desc ? "desc" : "asc")).get().then(function(qS) {

			qS.forEach(function(doc) {

				var team = doc.data();
				if (team.rank != Infinity) {

					$("tbody").append("<tr id = 'team_" + team.number + "'><th scope = 'row'>" + team.number + "<br><small>" + team.name + "</small></th><td>" + team.org + "</td><td>" + team.location + "</td><td>" + (team.rank != Infinity ? team.rank : "") + "</td><td>" + team.wp + "</td><td>" + team.ap + "</td><td>" + team.sp + "</td></tr>");

				}

			});

		});
		db.collection("teams").orderBy(filter, "asc").get().then(function(qS) {

			qS.forEach(function(doc) {

				var team = doc.data();
				if (team.rank == Infinity) {

					$("tbody").append("<tr id = 'team_" + team.number + "'><th scope = 'row'>" + team.number + "<br><small>" + team.name + "</small></th><td>" + team.org + "</td><td>" + team.location + "</td><td>" + (team.rank != Infinity ? team.rank : "") + "</td><td>" + team.wp + "</td><td>" + team.ap + "</td><td>" + team.sp + "</td></tr>");

				}

			});

		});

	} else {

		db.collection("teams").orderBy(filter, (desc ? "desc" : "asc")).get().then(function(qS) {

			qS.forEach(function(doc) {

				var team = doc.data();
				$("tbody").append("<tr id = 'team_" + team.number + "'><th scope = 'row'>" + team.number + "<br><small>" + team.name + "</small></th><td>" + team.org + "</td><td>" + team.location + "</td><td>" + (team.rank != Infinity ? team.rank : "") + "</td><td>" + team.wp + "</td><td>" + team.ap + "</td><td>" + team.sp + "</td></tr>");

			});

		});

	}
	db.collection(current).get().then(function(qS) {

		qS.forEach(function(doc) {

			if (doc.data().star) {

				$("#team_" + doc.id).addClass("table-warning");
				$("#team_" + doc.id).click(function() {

					toggleStar(doc.id);

				});

			} else {

				$("#team_" + doc.id).click(function() {

					toggleStar(doc.id);

				});

			}

		});

	});

}

var filter = "rank";
var desc = false;
function sort(query) {

	if (filter == query) {

		desc = !desc;

	} else {

		filter = query;
		if (query == "wp" || query == "ap" || query == "sp") {

			desc = true;

		} else {

			desc = false;

		}

	}
	$(".underline").removeClass("underline");
	$("#heading_" + query).addClass("underline");
	display();

}

function resetAllData() {

	if (confirm("This will reset all matches and points earned. Are you sure?")) {

		db.collection("teams").get().then(function(qS) {

			qS.forEach(function(doc) {

				db.collection("teams").doc(doc.id).update({ rank: Infinity, wp: 0, ap: 0, sp: 0 });

			});
			db.collection("matches").get().then(function(qS) {

				qS.forEach(function(doc) {

					db.collection("matches").doc(doc.id).delete();

				});

			});

		});

	}

}