import { Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import PropTypes from 'prop-types';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(CategoryScale);
Chart.register(ChartDataLabels);

const PieChart = ({ data }) => {

    const dataLabels = Object.keys(data)
    // const dataLabels2 = Object.entries(data).map(el => {
    //     return `${el[0]} - ${el[1]}%`
    // })

    const chartData = {
        labels: dataLabels,
        datasets: [
            {
                label: '%',
                data: Object.values(data),
                backgroundColor: [
                    '#fe7f2d',
                    '#233D4D',
                    '#FCCA46',
                    '#A1C181',
                    '#619B8A',
                    '#2b9348',
                    '#fed9b7',
                    '#c7f9cc'
                ],
                datalabels: {
                    color: 'white'
                },
            }
        ]
    }

    return (
        <div className="relative w-full">
            <Pie
                data={chartData}

                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {},
                    plugins: {
                        legend: {
                            position: "bottom",
                        },
                        datalabels: {
                            display: true,
                            formatter: function (value, context) {
                                return Math.round(value / context.chart.getDatasetMeta(0).total * 100) + "%";
                            }
                        }
                    },
                }}
                className="w-[250px] h-[250px]"
            />
        </div>
    )
}
export default PieChart

PieChart.propTypes = {
    data: PropTypes.object
}