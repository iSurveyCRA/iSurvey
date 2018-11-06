console.log(jsonData.replace(/&quot;/g,"\""));
console.log(jsonResult.replace(/&quot;/g,"\""));

var surveyJSONFromDB =jsonData.replace(/&quot;/g,"\"") ;//작성폼 json
var surveyResultsDataFromDB =jsonResult.replace(/&quot;/g,"\"") ;//답변 json
var obj = JSON.parse(surveyResultsDataFromDB);

function surveyResultModel(id, student_id, user_department, results) {
  var self = this;
  self.id = id;
  self.student_id = student_id;
  self.user_department = user_department;
  self.data = results;
  self.jsonResultsValue = null;
  self.getJsonResults = function () {
    if (!self.jsonResultsValue && self.results) {
      self.jsonResultsValue = JSON.parse(self.results);
    }
    return self.jsonResultsValue;
  }
}
function surveyResultsModel(data) {
  var self = this;
  var items = [];
  if (data) {
    for (var i = 0; i < Object.keys(data).length; i++) {
      var item = data[i];
	console.log(item.data);
      items.push(new surveyResultModel(i + 1, item.student_id, item.user_department, item.data));
  }
}
  self.koItems = ko.observableArray(items);
  self.showSurveyResult = function (item) {
    survey.clear();
    survey.data = item.getJsonResults();
    document.getElementById("surveyResultModalTitle");
    $("#surveyResultModal").modal();
  }
}
ko.applyBindings(new surveyResultsModel(obj), document.getElementById("resultsTable"));

Survey.Survey.cssType = "bootstrap";
//Survey
//    .StylesManager
//    .applyTheme("winter");

var json = surveyJSONFromDB;
//var json = JSON.parse(surveyJSONFromDB);
var survey = new Survey.Model(json);
survey.mode = 'display';
survey.render("surveyElement");
