<?php function echoTable2D($arr, $reqprep) // $arr = resultat de la requete en tableau
{
    echo '<table border="1">';
    $nb_col = $reqprep->columnCount();
    echo '<tr>';
    for ($i = 0; $i < $nb_col; $i++) {
        $meta = $reqprep->getColumnMeta($i);

        echo '<th>' . $meta['name'] . '</th>';
    }
    echo '</tr>';
    foreach ($arr as $ligne) {
        echo '<tr>';
        foreach ($ligne as $case) {
            echo '<td>' . $case . '</td>';
        }
        echo '</tr>';
    }
    echo '</table>';
}

function createFormSQL($idcom, $table)
{
    $requete = $idcom->query("DESCRIBE $table");
    $requete->execute();
    $colonnes = $requete->fetchAll(PDO::FETCH_COLUMN);
    echo '<form method="POST" action ="">';
    foreach ($colonnes as $attr) {
        echo '<label for="' . $attr . '">' . $attr . ' : </label><input type="text" name="' . $attr . '"><br>';
    }
    echo '<input type="submit" name="submit" value="Inserer"><br>';
    echo '</form>';
}
function setupJoueur($nb_j, $tab_theme)
{
    echo '<form method="POST" action="main.php">';
    echo "<div id='setup_container'>";
    for ($i = 1; $i <= $nb_j; $i++) {
        echo '<div class="setup" id="joueur' . $i . '">';
        echo "<label for='nom$i'>Nom du joueur $i : </label><input type='text' name='nom$i' required>";
        echo "<label for'theme$i'>Thème du joueur $i : </label><select name='theme$i required'>";
        foreach ($tab_theme as $theme) echo "<option>$theme[0]</option>";
        echo "</select><br></div>";
    }
    echo "</div>";

    echo '<input type="submit" name="submit" value="Valider"><br></form>';
}
