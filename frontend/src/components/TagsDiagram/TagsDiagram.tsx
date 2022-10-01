import "./TagsDiagram.scss";
import Loader from "../Loader/Loader";
import "chart.js/auto";
import { Bar } from "react-chartjs-2";

interface TagsDiagramProps {
	tags: { sum: number; name: string }[] | undefined;
}

const TagsDiagram: React.FC<TagsDiagramProps> = ({ tags }) => {
	const randomRgb = () => {
		const randomColor = () => Math.floor(Math.random() * 256);
		return `rgb(${randomColor()},${randomColor()},${randomColor()})`;
	};

	const capitalize = (str: string) => {
		return str[0].toUpperCase() + str.slice(1);
	};

	const chartData = {
		labels: tags?.map((tag) => capitalize(tag.name)),
		datasets: [
			{
				label: "data",
				data: tags?.map((tag) => tag.sum),
				color: "#666",
				backgroundColor: tags?.map(() => randomRgb()),
			},
		],
	};
	const chartOptions = {
		plugins: {
			legend: {
				display: false,
			},
		},
		layout: {
			padding: 40,
		},
		scales: {
			yAxes: {
				grid: {
					color: "gray",
				},
				ticks: {
					color: "white",
					fontSize: 13,
				},
			},
			xAxes: {
				grid: {
					display: false,
				},
				ticks: {
					color: "white",
					fontSize: 13,
				},
			},
		},
	};
	return <div className="tags-diagram">{tags ? <Bar data={chartData} options={chartOptions} /> : <Loader />}</div>;
};

export default TagsDiagram;
