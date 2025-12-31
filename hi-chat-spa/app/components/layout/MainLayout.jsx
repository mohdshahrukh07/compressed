import Sidebar from "./Sidebar";

export default function MainLayout({ children }) {
  return (
    <div className="flex h-screen bg-secondary text-white">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Right Content */}
      <div className="flex flex-col flex-1">
        {children}
      </div>
    </div>
  );
}
