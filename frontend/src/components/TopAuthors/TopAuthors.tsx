import "./TopAuthors.scss";
import Loader from "../Loader/Loader";

interface TopAuthorsProps {
	topAuthors: { sum: number; name: string }[] | undefined;
}

const TopAuthors: React.FC<TopAuthorsProps> = ({ topAuthors }) => {
	return (
		<div className="top-authors">
			{topAuthors ? (
				<>
					<h4>Most Active Authors</h4>
					{topAuthors.map((author, index) => {
						return (
							<p key={author.name}>
								{index + 1}. <span className="author">{author.name}</span> - {author.sum} pastes
							</p>
						);
					})}
				</>
			) : (
				<Loader />
			)}
		</div>
	);
};

export default TopAuthors;
