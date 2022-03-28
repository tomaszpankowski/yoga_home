<?php

class TToken{
    private $id;
    private $data;
    private $link;

    public function __construct($dbLinkA=null){
        $this->clearData();
        $this->link = $dbLinkA;
    }

    public function clearData(){
        $this->id = null;
        $this->data = array(
            "userid"=>"",
            "logged"=>"",
            "lastaction"=>"",
            "token"=>"",
            "messages"=>0
        );
    }

    private function tokenExists($tokenA){
        $sql = "select id from ".DB_PREFIX."tokens where token=:tk";
        $stmt = $this->link->prepare($sql);
        $stmt->bindParam(":tk",$tokenA);
        $stmt->execute();
        return is_array($stmt->fetch(PDO::FETCH_ASSOC))?true:false;
    }

    public function userExists($userA){
        $sql = "select id from ".DB_PREFIX."tokens where userid=:uid";
        $stmt = $this->link->prepare($sql);
        $stmt->bindParam(":uid",$userA);
        $stmt->execute();
        return is_array($stmt->fetch(PDO::FETCH_ASSOC))?true:false;
    }

    public function deleteToken($idA){
        if(isset($idA)
        && $this->getById($idA)){
            $stmt = $this->link->prepare("delete from ".DB_PREFIX."tokens where id=:uid");
            $stmt->bindParam(":uid",$idA);
            return $stmt->execute();
        }
    }

    public function getById($idA){
        if(isset($idA)
        && isset($this->link)){
            $sql = "select * from ".DB_PREFIX."tokens where id=:uid";
            $stmt = $this->link->prepare($sql);
            $stmt->bindParam(":uid",$idA);
            $stmt->execute();
            $res = $stmt->fetch(PDO::FETCH_ASSOC);
            if(is_array($res)){
                $this->id = $idA;
                if(isset($res['userid'])){
                    $this->data["userid"] = $res['userid'];
                }
                if(isset($res['logged'])){
                    $this->data["logged"] = $res['logged'];
                }
                if(isset($res['lastaction'])){
                    $this->data["lastaction"] = $res['lastaction'];
                }
                if(isset($res['token'])){
                    $this->data["token"] = $res['token'];
                }
                if(isset($res['messages'])){
                    $this->data["messages"] = $res['messages'];
                }
                return true;
            }
            return false;
        }
    }

    public function getByToken($tokenA){
        if(isset($tokenA)
        && isset($this->link)){
            $sql = "select * from ".DB_PREFIX."tokens where token=:tk";
            $stmt = $this->link->prepare($sql);
            $stmt->bindParam(":tk",$tokenA);
            $stmt->execute();
            $res = $stmt->fetch(PDO::FETCH_ASSOC);
            if(is_array($res)){
                $this->data["token"] = $tokenA;
                if(isset($res['id'])){
                    $this->id = $res['id'];
                }
                if(isset($res['userid'])){
                    $this->data["userid"] = $res['userid'];
                }
                if(isset($res['logged'])){
                    $this->data["logged"] = $res['logged'];
                }
                if(isset($res['lastaction'])){
                    $this->data["lastaction"] = $res['lastaction'];
                }
                if(isset($res['messages'])){
                    $this->data["messages"] = $res['messages'];
                }               
                return true;
            }
            return false;
        }
    }

    public function getByUserId($useridA){
        if(isset($useridA)
        && isset($this->link)){
            $sql = "select * from ".DB_PREFIX."tokens where userid=:uid";
            $stmt = $this->link->prepare($sql);
            $stmt->bindParam(":uid",$useridA);
            $stmt->execute();
            $res = $stmt->fetch(PDO::FETCH_ASSOC);
            if(is_array($res)){
                $this->data["userid"] = $useridA;
                if(isset($res['id'])){
                    $this->id = $res['id'];
                }
                if(isset($res['token'])){
                    $this->data["token"] = $res['token'];
                }
                if(isset($res['logged'])){
                    $this->data["logged"] = $res['logged'];
                }
                if(isset($res['lastaction'])){
                    $this->data["lastaction"] = $res['lastaction'];
                }
                if(isset($res['messages'])){
                    $this->data["messages"] = $res['messages'];
                }               
                return true;
            }
            return false;
        }
    }

    public function getData($fieldA){
        if($fieldA=="id"){
            return $this->id;
        }
        else if(array_key_exists($fieldA,$this->data)){
            return $this->data[$fieldA];
        }
    }

    public function getDBLink(){
        return $this->link;
    }

    public function getList(){
        if(isset($this->link)){
            $stmt = $this->link->prepare("select * from ".DB_PREFIX."tokens");
            $stmt->execute();
            return $stmt->fetchAll();
        }
    }
    
    public function getListLength(){
        $stmt = $this->link->prepare("select count(*) from ".DB_PREFIX."tokens");
        $stmt->execute();
        $res = $stmt->fetchAll();
        return $res[0][0];
    }

    public function getToken(){
        return sha1(Date("sdYimh",Time()).$this->data["userid"].$this->data["logged"]);
    }

    public function saveToken(){
        if($this->id){
            //update existing
            $sql = "update ".DB_PREFIX."tokens set ";
            $sql .= "userid = :uid,";
            $sql .= "logged = :ulog,";
            $sql .= "lastaction = :ulast,";
            $sql .= "messages = :umsg ";
            $sql .= "where token=:utk";
            $stmt = $this->link->prepare($sql);
            $stmt->bindParam(":uid",$this->data['userid']);
            $stmt->bindParam(":ulog",$this->data['logged']);
            $stmt->bindParam(":ulast",$this->data['lastaction']);
            $stmt->bindParam(":umsg",$this->data['messages']);
            $stmt->bindParam(":utk",$this->data['token']);
            return $stmt->execute();            
        }
        else if(!$this->tokenExists($this->data['token'])
        && !$this->userExists($this->data['userid'])){
            //create new
            $sql = "insert into ".DB_PREFIX."tokens(userid,token)";
            $sql .= "values(:uid,:utk)";
            $stmt = $this->link->prepare($sql);
            $tk = $this->getToken();
            $stmt->bindParam(":uid",$this->data['userid']);
            $stmt->bindParam(":utk",$tk);
            return $stmt->execute();
        }
    
    }

    public function setData($fieldA,$valA){
        if($fieldA==="id"){
            $this->id = $valA;
        }
        if(array_key_exists($fieldA,$this->data)){
            $this->data[$fieldA] = $valA;
        }
    }

    public function setDBLink($dbLinkA=null){
        $this->link = (isset($dbLinkA))?$dbLinkA:null;        
    }

}


?>