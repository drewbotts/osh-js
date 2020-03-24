// create data source for Android phone camera
import Chart from "../../source/osh/datareceiver/osh-DataReceiver-DataSourceChart";
import ChartJsView from "../../source/osh/ui/view/chart/osh-UI-ChartJsView";
import Curve from "../../source/osh/ui/styler/osh-UI-StylerCurve";

let chartDataSource = new Chart("weather", {
    protocol: "ws",
    service: "SOS",
    endpointUrl: "sensiasoft.net:8181/sensorhub/sos",
    offeringID: "urn:mysos:offering03",
    observedProperty: "http://sensorml.com/ont/swe/property/Weather",
    startTime: "now",
    endTime: "2055-01-01Z",
    syncMasterTime: false,
    bufferingTime: 0
});

let windSpeedStylerCurve = new Curve({
    valuesFunc: {
        dataSourceIds: [chartDataSource.id],
        handler: function (rec, timeStamp) {
            return {
                x: timeStamp,
                y: rec[0]
            };
        }
    }
});

// show it in video view
let chartView = new ChartJsView("char-container",
    [{
        styler: windSpeedStylerCurve,
        name: "WindSpeed"
    }],
    {
        name: "WindSpeed/Pressure chart",
        yLabel: 'Wind Speed (m/s)',
        xLabel: 'Time',
        css: "chart-view",
        maxPoints: 30
    }
);

// start streaming
chartDataSource.connect();
