import Sidebar from "../components/navigation/Sidebar";
import MobileNavbar from "../components/navigation/MobileNavbar";
import Logo from "../components/common/Logo";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <div className="md:hidden flex items-center px-4 py-3 bg-surface-container-lowest border-b border-outline-variant/30">
                    <Logo size={24} className="text-primary" />
                </div>
                <div className="flex-1 overflow-y-auto pb-16 md:pb-0">
                    <Outlet />
                </div>
            </div>
            <MobileNavbar />
        </div>
    );
}

export default MainLayout