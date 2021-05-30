import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useState } from 'react';

export const Chart = (props) => {
  const [oldClass, setOldClass] = useState();

  const options = {
    chart: {
      type: 'column',
      zoomType: 'xy',
    },
    title: {
      text: `Biểu đồ thống kê điểm danh ${props.semester.name}`,
    },
    creadits: {
      enable: false,
    },
    xAxis: {
      categories: props.charts.map((category) => category.name),
    },
    legend: {
      align: 'right',
      verticalAlign: 'bottom',
      layout: 'vertical',
    },
    tooltip: {
      backgroundColor: '#333333',
      style: {
        color: '#fff',
      },
      borderColor: '#333333',
      borderRadius: 5,
    },
    colors: ['#b7eb8f', '#ffa39e', '#ffd591'],
    yAxis: {
      title: 'Lớp',
    },
    series: [
      {
        name: 'Có mặt',
        data: props.charts.map((attend) => Number(attend.attend)),
      },
      {
        name: 'vắng',
        data: props.charts.map((absent) => Number(absent.absent)),
      },
      {
        name: 'muộn',
        data: props.charts.map((late) => Number(late.late)),
      },
    ],
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              align: 'right',
              verticalAlign: 'bottom',
              layout: 'horizontal',
            },
            yAxis: {
              labels: {
                align: 'left',
                x: 0,
                y: -5,
              },
              title: {
                text: null,
              },
            },
            subtitle: {
              text: null,
            },
            credits: {
              enabled: false,
            },
          },
        },
      ],
    },
    plotOptions: {
      series: {
        lineWidth: 1,
        point: {
          events: {
            click: function (e) {
              if (oldClass?.name !== e.point.category && !props.showCamera) {
                props.setShowCamera(true);
              } else {
                props.setShowCamera(false);
              }
              const click = props.charts.find(
                (item) => item.name === e.point.category
              );

              props.setClassIdChart(click.id);
              setOldClass(click.name);
            },
          },
        },
      },
    },
  };
  return <HighchartsReact highcharts={Highcharts} options={options} />;
};
