<?php 

class TDBLink{
    private $dblink;
    private $connData;

    private function getConnStr(){
        $res = "mysql:host=";
        $res.= $this->connData["host"];
        $res.= ";dbname=";
        $res.= $this->connData["db"];
        $res.=";";
        return $res;
    }

    public function __construct($hostA=null,$dbA=null,$userA=null,$passA=null){
        $this->dblink = null;
        $this->connData = array(
            "host"=>$hostA,
            "db"=>$dbA,
            "user"=>$userA,
            "pass"=>$passA
        );
    }

    public function connect(){
        try{
            $this->dblink = new PDO($this->getConnStr(),$this->connData["user"],$this->connData["pass"]);
            $this->dblink->setAttribute(PDO::ATTR_EMULATE_PREPARES,false);
            $this->dblink->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        }
        catch(PDOException $e){
            $this->dblink = null;
        }
    }

    public function disconnect(){
        $this->dblink = null;
    }

    public function getData($fieldA){
        if(array_key_exists($fieldA,$this->connData)){
            return $this->connData[$fieldA];
        }
    }

    public function getLink(){
        return $this->dblink;
    }

    public function setData($fieldA,$valA){
        if(array_key_exists($fieldA,$this->connData)){
            $this->connData[$fieldA] = $valA;
        }
    }
}



?>
