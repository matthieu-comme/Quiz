$(document).ready(() => {
  const img = document.createElement("img");
  var reponse = "";
  var caseActuelle;
  var cases_restantes = 50;
  const nbJoueurs = 3;
  var compteurTour = 0;
  var nomTour = "#joueur1";

  $(".question").hide();
  $(".difficulte").hide();
  $(".reponse").hide();
  $(".theme").hide();

  var bouton_reponse = $("#bouton_reponse");
  $(".btn_score").css("pointer-events", "none");
  $(".nom").css("pointer-events", "none");
  bouton_reponse.css("pointer-events", "none");
  class joueur {
    constructor(nom, score, theme) {
      this.nom = nom;
      this.score = score;
      this.theme = theme;
    }
  }

  $("#joueur4").hide();
  $("#joueur5").hide();

  var joueurs = [
    new joueur("Maxime", "0", "La F1 de 2018 à aujourd'hui"),
    new joueur("Adam", "0", "Ark: Survival Evolved"),
    new joueur("Lionel", "0", "La vie de Shaq"),
  ];

  var cases_jaunes = [];
  var cases_vertes = [];
  var cases_bleues = [];
  var cases_rouges = [];
  var cases_violettes = [];
  var cases_blanches = [];

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  var cases_random = [];
  while (cases_random.length !== 50) {
    var i_random = getRandomInt(50);
    if (cases_random.indexOf(i_random) === -1) {
      cases_random.push(i_random);
    }
  }

  var dataArray = [];

  $.get("quiz.txt", function (data) {
    const rows = data.split("\n"); // Divise le contenu du fichier en lignes

    rows.forEach((row) => {
      const columns = row.split(";"); // Divise chaque ligne en colonnes
      dataArray.push(columns.map((col) => col.trim())); // Nettoie les données et les ajoute au tableau
    });

    // Initialise les cases
    $(".case").each(function (index) {
      if (dataArray[index] && dataArray[index].length >= 4) {
        $(this).find(".theme").text(dataArray[cases_random[index]][0]);
        $(this).find(".difficulte").text(dataArray[cases_random[index]][1]);
        $(this).find(".question").text(dataArray[cases_random[index]][2]);
        $(this).find(".reponse").text(dataArray[cases_random[index]][3]);

        if (
          dataArray[cases_random[index]][0] === "La F1 de 2018 à aujourd'hui"
        ) {
          cases_rouges.push(index);
        }
        if (dataArray[cases_random[index]][0] === "La vie de Shaq") {
          cases_vertes.push(index);
        }
        if (dataArray[cases_random[index]][0] === "Ark: Survival Evolved") {
          cases_bleues.push(index);
        }
        if (dataArray[cases_random[index]][0] === "Question Vitesse !") {
          cases_jaunes.push(index);
        }
        if (dataArray[cases_random[index]][0] === "Blind Test") {
          cases_violettes.push(index);
        }
        if (dataArray[cases_random[index]][0] === "Culture G") {
          cases_blanches.push(index);
        }
      } else {
        alert(
          `Erreur : données manquantes ou mal formatées pour l'index ${index}`
        );
      }
    });
  });

  $("#tour").text("C'est au tour de " + joueurs[compteurTour % nbJoueurs].nom);
  // Initialise le tableau des scores
  $(".nom").each(function (index) {
    if (index < nbJoueurs) {
      $(this).text(joueurs[index].nom);
    }
  });
  $(".score").each(function (index) {
    if (index < nbJoueurs) {
      $(this).text(joueurs[index].score);
    }
  });

  function cacherCouleur() {
    $(".case").each(function (index) {
      var couleur = $(this).css("background-color");
      if (couleur !== "rgb(0, 0, 0)") {
        $(this).css("background-color", "#B0E0E6");
      }
    });
  }

  $("#affCol").click(function () {
    $(".case").each(function (index) {
      var couleur = $(this).css("background-color");
      if (couleur !== "rgb(0, 0, 0)") {
        testCouleur(this, index);
      }
    });
    setTimeout(cacherCouleur, 2000);
    //$("#affCol").hide();
  });

  $(".case").click(function () {
    $(".case").css("pointer-events", "none");
    var theme = $(this).find(".theme").text();
    var question = $(this).find(".question").text();
    var difficulte = $(this).find(".difficulte").text();
    reponse = $(this).find(".reponse").text();
    $("#choix_theme").text(theme);
    $("#choix_question").text(question);
    $("#choix_difficulte").text(difficulte);
    bouton_reponse.css("pointer-events", "auto");
    caseActuelle = $(this);
    // garder les thèmes secrets jusqu'à la premiere question du thème
    for (var i = 0; i < nbJoueurs; i++) {
      var joueur_temp = "#joueur" + (i + 1);
      if (caseActuelle.find(".theme").text() === joueurs[i].theme) {
        $(joueur_temp).find(".theme_joueur").text(joueurs[i].theme);
      }
    }

    var i_actuel = $(".case").index(caseActuelle);
    testCouleur(this, i_actuel);
  });
  bouton_reponse.on("click", () => {
    $("#choix_reponse").text(reponse);
    bouton_reponse.css("pointer-events", "none");
    $(".btn_score").css("pointer-events", "auto");
    $(".nom").css("pointer-events", "auto");
  });

  $(".btn_score").click(function () {
    cases_restantes--;
    var theme_case = caseActuelle.find(".theme").text();
    if ($(this).prop("id") === "vrai") {
      var theme_joueur = joueurs[compteurTour % nbJoueurs].theme;
      var pts_gagnes;
      if (theme_case === "Culture G") {
        pts_gagnes = 1;
      } else if (theme_case === theme_joueur) {
        pts_gagnes = 2;
      } else {
        pts_gagnes = 3;
      }
      for (var i = 0; i < pts_gagnes; i++)
        joueurs[compteurTour % nbJoueurs].score++;
      $(nomTour)
        .find(".score")
        .text(joueurs[compteurTour % nbJoueurs].score);
    }
    caseActuelle.find(".numero").text("X");
    caseActuelle.css("background-color", "black");
    caseActuelle.css("pointer-events", "none");
    $("#choix_theme").text("...");
    $("#choix_question").text("...");
    $("#choix_difficulte").text("...");
    $("#choix_reponse").text("...");
    $(".btn_score").css("pointer-events", "none");
    reactiverCases();
    if (theme_case === "Question Vitesse !") {
      $("#tour").text(
        "C'est encore à " +
          joueurs[compteurTour % nbJoueurs].nom +
          " de jouer !"
      );
    } else {
      compteurTour++;
      $("#tour").text(
        "C'est au tour de " + joueurs[compteurTour % nbJoueurs].nom
      );
    }

    var temp = (compteurTour % nbJoueurs) + 1;
    console.log(temp);
    nomTour = "#joueur" + temp;
    console.log(nomTour);
    if (cases_restantes === 0) {
      $("#grille").hide();
      $("#choix").hide();
      var score1 = joueurs[0].score;
      var score2 = joueurs[1].score;
      var score3 = joueurs[2].score;
      if (score3 > score2 && score3 > score1) img.src = "lionel.jpg";
      else if (score2 > score3 && score2 > score1) img.src = "adam.jpg";
      else img.src = "maxime.jpg";
      img.width = 300;
      document.getElementById("imageContainer").appendChild(img);
    }
  });

  $(".nom").click(function () {
    // ajouter 1 point quand je clique sur le nom du joueur
    var n = 0;
    var bool = "false";
    console.log($(this).text());
    while (n < nbJoueurs && bool === "false") {
      if (joueurs[n].nom === $(this).text()) bool = "true";
      n++;
    }
    n--;
    joueurs[n].score++;
    $(this).siblings(".score").text(joueurs[n].score);
  });

  function reactiverCases() {
    $(".case").each(function () {
      if ($(this).find(".numero").text() !== "X")
        $(this).css("pointer-events", "auto");
    });
  }

  function testCouleur(case_test, index) {
    if (cases_jaunes.indexOf(index) !== -1)
      $(case_test).css("background-color", "yellow");
    if (cases_vertes.indexOf(index) !== -1)
      $(case_test).css("background-color", "green");
    if (cases_bleues.indexOf(index) !== -1)
      $(case_test).css("background-color", "blue");
    if (cases_blanches.indexOf(index) !== -1)
      $(case_test).css("background-color", "white");
    if (cases_rouges.indexOf(index) !== -1)
      $(case_test).css("background-color", "red");
    if (cases_violettes.indexOf(index) !== -1)
      $(case_test).css("background-color", "purple");
  }
});
