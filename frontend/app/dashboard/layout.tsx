import Sidebar from "@/components/Sidebar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {/* Sidebar */}
      <div>
        <Sidebar></Sidebar>
      </div>

      {/* children */}
      <div>{children}</div>
    </div>
  );
};

export default layout;
