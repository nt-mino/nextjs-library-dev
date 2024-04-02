"use client";

import { Input } from "@/app/components/shadcn/ui/input";
import { useState } from "react";
import { io } from "socket.io-client";

export default function ChatForm() {
	const [message, setMessage] = useState("");

	const sendMessage = async () => {
		console.log("メッセージ送信", message);
		try {
			const socket = io({
				path: "/api/socket/io",
			});
			socket.connect();

			socket.on("connect", () => {
				console.log("接続しました。");
				socket.emit("message", message);
			});

			socket.on("message", (message) => {
				console.log("メッセージ受信:", message);
			});

			socket.on("disconnect", () => {
				console.log("切断しました。");
				socket.disconnect();
			});
		} catch (error) {
			console.log(error);
		}
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter" && message.trim() !== "") {
			event.preventDefault();
			sendMessage();
		}
	};

	return (
		<div className="w-full flex mb-4">
			<Input type="text" value={message} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)} onKeyDown={handleKeyDown} />
		</div>
	);
}
