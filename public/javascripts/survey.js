//만든 설문 참여할때

console.log(jsonData.replace(/&quot;/g,"\""));

Survey
    .StylesManager
    .applyTheme("winter");

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
            //options.showDataSavingClear();
        } else {
            //Error
            options.showDataSavingError(); //you may pass a text parameter to show your own text
        }
    };
	console.log("sender.data: ");
	console.log(sender.data);
//	xhr.send(JSON.stringify(sender.data));
	xhr.send(JSON.stringify({Json: sender.data, Url: document.location.href}));

 });
