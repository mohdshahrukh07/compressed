"use client";
import { useSearchParams,useRouter } from "next/navigation";
import Image from "next/image";
import logo from "../../assets/logo.png";
import { FaComments, FaRegComments } from "react-icons/fa";
import { HiOutlineUsers } from "react-icons/hi2";
import { HiMiniUsers } from "react-icons/hi2";
import { IoMdNotifications, IoMdNotificationsOutline } from "react-icons/io";
import { IoSettings, IoSettingsOutline } from "react-icons/io5";
import { BiLogOut, BiPhoneCall, BiSolidPhoneCall } from "react-icons/bi";
import { MdOutlineDarkMode } from "react-icons/md";
import { useState } from "react";

export default function Sidebar() {

  const menus = [
    {
      name: "Chats",
      path: "/",
      icon: <FaRegComments size={25} />,                // default
      hoverIcon: <FaComments size={25} />,       // hover
      activeIcon: <FaComments size={25} />       // active
    },
    {
      name: "Users",
      path: "users",
      icon: <HiOutlineUsers size={25} />,
      hoverIcon: <HiMiniUsers size={25} />,
      activeIcon: <HiMiniUsers size={25} />
    },
    {
      name: "Notification",
      path: "notification",
      icon: <IoMdNotificationsOutline size={25} />,
      hoverIcon: <IoMdNotifications size={25} />,
      activeIcon: <IoMdNotifications size={25} />
    },
    {
      name: "Profile",
      path: "profile",
      icon: <BiPhoneCall size={25} />,
      hoverIcon: <BiSolidPhoneCall size={25} />,
      activeIcon: <BiSolidPhoneCall size={25} />
    },
    {
      name: "Settings",
      path: "settings",
      icon: <IoSettingsOutline size={25} />,
      hoverIcon: <IoSettings size={25} />,
      activeIcon: <IoSettings size={25} />
    },
  ];

  const [hovered, setHovered] = useState(null);
  const router = useRouter();
  const [url,setUrl] = useState("/");
    function changePage(p) {
      if(p != "/"){
       setUrl(`/?page=${p}`);    
      } else {
        router.replace("/", { scroll: false });
        return;
      }
    router.push(url, { scrol: false }); // ⬅ shallow routing
  }
  
  const page =  useSearchParams().get("page") || "/"; // default
  return (
    <div className="relative w-25 bg-[var(--primary)] flex flex-col justify-start items-center">

      {/* Logo */}
      <div className="w-25 h-30 border-b-1 border-[var(--primary-light)] py-5 mb-6">
        <Image src={logo} sizes="w-full" alt="logo" />
      </div>

      {/* MAIN MENU */}
      <div className="flex flex-col gap-5">
        {menus.map((item) => {
          const isActive = page === item.path;

          return (
            <button key={item.path}  onClick={() => changePage(item.path)}>
              <div
                onMouseEnter={() => setHovered(item.path)}
                onMouseLeave={() => setHovered(null)}
                className={`
          relative group w-25 h-15 cursor-pointer flex justify-center items-center bg-[var(--primary)] overflow-hidden
          ${isActive ? "activeMenu" : ""}
        `}
              >

                {/* LEFT BAR */}
                <div
                  className={`
            absolute left-0 w-2 h-15 bg-[var(--secondary)] z-10
            transition duration-300
            ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
          `}
                ></div>

                {/* BG HIGHLIGHT */}
                <div
                  className={`
            absolute left-0 h-15 bg-[var(--secondary)] opacity-25 transition-all duration-500
            ${isActive ? "w-full" : "w-0 group-hover:w-full"}
          `}
                ></div>

                {
                  isActive
                    ? item.activeIcon
                    : hovered === item.path
                      ? item.hoverIcon
                      : item.icon
                }

              </div>
            </button>
          );
        })}
      </div>

      {/* BOTTOM MENU */}
      <div className="absolute bottom-25 flex flex-col gap-5">
        {/* Example item */}
        <div className="relative group w-25 h-15 flex justify-center items-center bg-[var(--primary)] overflow-hidden">
          <div className="absolute left-0 w-2 h-15 opacity-0 bg-[var(--secondary)] transition duration-300 group-hover:opacity-100"></div>
          <div className="absolute left-0 w-0 h-15 bg-[var(--secondary)] opacity-25 transition-all duration-500 group-hover:w-full"></div>
          <MdOutlineDarkMode size={25}  />
        </div>

        {/* Avatar */}
        <div className="relative group w-25 h-15 flex justify-center items-center bg-[var(--primary)] overflow-hidden">
          <div className="absolute left-0 w-2 h-15 opacity-0 bg-[var(--secondary)] transition duration-300 group-hover:opacity-100"></div>
          <div className="absolute left-0 w-0 h-15 bg-[var(--secondary)] opacity-25 transition-all duration-500 group-hover:w-full"></div>
          <BiLogOut size={25} />
        </div>
      </div>

    </div>
  );
}
