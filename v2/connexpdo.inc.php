<?php
function connexpdo($base, $param)
{
    include($param . ".inc.php");
    $dsn = "mysql:host=" . MYHOST . ";dbname=" . $base . ";port=3307";
    $idcom = new PDO($dsn, MYUSER, MYPASS);
    if (!$idcom) {
        echo "<script type=text/javascript>";
        echo "alert('Connexion Impossible à la base  $base')</script>";
    }
    return $idcom;
}
