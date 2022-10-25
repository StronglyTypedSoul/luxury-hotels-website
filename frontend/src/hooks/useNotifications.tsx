import { useEffect, useState } from "react";
import { ICompactPaste } from "../interfaces/paste";
import useSocket from "./useSocket";

const useNotifications = () => {
	const socket = useSocket();
	const [notifications, setNotifications] = useState<string[]>([]);

	useEffect(() => {
		socket.on("new_pastes", (pastes: ICompactPaste[]) => {
			const pastesCount = pastes.length;
			if (pastesCount === 0) return;
			let newNotification = `${pastesCount} new paste${pastesCount > 1 ? "s were" : " was"} scraped while you were offline.`;
			const watchedTagsMessages = getWatchedTagsMessages(pastes);
			newNotification += watchedTagsMessages;
			setNotifications((prevNotifications) => [newNotification, ...prevNotifications]);
		});
		socket.on("scraping_done", (msg: { error: boolean; pastes: ICompactPaste[] }) => {
			let newNotification = "";
			if (msg.error) {
				newNotification = "Scraping process failed.";
			} else {
				newNotification = "Scraping process succeeded.\n";
				const pastesCount = msg.pastes.length;
				if (pastesCount > 0) {
					newNotification += `${pastesCount} new paste${pastesCount > 1 ? "s were" : " was"} scraped.`;
					const watchedTagsMessages = getWatchedTagsMessages(msg.pastes);
					newNotification += watchedTagsMessages;
				} else {
					newNotification += "No new pastes were scraped.";
				}
			}
			setNotifications((prevNotifications) => [newNotification, ...prevNotifications]);
		});
		return () => {
			socket.off("new_pastes");
			socket.off("scraping_done");
		};
	}, []);

	const getWatchedTagsMessages = (pastes: ICompactPaste[]) => {
		let watchedTags: string[];
		try {
			if (!localStorage.getItem("watchedTags")) throw new Error();
			watchedTags = JSON.parse(localStorage.getItem("watchedTags")!);
			if (!Array.isArray(watchedTags)) throw new Error();
		} catch (err) {
			watchedTags = [];
		}
		const receivedWatchedTags: { [key: string]: number } = {};
		if (watchedTags.length > 0) {
			pastes.forEach(({ tags }) => {
				tags.forEach((tag) => {
					if (!watchedTags.includes(tag)) return;
					if (receivedWatchedTags[tag]) receivedWatchedTags[tag]++;
					else receivedWatchedTags[tag] = 1;
				});
			});
		}
		let messages = "";
		if (pastes.length === 1) {
			messages += `\nIt's about ${Object.keys(receivedWatchedTags).join(", ")}.`;
		} else {
			for (const tag in receivedWatchedTags) {
				messages += `\n${receivedWatchedTags[tag]} of them is about ${tag}.`;
			}
		}
		return messages;
	};

	return [notifications, setNotifications] as const;
};

export default useNotifications;
