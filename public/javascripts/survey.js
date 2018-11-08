//만든 설문 참여할때

Survey
    .StylesManager
    .applyTheme("winter");

//survey.pug에서 보내준 jsonData
//console.log(jsonData.replace(/&quot;/g,"\""));
var surveyJSON = jsonData.replace(/&quot;/g,"\"");

//function sendDataToServer(survey){
//      alert("The results are:" + JSON.stringify(survey.data));
//}


var survey = new Survey.Model(surveyJSON);

$("#surveyContainer").Survey({
    model: survey,
});

survey.onComplete.add(function(sender,options){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", '/saveResult',true);
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    xhr.onload = xhr.onerror = function () {
        if (xhr.status == 200) {
            options.showDataSavingSuccess(); //you may pass a text parameter to show your own text
            //Or you may clear all messages
//            options.showDataSavingClear();
        } else {
            //Error
            options.showDataSavingError(); //you may pass a text parameter to show your own text
        }
    };
	console.log(sender.data);
	xhr.send(JSON.stringify({Json: sender.data, Url: document.location.href}));

 });
