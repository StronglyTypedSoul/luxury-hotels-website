import "./TagsDiagram.scss";
import Loader from "../Loader/Loader";
import "chart.js/auto";
import { Bar } from "react-chartjs-2";

interface TagsDiagramProps {
	tags: { sum: number; name: string }[] | undefined;
}

const TagsDiagram: React.FC<TagsDiagramProps> = ({ tags }) => {
	console.log(tags);
	const chartData = {
		labels: tags?.map((tag) => tag.name),
		datasets: [
			{
				label: "data",
				data: tags?.map((tag) => tag.sum),
				backgroundColor: [
					"rgb(200,200,200)",
					"rgb(200,200,200)",
					"rgb(200,200,200)",
					"rgb(200,200,200)",
					"rgb(200,200,200)",
					"rgb(200,200,200)",
					"rgb(200,200,200)",
				],
			},
		],
	};
	console.log(chartData);
	return <div className="tags-diagram">{tags ? <Bar data={chartData} /> : <Loader />}</div>;
};

export default TagsDiagram;
