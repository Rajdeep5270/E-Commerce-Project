import { useNavigate } from "react-router";
import { allRoutes } from "../../router/routes";

export default function DashboardPage() {
    const navigate = useNavigate();

    const handleLogOut = () => {
        localStorage.removeItem('adminToken');

        navigate(allRoutes.login, { replace: true });
    };

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Top Stat Bar / Telemetry Welcomer */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-5 border-b border-slate-200">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">System Dashboard</h1>
                    <p className="text-sm text-slate-500 mt-0.5">
                        Welcome back. Operational telemetry and administration access matrix are fully nominal.
                    </p>
                </div>

                {/* Micro Actions Container */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleLogOut}
                        className="px-3.5 py-2 bg-white hover:bg-red-50 text-slate-700 hover:text-red-600 border border-slate-200 hover:border-red-200 rounded-lg text-xs font-semibold shadow-sm transition-all duration-150 flex items-center gap-2 cursor-pointer focus:outline-none"
                    >
                        <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                        </svg>
                        Terminal Logout
                    </button>
                </div>
            </div>

            {/* Quick Metrics Cards Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {/* Metric 1 */}
                <div className="bg-white p-5 border border-slate-200 rounded-xl shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Administrative Nodes</span>
                        <span className="p-1 bg-emerald-50 text-emerald-600 rounded text-[10px] font-bold">LIVE</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-slate-900 font-mono">04</span>
                        <span className="text-xs text-slate-400">/ 04 active</span>
                    </div>
                </div>

                {/* Metric 2 */}
                <div className="bg-white p-5 border border-slate-200 rounded-xl shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Telemetry API Status</span>
                        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-slate-900 font-mono">99.98%</span>
                        <span className="text-xs text-slate-400">Uptime validation</span>
                    </div>
                </div>

                {/* Metric 3 */}
                <div className="bg-white p-5 border border-slate-200 rounded-xl shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Platform Operations</span>
                        <span className="p-1 bg-indigo-50 text-indigo-600 rounded text-[10px] font-bold">SECURE</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-slate-900 font-mono">No Alerts</span>
                        <span className="text-xs text-slate-400">0 critical blocks</span>
                    </div>
                </div>
            </div>

            {/* Placeholder System Content Canvas */}
            <div className="border-2 border-dashed border-slate-200 rounded-2xl h-96 bg-white flex flex-col items-center justify-center text-center p-6">
                <div className="w-12 h-12 bg-slate-50 border border-slate-200 text-slate-400 rounded-xl flex items-center justify-center mb-3">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                    </svg>
                </div>
                <h3 className="text-sm font-semibold text-slate-800">Operational Grid Area</h3>
                <p className="text-xs text-slate-400 max-w-sm mt-1">
                    Select nested routes like "Add Admin" or "View Admin" from the sidebar navigation tree to modify system objects.
                </p>
            </div>
        </div>
    );
}