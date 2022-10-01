import IPaste from "../../interfaces/paste";
import ReactTimeAgo from "react-time-ago";
import { useRef, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import "./Paste.scss";

interface PasteProps {
	paste: IPaste;
}

const Paste: React.FC<PasteProps> = ({ paste }) => {
	const [showContent, setShowContent] = useState(false);
	const contentRef = useRef<HTMLDivElement>(null);

	const { title, content, author, date } = paste;

	return (
		<div className="paste">
			<div className="header">
				<div className="title">{title}</div>
				<div className="metadata">
					<span className="author">{author}</span>
					<span>
						, <ReactTimeAgo date={new Date(date)} />
					</span>
					<span className="expand" onClick={() => setShowContent(!showContent)}>
						{showContent ? <FaMinus /> : <FaPlus />}
					</span>
				</div>
			</div>
			<div
				ref={contentRef}
				className={`content ${showContent ? "open" : ""}`}
				style={showContent ? { height: contentRef.current!.scrollHeight + "px" } : { height: "0px" }}
			>
				{content}
			</div>
		</div>
	);
};

export default Paste;
