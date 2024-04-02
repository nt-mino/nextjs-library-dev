import type { Server as HttpServer } from "http";
import type { Socket as NetSocket } from "net";
import type { NextApiRequest, NextApiResponse } from "next";
import type { Server as IOServer, Socket } from "socket.io";
import { Server } from "socket.io";

// * NextApiResponseの型を拡張してSocket.ioのサーバーの型定義
export type NextApiResponseServerIo = NextApiResponse & {
	socket: NetSocket & {
		server: HttpServer & {
			io?: IOServer;
		};
	};
};

export default function ioHandler(req: NextApiRequest, res: NextApiResponseServerIo) {
	if (!res.socket.server.io) {
		const path = "/api/socket/io";
		const io = new Server(res.socket.server, {
			path: path,
			// maxHttpBufferSize: 1 * 1024 * 1024, // 1MB
		});
		io.on("connection", (socket) => {
			console.log("クライアントが接続しました。");

			socket.on("client_message", (message) => {
				console.log("メッセージ受信:", message);
				// 受信したメッセージを全クライアントにブロードキャスト
				io.emit("server_message", {
					id: "90e76e1d-77e8-4496-878a-ca1cfe4fdc56",
					content: message,
					author: "minoru noto",
				});
			});

			socket.on("disconnect", () => {
				console.log("クライアントが切断しました。");
			});
		});
		res.socket.server.io = io;
	}
	res.end();
}
