//만든 설문 참여할때

Survey.Survey.cssType = "winter";
var surveyJSON = { questions: [ {type:"text", name: "question1" } ] };
//var surveyJSON = forminfo.data; 여기에 data가져오기

function sendDataToServer(survey){
      alert("The results are:" + JSON.stringify(survey.data));
}

var survey = new Survey.Model(surveyJSON);
$("#surveyContainer").Survey({
    model: survey,
});

