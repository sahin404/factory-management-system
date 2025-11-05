import Sidebar from "@/components/Sidebar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex gap-8">
      {/* Sidebar */}
      <div className="w-1/6 sticky top-0 h-screen">
        <Sidebar></Sidebar>
      </div>

      {/* children */}
      <div className="w-5/6 p-5">{children}</div>
    </div>
  );
};

export default layout;
