import "./TopAuthors.scss";
import Loader from "../Loader/Loader";

interface TopAuthorsProps {
	topAuthors: { sum: number; name: string }[] | undefined;
}

const TopAuthors: React.FC<TopAuthorsProps> = ({ topAuthors }) => {
	return <div className="top-authors">{topAuthors?.length || <Loader />}</div>;
};

export default TopAuthors;
