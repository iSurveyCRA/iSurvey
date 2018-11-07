console.log(jsonData.replace(/&quot;/g,"\""));
console.log(jsonResult.replace(/&quot;/g,"\""));

var surveyResultsFromDB =jsonData.replace(/&quot;/g,"\"") ;//작성폼 json
var surveyResultsDataFromDB =jsonResult.replace(/&quot;/g,"\"") ;//답변 json

function surveyResultModel(id, student_id, department, postedAt, results) {
  var self = this;
  self.id = id;
  self.student_id = student_id;
  self.department = department;
  self.postedAt = postedAt;
  self.results = results;
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
    
    for (var i = 0; i < data.length; i++) {
      var item = data[i];
      console.log(item);
      items.push(new surveyResultModel(i + 1, item.student_id, item.department, item.postedAt, item.results));
    }
  }
  self.koItems = ko.observableArray(items);
  self.showSurveyResult = function (item) {
    survey.clear();
    survey.data = item.getJsonResults();
    document.getElementById("surveyResultModalTitle").innerHTML = "Show result for: " + item.name;
    $("#surveyResultModal").modal();
  }
}
ko.applyBindings(new surveyResultsModel(surveyResultsDataFromDB), document.getElementById("resultsTable"));

//Survey.Survey.cssType = "bootstrap";
var json = JSON.parse(surveyJSONFromDB);
var survey = new Survey.Model(json);
survey.mode = 'display';
survey.render("surveyElement");

