import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AsideBar from "@/components/Modals/AsideBar";
import ContentMain from "@/components/Modals/ContentMain";

export default function Home() {
  return (
    <div className="w-full h-screen flex flex-row">
      <aside >
          <AsideBar/>
      </aside>
      <ContentMain/>
    </div>
  );
}
