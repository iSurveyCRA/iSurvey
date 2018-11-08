//응답자 별 결과보기
var surveyJSONFromDB =jsonData.replace(/&quot;/g,"\"") ;//작성폼 json(object)
var surveyResultsDataFromDB =jsonResult.replace(/&quot;/g,"\"") ;//답변 json(array)
var obj = JSON.parse(surveyResultsDataFromDB);

var survey = new Survey.Model(surveyJSONFromDB);

function surveyResultModel(id, student_id_num, user_department_str, data) {
  var self = this;
  self.id = id;
  self.student_id_num = student_id_num;
  self.user_department_str = user_department_str;
  self.data = data;
  self.getJsonResults = function () {
	return self.data;
  }
}
function surveyResultsModel(data) {
  var self = this;
  var items = [];
  if (data) {
    for (var i = 0; i < Object.keys(data).length; i++) {
      var item = data[i];
	console.log(item.data);
      items.push(new surveyResultModel(i + 1, item.student_id_num, item.user_department_str, item.data));
  }
}
  self.koItems = ko.observableArray(items);
  self.showSurveyResult = function (item) {
//    survey.clear();
    survey.data = item.getJsonResults();
    document.getElementById("surveyResultModalTitle");
    $("#surveyResultModal").modal();
survey.mode = 'display';
survey.render("surveyElement");
  }
}
ko.applyBindings(new surveyResultsModel(obj), document.getElementById("resultsTable"));

//Survey.Survey.cssType = "bootstrap";
Survey
	.StylesManager
	.applyTheme("winter");
