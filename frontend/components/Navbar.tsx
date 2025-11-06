import { checkUser } from "@/lib/checkUserServerConfig";
import NavbarRightPart from "./NavbarRightPart";

const Navbar = async () => {
  const user = await checkUser();
  if (!user) return;
  return (
    <div className="flex items-center justify-between shadow-md p-2">
      <h1 className="text-3xl font-semibold uppercase">
        {user.role} Dashboard
      </h1>
      <div>
        <NavbarRightPart name={user.name} image={user.image}></NavbarRightPart>
      </div>
    </div>
  );
};

export default Navbar;
