import { useState } from "react";
import { NavLink, useLocation } from "react-router";
import { allRoutes } from "../router/routes";

export default function Sidebar() {
    const location = useLocation();

    // Dropdown toggle state control panel
    const [isAdminOpen, setIsAdminOpen] = useState(false);

    // Check karne ke liye ki kya koi child admin route active hai
    const isAdminChildActive = location.pathname.startsWith("/admin");

    return (
        <aside className="w-64 h-screen bg-slate-900 border-r border-slate-800 flex flex-col justify-between fixed top-0 left-0 z-40 select-none">
            {/* Brand Logo Header Block */}
            <div>
                <div className="h-16 flex items-center px-6 border-b border-slate-800">
                    <div className="text-lg font-bold text-slate-100 tracking-tight">
                        Aura<span className="text-indigo-500 font-normal">Core</span>
                        <span className="text-[9px] ml-2 px-1.5 py-0.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-semibold uppercase rounded">v2.1</span>
                    </div>
                </div>

                {/* Sidebar Navigation Links List */}
                <nav className="p-4 space-y-1">

                    {/* Link 1: Control Dashboard */}
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group ${isActive
                                ? "bg-indigo-600 text-white shadow-sm"
                                : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-100"
                            }`
                        }
                    >
                        <svg
                            className="w-4 h-4 flex-shrink-0 transition-colors text-current"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                        <span>Control Dashboard</span>
                    </NavLink>

                    {/* Dropdown Container Block: Admin */}
                    <div className="space-y-1">
                        {/* Parent Toggle Trigger Button */}
                        <button
                            type="button"
                            onClick={() => setIsAdminOpen(!isAdminOpen)}
                            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group cursor-pointer focus:outline-none ${isAdminChildActive
                                ? "text-indigo-400 bg-slate-800/40"
                                : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-100"
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <svg
                                    className="w-4 h-4 flex-shrink-0 text-current"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                </svg>
                                <span>Admin Panel</span>
                            </div>

                            {/* Adaptive Micro Chevron Arrow */}
                            <svg
                                className={`w-3.5 h-3.5 transition-transform duration-200 text-slate-500 group-hover:text-slate-300 ${isAdminOpen || isAdminChildActive ? "rotate-180" : ""
                                    }`}
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                        </button>

                        {/* Dropdown Child Nested Links Loop */}
                        {(isAdminOpen || isAdminChildActive) && (
                            <div className="pl-9 space-y-1 mt-1 border-l border-slate-800/80 ml-5 animate-slide-down">
                                {/* Sub-Link 1: Add Admin Credentials */}
                                <NavLink
                                    to={`${allRoutes.dashboard}/${allRoutes.add_admin}`}
                                    className={({ isActive }) =>
                                        `block py-2 px-3 text-xs font-medium rounded-md transition-colors ${isActive
                                            ? "text-indigo-400 font-semibold bg-indigo-500/5"
                                            : "text-slate-400 hover:text-slate-200"
                                        }`
                                    }
                                >
                                    Add Admin
                                </NavLink>

                                {/* Sub-Link 2: View Admins Registry */}
                                <NavLink
                                    to="/admin/view"
                                    className={({ isActive }) =>
                                        `block py-2 px-3 text-xs font-medium rounded-md transition-colors ${isActive
                                            ? "text-indigo-400 font-semibold bg-indigo-500/5"
                                            : "text-slate-400 hover:text-slate-200"
                                        }`
                                    }
                                >
                                    View Admin
                                </NavLink>
                            </div>
                        )}
                    </div>

                </nav>
            </div>

            {/* Bottom Profile Identity Block */}
            <div className="p-4 border-t border-slate-800 bg-slate-950/40">
                <div className="flex items-center gap-3 px-2 py-1.5">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-xs font-bold text-white shadow-sm">
                        AD
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold text-slate-200 truncate">Admin Terminal</div>
                        <div className="text-[10px] text-slate-500 truncate font-mono">root@auracore.io</div>
                    </div>
                </div>
            </div>
        </aside>
    );
}