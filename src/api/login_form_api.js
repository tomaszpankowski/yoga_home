let loginFormApi = {
    getClearData(){
        return {
            name: "",
            pass: ""            
        };
    },
    getLoginData(formDataA,getCookieA){
        let formData = new FormData();
        formData.append("userName",formDataA.name);
        formData.append("userPass",formDataA.pass);
        if(getCookieA("tkid").length>0){
            formData.append("tkid",getCookieA("tkid"));
        }
        return formData;
    },
    getTokenData(getCookieA){
        let formData = new FormData();
        formData.append("tkid",getCookieA("tkid"));
        return formData;
    },
    sendData(backNavA,dataA,setCookieA,USR_LINK){
        fetch(USR_LINK,{
            method:"POST",
            body:dataA
        })
        .then((response)=>response.json())
        .then((data)=>{
            if(data["tkid"]!==undefined){                    
                setCookieA("tkid",data.tkid,2);
                backNavA("dashboard");
            }
        }).catch((error)=>{
            backNavA("error");
        });  
    },
    sendToken(backNavA,setCookieA,tokenDataA,TOKEN_LINK){
        fetch(TOKEN_LINK,{
            method:"POST",
            body:tokenDataA
        })
        .then((response)=>{
            if(response.status===200){
                backNavA("dashboard");
            }
            else if(response.status===401){
                setCookieA("tkid","",-1);
            }
        })
        .catch((error)=>{
            backNavA("form");
        });  
    }
};

export default loginFormApi;