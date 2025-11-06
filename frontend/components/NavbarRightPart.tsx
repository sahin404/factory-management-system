import { LogOut, Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ThemeSwitch } from "./ui/theme-switch";
import { Separator } from "./ui/separator";

const NavbarRightPart = ({ name, image }: { name: string; image: string }) => {
  return (
    <div className="flex items-center gap-3">
      {/* dark mood */}
      <div>
        <ThemeSwitch
          modes={["light", "dark"]}
          icons={[
            <Sun key="sun-icon" size={16} />,
            <Moon key="moon-icon" size={16} />,
          ]}
          showInactiveIcons="none"
        />
      </div>
      {/* Name and Avatar */}
      <div className="flex items-center justify-end gap-3 p-2 rounded-lg ">
        {/* name */}
        <div className="flex flex-col text-right">
          <h1 className="text-md font-semibold text-gray-900 dark:text-gray-100 uppercase">
            {name}
          </h1>
          <span className="text-sm text-green-500 dark:text-green-400 font-medium">
            Online
          </span>
        </div>

        {/* Avatar on the right */}
        <div className="w-12 h-12 relative">
          <Avatar className="w-full h-full" variant="close-friends">
            <AvatarImage
              src={image || "/profile-image.png"}
              alt={name}
              className="w-full h-full object-cover"
            />
            <AvatarFallback>PAI</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Logout */}
      <div>
        <Button variant="destructive">
          {" "}
          <LogOut /> Logout
        </Button>
      </div>
    </div>
  );
};

export default NavbarRightPart;
