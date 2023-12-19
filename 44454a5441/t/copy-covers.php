<?php

$start = 60;
$end = 104;

$path_a = "C:/drive-d/tmp/cover-boxes/proc/";
$path_b = "C:/drive-d/wk/git/oxou/private/magnetic/44454a5441/t/";

for ($i = $start; $i < $end; $i++) {
    $db_path = str_split((string) $i, 1);
    $db_path = implode('/', $db_path) . '/' . 'c';
    $stat = @copy($path_a . $i, $db_path);

    if ($stat === false) {
        echo "Copy failed for $i\n";
    } else {
        echo "Copy passed for $i\n";
    }
}