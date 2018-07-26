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
	   title: "과목선택",
	   isCopied: true,
	   json: {
		"type": "dropdown",
		choicesByUrl: {
			optionsCaption: "Select a subject...",
			url: "https://restcountries.eu/rest/v2/all" //과목크롤링리스트
		}
	}
});

editor
	.toolbox
	.addItem({
                name: "registerDate",
                iconName: "icon-default",
                title: "설문기한설정",
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
