import { Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import PropTypes from 'prop-types';

Chart.register(CategoryScale);

const PieChart = ({ data }) => {

    const dataLabels = Object.keys(data)

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
                ]
            }
        ]
    }

    return (
        <div className="relative w-10/12 h-1/2 max-w-sm mx-auto">
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
                    },
                }}
            />
        </div>
    )
}
export default PieChart

PieChart.propTypes = {
    data: PropTypes.object
}