import { z } from "zod";

export const chatSchema = z.object({
	id: z.string({
		description: "The chat's id",
		required_error: "id is required",
		invalid_type_error: "id must be a string",
	}),
	content: z.string({
		description: "The chat's content",
		required_error: "content is required",
		invalid_type_error: "content must be a string",
	}),
	author: z.string({
		description: "The chat's author",
		required_error: "author is required",
		invalid_type_error: "author must be a string",
	}),
});

export const chatsSchema = z.array(chatSchema);

// * 型定義
export type Chat = z.infer<typeof chatSchema>;
