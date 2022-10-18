import { IPaste } from "../../interfaces/paste";
import ReactTimeAgo from "react-time-ago";
import React, { useRef, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { isMobile } from "react-device-detect";
import "./Paste.scss";

interface PasteProps {
	paste: IPaste;
	ref?: (paste: IPaste) => void;
}

const Paste = React.forwardRef<HTMLDivElement, PasteProps>(({ paste }, ref) => {
	const [showContent, setShowContent] = useState(false);
	const contentRef = useRef<HTMLDivElement>(null);

	const { title, content, author, date, tags } = paste;

	const pasteBody = (
		<>
			<div className="header" onClick={() => isMobile && setShowContent(!showContent)}>
				<div className="title">{title}</div>
				<div className="info">
					<span className="author">{author}</span>
					<span className="time-ago">
						<ReactTimeAgo date={new Date(date)} />
					</span>
					<span className="expand" onClick={() => setShowContent(!showContent)}>
						{showContent ? <FaMinus /> : <FaPlus />}
					</span>
				</div>
			</div>
			{tags.length > 0 && (
				<div className="tags">
					{tags.map((tag) => (
						<span className="tag" key={tag}>
							{tag}
						</span>
					))}
				</div>
			)}
			<div
				ref={contentRef}
				className={`content ${showContent ? "open" : ""}`}
				style={showContent ? { height: contentRef.current!.scrollHeight + "px" } : { height: "0px" }}
			>
				{content}
			</div>
		</>
	);

	return ref ? (
		<div ref={ref} className="paste">
			{pasteBody}
		</div>
	) : (
		<div className="paste">{pasteBody}</div>
	);
});

Paste.displayName = "Paste";

export default Paste;
