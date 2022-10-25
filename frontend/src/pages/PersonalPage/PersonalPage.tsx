import { useEffect, useState } from "react";
import { getAllTags } from "../../api/endpoints";
import Loader from "../../components/Loader/Loader";
import useDidMount from "../../hooks/useDidMount";
import "./PersonalPage.scss";

const PersonalPage: React.FC = () => {
	const [tags, setTags] = useState<string[]>([]);
	const [watchedTags, setWatchedTags] = useState<string[]>([]);

	const isFirstRender = useDidMount();

	useEffect(() => {
		getAllTags().then((tags) => setTags(tags));
		if (localStorage.getItem("watchedTags")) {
			try {
				const storagedTags = JSON.parse(localStorage.getItem("watchedTags")!);
				if (Array.isArray(storagedTags)) setWatchedTags(storagedTags);
				else throw new Error();
			} catch (err) {
				localStorage.setItem("watchedTags", JSON.stringify([]));
			}
		}
	}, []);

	useEffect(() => {
		if (!isFirstRender) {
			localStorage.setItem("watchedTags", JSON.stringify(watchedTags));
		}
	}, [watchedTags]);

	const onTagToggle = (tag: string) => {
		setWatchedTags((prevWatchedTags) => {
			if (prevWatchedTags.includes(tag)) {
				return prevWatchedTags.filter((watchedTag) => watchedTag !== tag);
			} else {
				return [...prevWatchedTags, tag];
			}
		});
	};

	const content = (
		<>
			<h4>Receive notifications for the following tags:</h4>
			<div className="tags">
				{tags.map((tag) => (
					<div className="tag" key={tag}>
						{tag}
						<label className="switch">
							<input checked={watchedTags.includes(tag)} type="checkbox" onChange={() => onTagToggle(tag)} />
							<span className="slider"></span>
						</label>
					</div>
				))}
			</div>
		</>
	);

	return <div className="personal-page">{tags.length > 0 ? content : <Loader />}</div>;
};

export default PersonalPage;
