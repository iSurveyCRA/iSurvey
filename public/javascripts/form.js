Survey
	.StylesManager
	.applyTheme("winter");



var json = {
   questions: [
        {
            name: "short",
            type: "text",
            title: "단답형:",
            placeHolder: "answer",
            isRequired: true

        }, {
            name: "respondDate",
            type: "multipletext",
            inputType: "date",
            title: "응답기간:",
            isRequired: true,
	    items: [
	     {
	       name: "start",
	       inputType: "date"
	     },{
	       name: "end",
	       inputType: "date"
	     }
	  ] 
        }, {
            name: "choose_single",
            type: "radiogroup",
            title: "단일선택",
            isRequired: true,
            choices: [
              "apple",
              "strawberry",
              "banana",
              "peach"
            ]
        }, {
          name: "dropBox",
          type: "dropdown",
          title: "드롭박스",
          isRequired: true,
          choices: [
            "none",
            "1",
            "2",
            "3"
          ]
        }, {
          name: "checkBoxes",
          type: "checkbox",
          title: "체크박스",
          isRequired: true,
           colCount: 4,
          choices: [
            "컴퓨터구조",
            "이산수학",
            "c++",
            "실전프로젝트1",
            "웹서비스개발",
            "프로그래밍언어론"
          ]
        }, {
          name: "Quality",
          type: "matrix",
          tilte: "항목별 만족도",
          columns: [
                {
                    value: 1,
                    text: "Strongly Disagree"
                }, {
                    value: 2,
                    text: "Disagree"
                }, {
                    value: 3,
                    text: "Neutral"
                }, {
                    value: 4,
                    text: "Agree"
                }, {
                    value: 5,
                    text: "Strongly Agree"
                }
          ],
          rows: [
              {
                    value: "affordable",
                    text: "Product is affordable"
                }, {
                    value: "does what it claims",
                    text: "Product does what it claims"
                }, {
                    value: "better then others",
                    text: "Product is better than other products on the market"
                }, {
                    value: "easy to use",
                    text: "Product is easy to use"
                }
          ]
	}, {
            "type": "tagbox",
            "isRequired": true,
            "choicesByUrl": {
                "url": "https://restcountries.eu/rest/v2/all"
            },
            "name": "countries",
            "title": "Please select all countries you have been for the last 3 years."

        }, {
          name: "suggestion",
          type: "comment",
          title: "의견란",
          placeHolder: "please wirte your suggestion"
        }, {
            type: "emotionsratings",
            name: "만족도",
            title: "Please rate the movie you've just watched",
            choices: ["1", "2", "3", "4", "5"]
        }
    ]

};

window.survey = new Survey.Model(json);

survey
    .onComplete
    .add(function (result) {
        document
            .querySelector('#surveyResult');
         //   .innerHTML = "result: " + JSON.stringify(result.data);
	alert("result:" + JSON.stringify(result.data));	
    });

$("#surveyElement").Survey({model: survey});


