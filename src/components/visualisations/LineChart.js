import React from 'react';
import PropTypes from 'prop-types';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export default function LineChart(props) {
    const { series, title, yAxisTitle1, yAxisTitle2, seriesName1, seriesName2 } = props;
    const options = {
        title: {
            text: title
        },
        xAxis: {
            type: 'datetime'
        },
        yAxis: [{ // Primary yAxis
            title: {
                text: yAxisTitle1,
            },
            labels: {
                format: '{value}'
            }
        }, { // Secondary yAxis
            labels: {
                format: '{value}'
            },
            title: {
                text: yAxisTitle2,
            },
            opposite: true
        }],
        series: [{
            name: seriesName1,
            yAxis: 1,
            type: 'spline',
            data: series.dailyTotalSpends
            }, {
            name: seriesName2,
            type: 'spline',
            data: series.dailytotalTrans
        }]
    };
    return (
        <HighchartsReact highcharts={Highcharts} options={options} />
    );
}

LineChart.propTypes = {
    series: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    yAxisTitle1: PropTypes.string.isRequired,
    yAxisTitle2: PropTypes.string.isRequired,
    seriesName1: PropTypes.string.isRequired,
    seriesName2: PropTypes.string.isRequired
}