<?php


//define("BASE_PATH","../../../../php/webinar/");
define("BASE_PATH","../php/");

include_once(BASE_PATH."comm.php");
include_once(BASE_PATH."t_dblink.php");
include_once(BASE_PATH."t_message.php");

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$db = new TDBLink(HOST,DATABASE,USER,PASSWORD);
$db->connect();

if(isset($_REQUEST['msgcount'])
&& htmlspecialchars($_REQUEST['msgcount'])>=MSG_LIMIT){
    http_response_code(401);
}
else{
    if(isset($_POST["fname"])
    && isset($_POST["flast"])
    && isset($_POST["fphone"])
    && isset($_POST["fmail"])
    && isset($_POST["fmsg"])){
        $msg = new TMessage($db->getLink());
        if($msg->insert(
            htmlspecialchars($_POST["fname"]),
            htmlspecialchars($_POST["flast"]),
            htmlspecialchars($_POST["fphone"]),
            htmlspecialchars($_POST["fmail"]),
            htmlspecialchars($_POST["fmsg"])
        )){
            if(isset($_REQUEST['msgcount'])&&$_REQUEST['msgcount']!=""){                                
                echo json_encode(["msgcount"=>($_REQUEST['msgcount']+1)]);
            }
            else{
                echo json_encode(["msgcount"=>0]);
            }
            http_response_code(200);
            
        }
        else{
            http_response_code(401);
        }
    }
}

$db->disconnect();



?>