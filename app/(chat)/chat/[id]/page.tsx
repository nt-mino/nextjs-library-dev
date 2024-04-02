import { chats } from "@/app/data/chats";
import { chatsSchema } from "@/app/schema/chat.shema";
import { ChatForm, ChatLists } from "@/features/chat/components";
import ChatContent from "@/features/chat/components/ChatContent";

async function getChatData() {
	const response = chats; // * APIからデータを取得する想定
	const parsed = chatsSchema.safeParse(response);
	if (!parsed.success) throw new Error(parsed.error.errors[0].message);

	return parsed.data;
}

export default async function Page() {
	const chatData = await getChatData();
	console.log(chatData);
	return (
		<div className="w-full h-screen py-8">
			<div className="max-w-[500px] w-full mx-auto">
				<div className="w-full text-center mb-4">
					<h1 className="text-[19px] tracking-[6px]">チャットスペース</h1>
				</div>
				{/* <ChatContent chatData={chatData} /> */}
				<div className="flex flex-col w-full h-full gap-8">
					{/* <ChatForm /> */}
					{/* <ChatLists chatData={chatData} /> */}
				</div>
			</div>
		</div>
	);
}
