import React from 'react';
import PropTypes from 'prop-types';

import Highcharts from 'highcharts';
import highchartsSankey from 'highcharts/modules/sankey';

import HighchartsReact from 'highcharts-react-official';

highchartsSankey(Highcharts);

export default function SankeyChart(props) {
    const { series, title, seriesName } = props;

    const options = {

        title: {
            text: title
        },
        accessibility: {
            point: {
                valueDescriptionFormat: '{index}. {point.from} to {point.to}, {point.weight}.'
            }
        },
        series: [{
            keys: ['from', 'to', 'weight'],
            data: series,
            type: 'sankey',
            name: seriesName
        }]
    
    };
    return (
        <HighchartsReact highcharts={Highcharts} options={options} />
    );
}

SankeyChart.propTypes = {
    series: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    seriesName: PropTypes.string.isRequired
}