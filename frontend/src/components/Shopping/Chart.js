import React from 'react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/markPoint';
import 'echarts/lib/component/markLine';


class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.initEchart = this.initEchart.bind(this);
    }
    initEchart() {
        // 初始化
        var myChart = echarts.init(document.getElementById(this.props.chartId));
        // 绘制图表
        myChart.setOption({
            title: { text: this.props.text },
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:[this.props.yname,]
            },
            toolbox: {
                show : true,
                feature : {
                    dataView : {show: true, readOnly: false},
                    magicType : {show: true, type: ['line', 'bar']},
                    restore : {show: true},
                    saveAsImage : {
                        show: true,
                        type: 'jpg'
                    }
                }
            },
            xAxis : [
                {
                    name : this.props.xname,
                    type : 'category',
                    data : this.props.data.xdata
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:this.props.yname,
                    type:'bar',
                    data: this.props.data.ydata,
                    markPoint : {
                        data : [
                            {type : 'max', name: '最大值'},
                            {type : 'min', name: '最小值'}
                        ]
                    },
                    markLine : {
                        data : [
                            {type : 'average', name: '平均值'}
                        ]
                    }
                },
            ]
        });
    }
    componentDidMount() {
        this.initEchart();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        this.initEchart();
    }

    render() {
        return (
            <div id={this.props.chartId} style={{ width: 800, height: 500 }}></div>
        );
    }
}

export default Chart;