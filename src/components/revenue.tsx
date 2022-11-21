import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

interface Props {
  seriesValues: any[];
}

const Revenue = ({seriesValues}: Props) => {
    const options = {
        chart: {
          type: "line"
        },
        title: {
          text: "Revenue Chart"
        },
        yAxis: {
            title: {
                text: 'Fruit eaten'
            }
        },
        series: seriesValues
    };

    return(
        <div className='container'>
            <div className='highcharts-chart-container'>
                <div className='revenue-type-drop-down'>

                </div>
                <div className='revenue-chart'>
                    <HighchartsReact highcharts={Highcharts} options={options} />
                </div>
            </div>
            <div className='revenue-tables-container'>
              {"asdfhklshadlkfhlkshadlkfhksadf"}
            </div>
        </div>
    )
}

export default Revenue;