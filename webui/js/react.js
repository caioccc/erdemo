import '../css/react.less';

import React from 'react';
import ReactDOM from 'react-dom';

import CsvParse from '@vtex/react-csv-parse'

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import { Dropdown } from '../eds/dropdowns/Dropdown.js';
import { Dialog } from '../eds/dialogs/Dialog.js';
import { Datepicker } from '../eds/date-fields/Datepicker.js';


function getChartSize(el) {
    let width = 650;
    let height = 500;

    return [width, height];
}

class Chart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            timestamp_data: [],
            training_data: [],
            predicted_data: [],
            chart: {
                zoomType: 'xy'
            },
            title: {
                text: 'Análise dos dados'
            },
            subtitle: {
                text: document.ontouchstart === undefined ?
                    'Clique e arraste na área de plotagem para ampliar' : 'Aperte o gráfico para aumentar o zoom'
            },
            xAxis: {
                type: 'datetime'
            },
            yAxis: [{ // Training yAxis
                title: {
                    text: 'Training',
                    style: {
                        color: Highcharts.getOptions().colors[2]
                    }
                },
                opposite: true

            }, { // Predicted yAxis
                title: {
                    text: 'Predicted',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                },
                opposite: true
            }],
            legend: {
                enabled: true
            },
            
            series: [{
                name: 'Training',
                type: 'spline',
                data: []

            }, {
                name: 'Predicted',
                type: 'spline',
                data: []
            }]
        }
        this.handleData = this.handleData.bind(this);
        
    }

    handleData(data) {
        const _this = this;
        let timestamp_data = [];
        let training_data = [];
        let predicted_data = [];
        data.forEach(d => {
            let train_item = [];
            let predicted_item = [];
            let time = (d.date ? d.date : d.timestamp);
            train_item[0] = time;
            train_item[1] = d.training ? +d.training : null;
            predicted_item[0] = time;
            predicted_item[1] = d.predicted ? +d.predicted : null;
            if (timestamp_data.indexOf(time) === -1) {
                timestamp_data.push(time);
            }
            training_data.push(train_item);
            predicted_data.push(predicted_item);
        });

        _this.setState({
            xAxis: [{
                categories: timestamp_data,
                crosshair: true
            }],
            timestamp_data: timestamp_data,
            training_data: training_data,
            predicted_data: predicted_data,
            series: [{
                name: 'Training',
                type: 'spline',
                data: training_data
            }, {
                name: 'Predicted',
                type: 'spline',
                data: predicted_data
            }]
        });
        
    }

    componentDidMount() {
        const _this = this;
    }


    render() {
        var width = this.state.chartWidth;
        var height = this.state.chartHeight;
        var margin = this.state.margin;
        var data = this.state;

        const keys = [
            "timestamp",
            "training",
            "predicted",
            "validation"
        ]

        return (
            <div>

                <div id="chart">
                    
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={data}
                    />
                </div>
                
                <CsvParse
                    keys={keys}
                    onDataUploaded={this.handleData}
                    onError={this.handleError}
                    render={onChange => <input type="file" onChange={onChange} />}
                />
            </div>
        );
    }
}

class ReactMode extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                <div id="app-header" className="row">
                    <div className="row">
                        <div className="column sm-12">
                            <span className="title">ER DEMO</span>
                        </div>
                    </div>

                    <div className="row">
                        <div className="columns sm-8 sub">
                            This is the React-based mode, recommended for more complex interfaces
                        </div>
                    </div>
                </div>
                <div className="row">

                    <div className="column sm-12 md-6 lg-6 xl-12">
                        <div className="tile">
                            <div className="header">
                                <div className="left">
                                    <div className="title">First Graph</div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="column sm-12">
                                    <div id="graphic"></div>
                                    <Chart />
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
ReactDOM.render(
    <ReactMode />,
    document.querySelector('#react-mode')
);