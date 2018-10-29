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
var selected = ["", "", "", ""];
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

				$("select:not(#autonomous)").append("<option class = 'team_" + doc.id + "' value = '" + doc.id + "'>" + doc.id + "</option");
				$("select:not(#autonomous)").on("change", function() {

					$("option.team_" + selected[$(this).attr("id")[$(this).attr("id").length - 1]] + ":disabled").removeAttr("disabled");
					selected[$(this).attr("id")[$(this).attr("id").length - 1]] = $(this).val();
					$(".team_" + $(this).val() + ":not(:checked)").attr("disabled", "true");

				});

			});

		});
		db.collection("matches").get().then(function(qS) {

			$("#match").val(qS.size + 1);

		});
		display(false);

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

document.getElementsByTagName("form")[0].onsubmit = function(event) {

	event.preventDefault();
	var lowest = 0;
	if ($("#match").val() != "" && Number($("#match").val()) > 0 && Number($("#match").val()) % 1 == 0 && $("#score_red").val() != "" && $("#score_blue").val() != "" && Number($("#score_red").val()) >= 0 && Number($("#score_red").val()) % 1 == 0 && Number($("#score_blue").val()) >= 0 && Number($("#score_blue").val()) % 1 == 0 && $("#select_0").val() && $("#select_1").val() && $("#select_2").val() && $("#select_3").val() && $("#autonomous").val()) {
		
		$(".card button").attr("disabled", "true");
		if (Number($("#score_red").val()) > Number($("#score_blue").val())) {

			lowest = Number($("#score_blue").val());
			if (!($("#dq_red1").prop("checked"))) {

				db.collection("teams").doc($("#select_0").val()).get().then(function(doc) {

					db.collection("teams").doc($("#select_0").val()).update({ wp: doc.data().wp + 2 });

				});

			}
			if (!($("#dq_red2").prop("checked"))) {

				db.collection("teams").doc($("#select_1").val()).get().then(function(doc) {

					db.collection("teams").doc($("#select_1").val()).update({ wp: doc.data().wp + 2 });

				});

			}

		} else if (Number($("#score_red").val()) < Number($("#score_blue").val())) {

			lowest = Number($("#score_red").val());
			if (!($("#dq_blue1").prop("checked"))) {

				db.collection("teams").doc($("#select_2").val()).get().then(function(doc) {

					db.collection("teams").doc($("#select_2").val()).update({ wp: doc.data().wp + 2 });

				});

			}
			if (!($("#dq_blue2").prop("checked"))) {

				db.collection("teams").doc($("#select_3").val()).get().then(function(doc) {

					db.collection("teams").doc($("#select_3").val()).update({ wp: doc.data().wp + 2 });

				});

			}

		} else {

			lowest = Number($("#score_red").val());
			if (!($("#dq_red1").prop("checked"))) {

				db.collection("teams").doc($("#select_0").val()).get().then(function(doc) {

					db.collection("teams").doc($("#select_0").val()).update({ wp: doc.data().wp + 1 });

				});

			}
			if (!($("#dq_red2").prop("checked"))) {

				db.collection("teams").doc($("#select_1").val()).get().then(function(doc) {

					db.collection("teams").doc($("#select_1").val()).update({ wp: doc.data().wp + 1 });

				});

			}
			if (!($("#dq_blue1").prop("checked"))) {

				db.collection("teams").doc($("#select_2").val()).get().then(function(doc) {

					db.collection("teams").doc($("#select_2").val()).update({ wp: doc.data().wp + 1 });

				});

			}
			if (!($("#dq_blue2").prop("checked"))) {

				db.collection("teams").doc($("#select_3").val()).get().then(function(doc) {

					db.collection("teams").doc($("#select_3").val()).update({ wp: doc.data().wp + 1 });

				});

			}

		}
		if ($("#autonomous").val() == "red") {

			if (!($("#dq_red1").prop("checked"))) {

				db.collection("teams").doc($("#select_0").val()).get().then(function(doc) {

					db.collection("teams").doc($("#select_0").val()).update({ ap: doc.data().ap + 4 });

				});

			}
			if (!($("#dq_red2").prop("checked"))) {

				db.collection("teams").doc($("#select_1").val()).get().then(function(doc) {

					db.collection("teams").doc($("#select_1").val()).update({ ap: doc.data().ap + 4 });

				});

			}

		} else if ($("#autonomous").val() == "blue") {

			if (!($("#dq_blue1").prop("checked"))) {

				db.collection("teams").doc($("#select_2").val()).get().then(function(doc) {

					db.collection("teams").doc($("#select_2").val()).update({ ap: doc.data().ap + 4 });

				});

			}
			if (!($("#dq_blue2").prop("checked"))) {

				db.collection("teams").doc($("#select_3").val()).get().then(function(doc) {

					db.collection("teams").doc($("#select_3").val()).update({ ap: doc.data().ap + 4 });

				});

			}

		}
		db.collection("teams").doc($("#select_0").val()).get().then(function(doc) {

			db.collection("teams").doc($("#select_0").val()).update({ sp: doc.data().sp + ($("#dq_red1").prop("checked") ? 0 : lowest) });

		}).then(function() {

			db.collection("teams").doc($("#select_1").val()).get().then(function(doc) {

				db.collection("teams").doc($("#select_1").val()).update({ sp: doc.data().sp + ($("#dq_red2").prop("checked") ? 0 : lowest) });

			}).then(function() {

				db.collection("teams").doc($("#select_2").val()).get().then(function(doc) {

					db.collection("teams").doc($("#select_2").val()).update({ sp: doc.data().sp + ($("#dq_blue1").prop("checked") ? 0 : lowest) });

				}).then(function() {

					db.collection("teams").doc($("#select_3").val()).get().then(function(doc) {

						db.collection("teams").doc($("#select_3").val()).update({ sp: doc.data().sp + ($("#dq_blue2").prop("checked") ? 0 : lowest) });

					}).then(function() {

						db.collection("matches").doc("q" + $("#match").val()).set({ number: $("#match").val(), red: [$("#select_0").val(), $("#select_1").val()], blue: [$("#select_2").val(), $("#select_3").val()], red_score: $("#score_red").val(), blue_score: $("#score_blue").val(), autonomous: $("#autonomous").val(), dq: [$("#dq_red1").prop("checked"), $("#dq_red2").prop("checked"), $("#dq_blue1").prop("checked"), $("#dq_blue2").prop("checked")] }).then(function() {

							window.location.reload();

						});

					})

				});

			});

		});

	} else {

		$(".card button").addClass("btn-danger");
		setTimeout(function() { $(".card button").removeClass("btn-danger") }, 400)

	}

}

function display(team) {

	db.collection("matches").get().then(function(qS) {

		qS.forEach(function(doc) {

			var match = doc.data();
			$(".table tbody").append("<tr><th scope = 'col'>" + doc.id.toUpperCase() + "</th><td>" + match.red[0] + "</td><td>" + match.red[1] + "</td><td>" + match.red_score + "</td><td>" + match.blue[0] + "</td><td>" + match.blue[1] + "</td><td>" + match.blue_score + "</td><td>" + match.autonomous.charAt(0).toUpperCase() + match.autonomous.slice(1) + "</td></tr>");

		});

	});

}