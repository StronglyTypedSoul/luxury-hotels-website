import "./TagsDiagram.scss";
import Loader from "../Loader/Loader";

interface TagsDiagramProps {
	tags: { sum: number; name: string }[] | undefined;
}

const TagsDiagram: React.FC<TagsDiagramProps> = ({ tags }) => {
	return <div className="tags-diagram">{tags?.length || <Loader />}</div>;
};

export default TagsDiagram;
