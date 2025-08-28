import { Outlet } from "react-router";
import { CustomMenu } from "./CustomMenu";

export const HeroesLayout = () => {
  return (
    // <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
    // <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-50 to-blue-50">
    <div className="min-h-screen bg-gradient-to-br from-red-500 via-white to-blue-500">
      <div className="max-w-7xl mx-auto p-6">
        <CustomMenu />
        <Outlet />
      </div>
    </div>
  );
};
