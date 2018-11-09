//한국어 설정
SurveyEditor.editorLocalization.currentLocale = "ko";

//테마 설정
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


//Setting this callback will make visible the "Save" button
//저장버튼을 누르면 /saveForm에post방식으로 json보내기
editor.saveSurveyFunc = function(saveNo, callback) {
  //alert("저장되었습니다.");

  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/saveForm', true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.onload = function() {
    var result = xhr.response ? JSON.parse(xhr.response) : null;
    if (xhr.status === 200) {
      callback(saveNo, true);
    }
  };

  xhr.send(
    JSON.stringify({ Json: editor.text})
  );
	
};

/*
//기능 추가
editor
	.toolbox
	.addItem({
	   name: "subject",
	   iconName: "icon-default",
	   title: "설문 category",
	   isCopied: true,
	   isrequired: true,
	   json: {
			type: "panel",
			name:"panel_departmentBySubject",
			elements: [
			{
				type:"dropdown",
				name:"department",
				title:"Select the department..",
			choicesByUrl: {
				url: "https://restcountries.eu/rest/v2/all", //학부리스트
			}
			},{
				type:"dropdown",
				name:"subject",
				title:"Select the subject..",
			choicesByUrl: {
				url:"https://restcountries.eu/rest/v2/region/{region}" //학부에 따른 과목크롤링리스트
			}
			}
		]
	    }
});

editor
	.toolbox
	.addItem({
                name: "registerDate",
                iconName: "icon-default",
                title: "응답기한 설정",
                isCopied: true,
		isrequired: true,
                json: {
                        "type": "multipletext",
                        items: [
                         {
                                name:"start",
                                inputType: "date"
                         },{
                                name:"end",
                                inputType: "date"
                         }
                        ]
                }
          });
*/
//음성인식 기능 삭제
editor.toolbox.removeItem("microphone");

