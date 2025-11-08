import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Separator } from "@/components/ui/separator";
import { checkUser } from "@/lib/checkUserServerConfig";
import { redirect } from "next/navigation";

const layout = async ({ children }: { children: React.ReactNode }) => {
  // if user is not loggedIn then automatic return to
  // login page
  const user = await checkUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex gap-8">
      {/* Sidebar */}
      <div className="w-1/6 sticky top-0 h-screen">
        <Sidebar></Sidebar>
      </div>
      <div  className="flex-1 p-5">
        {/* Navbar */}
        <div className="pr-5"> <Navbar></Navbar></div>
              <Separator></Separator>
        {/* children */}
        <div className="p-5 bg-green-400">{children}</div>
      </div>
    </div>
  );
};

export default layout;
