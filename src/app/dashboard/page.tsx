import { users } from "@/data/users";
import { usersSchema } from "@/schema/user.schema";

async function getUser() {
  const response = users; // * APIからデータを取得する想定
  const parsed = usersSchema.safeParse(response);
  console.log(parsed);
  if (!parsed.success) throw new Error(parsed.error.errors[0].message);

  return parsed.data;
}

export default async function Page() {
  const users = await getUser();
  console.log("users:", users);

  return (
    <div>
      <h1>ダッシュボードページ</h1>
    </div>
  );
}
