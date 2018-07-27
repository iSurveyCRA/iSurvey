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
    isAutoSave: true
};

var editor = new SurveyEditor.SurveyEditor("editorElement", editorOptions);

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
			//title:"Select the department...",
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

//음성인식 기능 삭제
editor.toolbox.removeItem("microphone");


//set and save a survey
//save 버튼 누르고 나서 보이도록 callback 설정하기
/*editor.saveSurveyFunc = function(){
	//save the survey JSON
	var jsonEl = document.getElementById('surveyJSON');
	jsonEl.value = editor.text;
}

editor.text = "{ pages: [{ name:\'page1\', questions: \'text\', name:\"q1\"}]}]}";

*/
