import IPaste from "../../interfaces/paste";
import "./Paste.scss";
import ReactTimeAgo from "react-time-ago";
import { useRef, useState } from "react";

interface PasteProps {
	paste: IPaste;
}

const Paste: React.FC<PasteProps> = ({ paste }) => {
	const { title, content, author, date } = paste;

	return (
		<div className="paste">
			<div className="header">
				<div className="title">{title}</div>
				<div className="metadata">
					<span className="author">{author}</span>, <ReactTimeAgo date={new Date(date)} />
				</div>
			</div>
			<div className="content">{content}</div>
		</div>
	);
};

export default Paste;
