import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AsideBar from "./AsideBar";

export default function Home() {
  return (
    <div className="w-full h-screen flex flex-row">
      <aside>
        <div>
          <AsideBar/>
        </div>
      </aside>
    </div>
  );
}
