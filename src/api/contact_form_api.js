let contactFormApi = {
    clearData(){
        return {
            emailAddress: "",
            firstName: "",
            lastName: "",
            messageText: "",
            phoneNumber: ""
        };  
    },
    getFormData(formDataA,messageCounterA){
        let formData = new FormData();
        formData.append("fname",formDataA.firstName);
        formData.append("flast",formDataA.lastName);
        formData.append("fmail",formDataA.emailAddress);
        formData.append("fphone",formDataA.phoneNumber);
        formData.append("fmsg",formDataA.messageText);
        formData.append("msgcount",(messageCounterA==="" && Number.isInteger(messageCounterA))?0:messageCounterA);
        return formData;
    },
    sendData(backNavA,dataA,getCookieA,MSG_LINK){
        fetch(MSG_LINK,{
            method:"POST",
            body:dataA
        })
        .then((response)=>response.json())
        .then((data)=>{
            if(data["msgcount"]!==undefined
            && !isNaN(data["msgcount"])){                    
                getCookieA("msgcount",data.msgcount,2);
                backNavA("confirm");
            }
        }).catch((error)=>{
            backNavA("error");
        });         
    }
};

export default contactFormApi;