// app/mydrive/layout.tsx

import MyDriveHeader from "@/components/ui/MyDriveHeader";
import SidebarMenu from "@/components/ui/SidebarMenu"

export default function MyDriveLayout({ children }) {
  return (
    <div className="flex">
      <SidebarMenu />
      <div className="flex-1 flex flex-col min-h-screen  md:ml-20  transition-all duration-300">
        <MyDriveHeader   username="Aman" /> {/* Pass username dynamically if needed */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
