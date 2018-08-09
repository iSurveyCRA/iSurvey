
//만든 설문 참여할때

console.log(jsonData.replace(/&quot;/g,"\""));

//Survey.Survey.cssType = "winter";
Survey
    .StylesManager
    .applyTheme("winter");

var surveyJSON = jsonData.replace(/&quot;/g,"\"");

//function sendDataToServer(survey){
//      alert("The results are:" + JSON.stringify(survey.data));
//}


var survey = new Survey.Model(surveyJSON);

survey
    .onComplete
    .add(function (result) {
        document
            .querySelector('#surveyResult')
            .innerHTML = "result: " + JSON.stringify(result.data);
    });

$("#surveyContainer").Survey({
    model: survey,
});
