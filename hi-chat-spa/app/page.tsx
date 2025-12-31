"use client";
import { AuthProvider } from "./lib/useAuth";
import MainLayout from "./components/layout/MainLayout";
import MenuList from "./components/pages/Menulist";
import { usePathname } from "next/navigation";
import ChatWindow from "./components/pages/ChatWindow";
export default function Home() {

  const pathname = usePathname();
  return (
    <>
      <MainLayout>
        <div className="flex h-full">

          {/* Small Side Panel */}
          <div className="w-105">
            <MenuList activePage={pathname} />
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-[var(--primary-light)]">
            <ChatWindow />
          </div>

        </div>
      </MainLayout>
    </>
  );
}
