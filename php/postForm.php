<?php
session_start();
//Permet de lire les données brutes du body req
$request_body = file_get_contents('php://input');
$data = json_decode($request_body, true);

$name = $data['name'];
$email = $data['email'];
$object = $data['object'];
$message = $data['message'];

session_destroy();

