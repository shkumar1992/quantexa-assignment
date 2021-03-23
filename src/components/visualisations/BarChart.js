import React from 'react';
import PropTypes from 'prop-types';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export default function BarChart(props) {
    const { series, title, yAxisTitle } = props;

    const options = {
        chart: {
            type: 'bar'
        },
        title: {
            text: title
        },
        xAxis: {
            type: 'category',
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: yAxisTitle
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: 'Spend',
            data: series
        }]
    };
    return (
        <HighchartsReact highcharts={Highcharts} options={options} />
    );
}

BarChart.propTypes = {
    series: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    yAxisTitle: PropTypes.string.isRequired
}