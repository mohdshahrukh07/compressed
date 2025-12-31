import ChatMenu from "./ChatMenu";
import UsersMenu from "./UsersMenu";
import { useSearchParams, useRouter } from "next/navigation";
export default function MenuList({ activePage }) {
  const router = useRouter();
  const searchParams = useSearchParams();

    const page = searchParams.get("page") || "/"; // default
  return (
    <>
      {page === "/" && <ChatMenu />}
      {page === "users" && <UsersMenu />}
      {page === "notification" && <p className="text-xl">Notifications Menu</p>}
      {page === "calls" && <p className="text-xl">Calls Menu</p>}
      {page === "setting" && <p className="text-xl">Settings Menu</p>}
    </>
  )
}