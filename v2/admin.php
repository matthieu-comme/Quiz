<?php
/*
if ($_POST['submit'] === 'RESET') {
    session_unset();
    session_destroy();
}
    */
session_start();
if (isset($_POST['nb_joueurs'])) {
    $_SESSION['nb_joueurs'] = $_POST['nb_joueurs'];
    require_once('connexpdo.inc.php');
    require_once('functions.php');
    $idcom = connexpdo('quiz', "myparam");
    $requete = 'SELECT DISTINCT(theme) FROM question';
    $reqprep = $idcom->prepare($requete);
    $reqprep->execute();
    $result = $reqprep->fetchAll(PDO::FETCH_NUM);
}
?>
<html>

<head>
    <title>Admin - Grand Quiz</title>
    <link rel="stylesheet" href="admin.css">
</head>

<body>
    <main>
        <h1>Réglages de la game</h1>
        <?php if (!isset($_POST['nb_joueurs'])) { ?>
            <form method="POST" action="">
                <label for="nb_joueurs">Nombre de joueurs : </label><input type="number" name="nb_joueurs" value="1">
                <input type="submit" name="submit" value="Valider">
            </form>
        <?php } else {
            echoTable2D($result, $reqprep);
            setupJoueur($_POST['nb_joueurs'], $result);
        } ?>
    </main>
</body>

</html>