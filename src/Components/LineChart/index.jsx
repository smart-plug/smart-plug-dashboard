import React from 'react';
import './index.css';

import { ResponsiveLine } from '@nivo/line';
import { Chip } from '@mui/material';

const LineChart: React.FC = ({ data }) => {
  return (
    <ResponsiveLine
      data={data}
      enableArea={true}
      margin={{ top: 25, right: 25, bottom: 60, left: 50 }}
      xScale={{ type: 'time', format: '%Y-%m-%dT%H:%M:%S.%L%Z' }}
      xFormat="time:%Y-%m-%dT%H:%M:%S.%L%Z"
      yScale={{
        type: 'linear',
        min: 'auto',
        max: 'auto',
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickValues: 5,
        format: '%d/%m %H:%M',
        legendOffset: 36,
        legendPosition: 'middle',
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'kWh',
        legendOffset: -40,
        legendPosition: 'middle',
      }}
      pointSize={2}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: 'top',
          direction: 'row',
          justify: false,
          translateX: 0,
          translateY: -25,
          itemsSpacing: 10,
          itemDirection: 'left-to-right',
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: 'circle',
          symbolBorderColor: 'rgba(0, 0, 0, .5)',
          effects: [
            {
              on: 'hover',
              style: {
                itemBackground: 'rgba(0, 0, 0, .03)',
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default LineChart;
