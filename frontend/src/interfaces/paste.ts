export interface IPaste {
	_id: string;
	title: string;
	content: string;
	author: string;
	date: string;
	tags: string[];
}

export interface ICompactPaste {
	title: string;
	author: string;
	tags: string[];
}
