"use client";
import { useState } from "react";
// import "../css/customStyle.css"s
export default function Menu() {
  const [selectedUser, setSelectedUser] = useState(null);

  const users = [
    { id: 1, name: 'Josephin water', status: 'Typing...', time: '22/10/24', avatar: '👨', online: true },
    { id: 2, name: 'Mari', status: 'This is nice, i love it ❤️', time: 'JUST NOW', avatar: '👩', online: true },
    { id: 3, name: 'Lea', status: 'What are you doing...', time: '22/10/24', avatar: '👩', online: true },
    { id: 4, name: 'Kristin Watson', status: 'Okay! I will try it 😀', time: 'Yesterday', avatar: '👨', online: false },
    { id: 5, name: '15 Rocks', status: '', time: '18/08/2024', avatar: '👤', online: false },
    { id: 6, name: 'Josephin water', status: 'Typing...', time: '22/10/24', avatar: '👨', online: true },
    { id: 7, name: 'Mari', status: 'This is nice, i love it ❤️', time: 'JUST NOW', avatar: '👩', online: true },
    { id: 8, name: 'Lea', status: 'What are you doing...', time: '22/10/24', avatar: '👩', online: true },
    { id: 9, name: 'Kristin Watson', status: 'Okay! I will try it 😀', time: 'Yesterday', avatar: '👨', online: false },
    { id: 10, name: '15 Rocks', status: '', time: '18/08/2024', avatar: '👤', online: false },
    { id: 11, name: 'Josephin water', status: 'Typing...', time: '22/10/24', avatar: '👨', online: true },
    { id: 12, name: 'Mari', status: 'This is nice, i love it ❤️', time: 'JUST NOW', avatar: '👩', online: true },
    { id: 13, name: 'Lea', status: 'What are you doing...', time: '22/10/24', avatar: '👩', online: true },
    { id: 14, name: 'Kristin Watson', status: 'Okay! I will try it 😀', time: 'Yesterday', avatar: '👨', online: false },
    { id: 15, name: '15 Rocks', status: '', time: '18/08/2024', avatar: '👤', online: false },
    { id: 16, name: 'Josephin water', status: 'Typing...', time: '22/10/24', avatar: '👨', online: true },
    { id: 17, name: 'Mari', status: 'This is nice, i love it ❤️', time: 'JUST NOW', avatar: '👩', online: true },
    { id: 18, name: 'Lea', status: 'What are you doing...', time: '22/10/24', avatar: '👩', online: true },
    { id: 19, name: 'Kristin Watson', status: 'Okay! I will try it 😀', time: 'Yesterday', avatar: '👨', online: false },
    { id: 20, name: '15 Rocks', status: '', time: '18/08/2024', avatar: '👤', online: false },
    { id: 21, name: 'Josephin water', status: 'Typing...', time: '22/10/24', avatar: '👨', online: true },
    { id: 22, name: 'Mari', status: 'This is nice, i love it ❤️', time: 'JUST NOW', avatar: '👩', online: true },
    { id: 23, name: 'Lea', status: 'What are you doing...', time: '22/10/24', avatar: '👩', online: true },
    { id: 24, name: 'Kristin Watson', status: 'Okay! I will try it 😀', time: 'Yesterday', avatar: '👨', online: false },
    { id: 25, name: '15 Rocks', status: '', time: '18/08/2024', avatar: '👤', online: false }
  ];

  return (
    <div className="flex-1 max-h-[calc(100%-120px)] overflow-y-auto
  [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-blue-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
      {users.map((user) => (
        <div
          key={user.id}
          onClick={() => setSelectedUser(user.id)}
          className={`p-4 border-b transition-colors cursor-pointer 
            ${selectedUser === user.id ? "bg-[var(--primary-light)]" : "hover:bg-[var(--secondary-dark)]"}`}
        >
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-2xl">
                {user.avatar}
              </div>

              {user.online && (
                <div className="w-3 h-3 bg-green-500 rounded-full absolute bottom-0 right-0 border-2 border-white"></div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-gray-800 truncate">{user.name}</h4>
                <span className="text-xs text-gray-500">{user.time}</span>
              </div>
              <p className="text-sm text-gray-500 truncate">{user.status}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
