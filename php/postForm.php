<?php
session_start();
// set for mail free
ini_set("SMTP", "smtp.free.fr");
ini_set("smtp_port","25");
ini_set("sendmail_from","anthony.lfb@hotmail.fr");
//Permet de lire les données brutes du body req
$request_body = file_get_contents('php://input');
$data = json_decode($request_body, true);

$name = $data['name'];
$email = $data['email'];
$object = $data['object'];
$message = wordwrap($data['message'], 70, "\r\n") . "\r\n" . "\r\n" . "Name : " . $name ;
$headers = ['From' => $email];

mail(
    'anthony.lfb@hotmail.fr',
    $object,
    $message,
    $headers
);

if(mail('anthony.lfb@hotmail.fr',
$object,
$message,
$headers)) {
    echo "mail envoyé avec succès";
} else {
    echo "erreur, le mail ne s'est pas envoyé";
};
session_destroy();

