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
var selected = "";
var ranks = [];
var pinned = [];
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
		list();

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

function list() {

	$(".list-group").empty();
	$("#toolbar button, #toolbar input").attr("disabled", true);
	$("#toolbar label").addClass("disabled");
	db.collection("teams").orderBy("rank").get().then(function(qS) {

		qS.forEach(function(doc) {

			var team = doc.data();
			ranks[ranks.length] = team.number;
			$(".list-group").append("<a id = 'team_" + team.number + "' class = 'list-group-item list-group-item-action' role = 'tab'><div class = 'd-flex w-100 justify-content-between'><h5 class = 'mb-1'>" + team.number + "</h5></div><p>" + team.name + "<br>" + team.org + "<br>Rank <strong>" + (team.rank == Infinity ? "N/A" : team.rank) + "</strong></p></a>");
			$("#team_" + team.number).click(function() {

				loadData(team.number);

			});

		});

	});
	db.collection(current).where("pinned", "==", true).get().then(function(qS) {

		var first = true;
		qS.forEach(function(doc) {

			pinned[pinned.length] = doc.id;

		});
		for (var i = 0; i < ranks.length; i++) {

			if (pinned.indexOf(ranks[i]) != -1) {

				if (first) {

					$("#team_" + ranks[i]).prependTo(".list-group");
					$(".list-group > a:first-child").addClass("pinned");
					first = false;

				} else {

					$("#team_" + ranks[i]).insertAfter($(".pinned").last());
					$("#team_" + ranks[i]).addClass("pinned");

				}
				$("#team_" + ranks[i] + " .d-flex").append("<small>Pinned</small>");

			}

		}

	});
	db.collection(current).where("star", "==", true).get().then(function(qS) {

		qS.forEach(function(doc) {

			$("#team_" + doc.id).addClass("list-group-item-warning");

		});
		if (selected != "") {

			$("#team_" + selected).addClass("active");
			$("#toolbar button, #toolbar input").removeAttr("disabled");
			$("#toolbar label").removeClass("disabled");

		}

	});

}

function loadData(team) {

	$("#toolbar .h4").html("Loading...");
	$(".list-group-item.active").removeClass("active");
	$("#team_" + team).addClass("active");
	db.collection(current).doc(team).get().then(function(doc) {

		$("#toolbar .h4").html(team);
		selected = team;
		editor.setData(doc.data().notes);
		$("#toolbar button, #toolbar input").removeAttr("disabled");
		$("#toolbar label.disabled").removeClass("disabled");
		$("#toolbar > span:nth-child(2) button").click(function() {

			saveData();

		})
		editor.isReadOnly = false;
		if (doc.data().star) {

			$("#toolbar > span:nth-child(3) label:last-child input").prop("checked", true);
			$("#toolbar > span:nth-child(3) label:last-child").addClass("active");
			$("#toolbar > span:nth-child(3) label:last-child span").html("Starred");

		} else {

			$("#toolbar > span:nth-child(3) label:last-child input").prop("checked", false);
			$("#toolbar > span:nth-child(3) label:last-child").removeClass("active");
			$("#toolbar > span:nth-child(3) label:last-child span").html("Star");

		}
		$("#toolbar > span:nth-child(3) label:last-child input").change(function() {

			if ($("#toolbar > span:nth-child(3) label:last-child input").prop("checked")) {

				$("#toolbar > span:nth-child(3) label:last-child span").html("Starred");
				db.collection(current).doc(selected).update({ star: true }).then(function() {

					$("#team_" + selected).addClass("list-group-item-warning");

				});

			} else {

				$("#toolbar > span:nth-child(3) label:last-child span").html("Star");
				db.collection(current).doc(selected).update({ star: false }).then(function() {

					$("#team_" + selected).removeClass("list-group-item-warning");

				});

			}

		});
		if (doc.data().pinned) {

			$("#toolbar > span:nth-child(3) label:first-child input").prop("checked", true);
			$("#toolbar > span:nth-child(3) label:first-child").addClass("active");
			$("#toolbar > span:nth-child(3) label:first-child span").html("Pinned");

		} else {

			$("#toolbar > span:nth-child(3) label:first-child input").prop("checked", false);
			$("#toolbar > span:nth-child(3) label:first-child").removeClass("active");
			$("#toolbar > span:nth-child(3) label:first-child span").html("Pin");

		}
		$("#toolbar > span:nth-child(3) label:first-child input").change(function() {

			if ($("#toolbar > span:nth-child(3) label:first-child input").prop("checked")) {

				$("#toolbar > span:nth-child(3) label:first-child span").html("Pinned");
				db.collection(current).doc(selected).update({ pinned: true }).then(function() {

					$("#team_" + selected + " .d-flex").append("<small>Pinned</small>");
					pinned[pinned.length] = selected;

				});

			} else {

				$("#toolbar > span:nth-child(3) label:first-child span").html("Pin");
				db.collection(current).doc(selected).update({ pinned: false }).then(function() {

					$("#team_" + selected + " .d-flex small").remove();
					pinned.splice(pinned.indexOf(selected), 1);

				});

			}

		});

	});

}

function saveData() {

	$("#toolbar > span:nth-child(2) button").attr("disabled", true);
	db.collection(current).doc(selected).update({ notes: editor.getData() }).then(function() {

		$("#toolbar > span:nth-child(2) button").html("Saved!");
		setTimeout(function() { $("#toolbar > span:nth-child(2) button").html("Save"); $("#toolbar > span:nth-child(2) button").removeAttr("disabled"); }, 1000);

	});

}

var editor;
ClassicEditor.create(document.getElementsByTagName("textarea")[0], { toolbar: ["undo", "redo", "|", "bold", "italic", "|", "bulletedList", "numberedList"] }).then(function(newEditor) {

	editor = newEditor;
	editor.isReadOnly = true;
	$(".ck-editor__editable").css("height", "calc(" + $(".tab-content").height() + "px - " + $(".ck-toolbar").height() + "px - " + $("#toolbar").outerHeight(true) + "px + 3.375rem)");

});

$("#toolbar button, #toolbar input").attr("disabled", true);
$("#toolbar label").addClass("disabled");

$(window).resize(function() {

	$(".ck-editor__editable").css("height", "calc(" + $(".tab-content").height() + "px - " + $(".ck-toolbar").height() + "px - " + $("#toolbar").outerHeight(true) + "px + 3.375rem)");

})