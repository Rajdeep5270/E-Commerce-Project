import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

export default function MainLayout() {
    return (
        <div className="min-h-screen bg-slate-50 flex font-sans antialiased text-slate-900">
            {/* Sidebar Fixed Structure Column */}
            <Sidebar />

            {/* Core Right Screen Panel Shell Container */}
            <div className="flex-1 pl-64 flex flex-col min-h-screen">

                {/* Main Dynamic View Content Panel Box */}
                {/* Added 'pt-8' for a clean, premium top padding since there is no header */}
                <main className="flex-1 p-6 pt-8 max-w-[1600px] w-full mx-auto">
                    {/* Active Route page data dumps here inside the layout */}
                    <Outlet />
                </main>

                {/* Core Footer Element Block */}
                <Footer />
            </div>
        </div>
    );
}