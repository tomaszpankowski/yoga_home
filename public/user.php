<?php


//define("BASE_PATH","../../../../php/webinar/");
define("BASE_PATH","../php/");

include_once(BASE_PATH."comm.php");
include_once(BASE_PATH."t_dblink.php");
include_once(BASE_PATH."t_message.php");
include_once(BASE_PATH."t_token.php");
include_once(BASE_PATH."t_user_ext.php");

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

$db = new TDBLink(HOST,DATABASE,USER,PASSWORD);
$db->connect();

//to delete after pub
/*
$usr = new TUserExt($db->getLink());
$usr->setData("username","administrator");
$usr->setData("password","password");
$usr->setData("email","admin@admin.adm");
$usr->setData("privileges",30);
$usr->saveUser();
*/

if(isset($_REQUEST['tkid'])){
    //token exists
    $tk = new TToken($db->getLink());
    $tk->getByToken(htmlspecialchars($_REQUEST["tkid"]));
    if($tk->getData("token")===htmlspecialchars($_REQUEST["tkid"])){
        //process request
        $msg = new TMessage($db->getLink());
        if($_SERVER["REQUEST_METHOD"]==="POST"
        && isset($_REQUEST["messages"])){
            echo json_encode($msg->getList());
        }
        else if($_SERVER["REQUEST_METHOD"]==="POST"
        && isset($_REQUEST["msgid"])){
            $msg->deleteMessage(htmlspecialchars($_REQUEST["msgid"]));
        }
        else if($_SERVER["REQUEST_METHOD"]==="POST"
        && isset($_REQUEST["logout"])){             
            $tk->deleteToken($tk->getData("id"));
            http_response_code(200);
            return;
        }    
        $tk->setData("lastaction",Date("Y-m-d H:i:s",Time()));
        $tk->saveToken();
        http_response_code(200);
    }
    else{
        http_response_code(401);
    }
}
else{
    //new token
    if(isset($_POST['userName'])
    && isset($_POST['userPass'])){
        $usr = new TUserExt($db->getLink());
        $usr->getByName(htmlspecialchars($_POST['userName']));
        if($usr->getData("password")===sha1($_POST['userPass'])){
            $tk = new TToken($db->getLink());
            if($tk->userExists($usr->getData("id"))){
                //if user already logged
                $tk->getByUserId($usr->getData("id"));                
                $tk->deleteToken($tk->getData("id"));
            }
            $tk->setData("userid",$usr->getData("id"));
            $tk->saveToken();
            $tk->getByUserId($usr->getData("id"));
            echo json_encode(["tkid"=>$tk->getData("token")]);
            http_response_code(200);
        }
        else{
            http_response_code(401);
        }
    }
    else{
        http_response_code(401);
    }
}
$db->disconnect();



?>