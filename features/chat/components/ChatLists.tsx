"use client";

import type { Chat } from "@/app/schema/chat.shema";
import { ChatMessage } from ".";

type Props = {
	/**
	 * チャットデータ
	 */
	chatData: Chat[];
};

export default function ChatLists({ chatData }: Props) {
	return (
		<div className="w-full h-full flex flex-col gap-4">
			{chatData.map((chat, index) => {
				return <ChatMessage key={`chat-${index}`} chat={chat} />;
			})}
		</div>
	);
}
