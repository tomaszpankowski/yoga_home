let registerFormApi = {
    getClearData(){
        return {
            firstName:"",
            lastName:"",
            emailAddr:"",
            userLogin:"",
            userPass:"",
            userPassConfirm:""        
        };
    },
    getRegisterData(formDataA,registerCounterA){
        let formData = new FormData();
        formData.append("firstName",formDataA.firstName);
        formData.append("lastName",formDataA.lastName);
        formData.append("emailAddr",formDataA.emailAddr);
        formData.append("userLogin",formDataA.userLogin);
        formData.append("userPass",formDataA.userPass);
        formData.append("regcount",(registerCounterA==="" && Number.isInteger(registerCounterA))?0:registerCounterA);
        return formData;
    },
    getTokenData(getCookieA){
        let formData = new FormData();
        formData.append("tkid",getCookieA("tkid"));
        return formData;
    },
    sendData(backNavA,dataA,getCookieA,REG_LINK){
        fetch(REG_LINK,{
            method:"POST",
            body:dataA
        })
        .then((response)=>response.json())
        .then((data)=>{
            if(data["regcount"]!==undefined
            && !isNaN(data["regcount"])){                    
                getCookieA("regcount",data.regcount,2);
                backNavA("confirm");
            }
        }).catch((error)=>{
            backNavA("error");
        });         
    }

};
export default registerFormApi;