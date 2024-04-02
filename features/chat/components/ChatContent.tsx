"use client";

import { Input } from "@/app/components/shadcn/ui/input";
import type { Chat } from "@/app/schema/chat.shema";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { ChatMessage } from ".";

type Props = {
	/**
	 * チャットデータ
	 */
	chatData: Chat[];
};

export default function ChatContent({ chatData }: Props) {
	const [message, setMessage] = useState("");
	const [chats, setChats] = useState<Chat[]>(chatData);
	const [socket, setSocket] = useState<any>(null);

	const sendMessage = async () => {
		console.log("メッセージ送信", message);
		try {
			setMessage("");
			socket.emit("client_message", message);
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

	useEffect(() => {
		const socket = io({
			path: "/api/socket/io",
		});

		socket.on("connect", () => {
			console.log("接続しました。");
			setSocket(socket);
		});

		// サーバーからメッセージ受信時の処理
		socket.on("server_message", (newMessage: Chat) => {
			console.log("メッセージ受信:", newMessage);
			// 新しいメッセージをチャットリストに追加
			setChats((prevChats) => [...prevChats, newMessage]);
		});

		return () => {
			socket.off("connect");
			socket.off("server_message");
			socket.disconnect();
		};
	}, []);

	return (
		<div className="flex flex-col w-full h-full gap-8">
			<div className="w-full flex mb-4">
				<Input type="text" value={message} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)} onKeyDown={handleKeyDown} />
			</div>
			<div className="w-full h-full flex flex-col gap-4">
				{chats.map((chat, index) => {
					return <ChatMessage key={`chat-${index}`} chat={chat} />;
				})}
			</div>
		</div>
	);
}
