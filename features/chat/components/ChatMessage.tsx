import type { Chat } from "@/app/schema/chat.shema";

type Props = {
	/**
	 * チャットデータ
	 */
	chat: Chat;
};

export default function ChatMessage({ chat }: Props) {
	return (
		<div className="flex flex-col w-full border px-4 py-4 rounded-sm">
			<p className="text-[14px] text-gray-600 mb-2">{chat.content}</p>
			<p className="text-[12px]">{chat.author}</p>
		</div>
	);
}
