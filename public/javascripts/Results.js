//결과 chart로 나타내기(미완)

var surveySendResult = function (s, options) {
    if (options.success) {
        s.getResult('a15eee7a-9418-4eb4-9671-2009c8ff6b24', 'langs');
    }
};
var surveyGetResult = function (s, options) {
    if (options.success) {
        showChart(options.dataList);
    }
};
function showChart(chartDataSource) {
    document
        .getElementById("chartContainer")
        .style
        .height = "500px";
    $("#chartContainer").dxPieChart({
        dataSource: chartDataSource,
        series: {
            argumentField: 'name',
            valueField: 'value'
        }
    });
}

Survey
    .StylesManager
    .applyTheme("winter");

var json = {
    surveyId: '5af48e08-a0a5-44a5-83f4-1c90e8e98de1',
    surveyPostId: '3ce10f8b-2d8a-4ca2-a110-2994b9e697a1'
};

//var json = jsonData.replace(/&quot;/g,"\"");
console.log(jsonData.replace(/&quot;/g,"\""));
//console.log("json: ");
//console.log(jsonData);
//window.survey = new Survey.Model(json);
var survey = new Survey.Model(json);

survey
    .onComplete
    .add(function (result) {
        document
            .querySelector('#surveyResult')
            .innerHTML = "result: " + JSON.stringify(result.data);
    });

//$("#surveyElement").Survey({model: survey, onSendResult: surveySendResult, onGetResult: surveyGetResult});
$("#surveyElement").Survey({model: survey, onGetResult: surveyGetResult});


