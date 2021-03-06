SurveyEditor.editorLocalization.currentLocale = "ko";

SurveyEditor
    .StylesManager
    .applyTheme("winter");

// toolbox 설정
var editorOptions = {
    questionTypes:["text", "checkbox","radiogroup","dropdown","rating","boolean","comment", "matrix", "matrixdropdown"],
    showPropertyGrid: false,
    showJSONEditorTab:false,
//    isAutoSave: true
};

var editor = new SurveyEditor.SurveyEditor("editorElement", editorOptions);

//pug에서 보내준 정보들
console.log(jsonData.replace(/&quot;/g,"\""));
var formJSON = jsonData.replace(/&quot;/g,"\"");
editor.text = formJSON;

//Setting this callback will make visible the "Save" button
//저장버튼을 누르면 /saveForm에post방식으로 json보내기
editor.saveSurveyFunc = function(saveNo, callback) {
  alert("수정되었습니다.");

  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/modifyForm', true);
//  xhr.open('POST', '/saveForm', true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.onload = function() {
//    var result = xhr.response ? JSON.parse(xhr.response) : null;
    if (xhr.status === 200) {
      callback(saveNo, true);
    } 
  };
  xhr.send(
    JSON.stringify({ Json: editor.text, ID: formid})
  );

};


//음성인식 기능 삭제
editor.toolbox.removeItem("microphone");
