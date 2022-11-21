import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

interface Props {
  seriesValues: any[];
}

const Revenue = ({seriesValues}: Props) => {
    const options = {
        chart: {
          type: "line",
          height: (10 / 16 * 100) + '%',
          width: 800
        },
        title: {
          text: ""
        },
        yAxis: {
            title: {
                text: ''
            }
        },
        series: seriesValues
    };

    return(
        <div className='highcharts-chart-container'>
          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    )
}

export default Revenue;