import { Chart as ChartJS, BarElement, Title, Tooltip, Legend, CategoryScale, LinearScale, } from "chart.js";
import { Bar } from 'react-chartjs-2';
const PackagesBar = ({data}) => {
    ChartJS.register(BarElement, Title, Tooltip, CategoryScale, LinearScale,);
    const options = {
        responsive: true,
        plugins: {
          legend: {
            display: false
          },
          title: {
            display: true,
            text: 'Packages Distribution',
          },
        },
    };

    return (
        <div className="bar__graph">
            <Bar
               data={{labels: data.packages,
                    datasets : [{
                        data: data.surveys,
                        backgroundColor: "#fd7e50"
                    }]
                }}
                options={options}
            />
        </div>
    )
}
export default PackagesBar;