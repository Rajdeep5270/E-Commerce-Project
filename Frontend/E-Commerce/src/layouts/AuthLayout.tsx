import { Outlet } from 'react-router'

export default function AuthLayout() {
    return <>

        <div className="min-h-screen w-full flex flex-col md:flex-row font-sans bg-zinc-50 antialiased">

            {/* LEFT SIDE: Admin Gateway Control Panel (Hidden on mobile, flex on desktop) */}
            <div className="hidden md:flex md:w-[40%] bg-slate-900 flex-col justify-between p-8 md:p-12 lg:p-16 text-white relative">

                {/* Technical grid overlay layout for data/dashboard atmosphere */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-size-[3rem_3rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-70"></div>

                {/* System Identity & Admin Tag */}
                <div className="flex items-center justify-between z-10 w-full">
                    <div className="flex items-center gap-2.5">
                        <div className="h-7 w-7 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-xs tracking-wider shadow-sm shadow-indigo-500/20">
                            A
                        </div>
                        <span className="text-xl font-bold tracking-tight text-zinc-100">
                            Aura<span className="text-indigo-400 font-medium">Core</span>
                        </span>
                    </div>
                    {/* Admin Clear Badge Label */}
                    <span className="text-[10px] font-bold tracking-widest uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-md">
                        HQ Portal
                    </span>
                </div>

                {/* Value Proposition / Admin Scope */}
                <div className="my-auto max-w-sm z-10 space-y-5">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700/50 text-xs font-medium text-emerald-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        All Systems Operational
                    </div>
                    <h1 className="text-3xl font-semibold tracking-tight text-white leading-tight">
                        Platform Control & Core Management
                    </h1>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        Authorized personnel checkpoint. Access real-time multi-vendor e-commerce logistics, audit security logs, monitor server clusters, and update global configuration arrays.
                    </p>
                </div>

                {/* Professional Trust & Versioning Footer */}
                <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 text-xs text-slate-500 z-10 pt-6 border-t border-slate-800/60">
                    <div>v4.12.0-stable</div>
                    <div className="flex gap-4">
                        <a href="#logs" className="hover:text-slate-300 transition-colors">Security Audit</a>
                        <a href="#help" className="hover:text-slate-300 transition-colors">IT Support</a>
                    </div>
                </div>
            </div>


            {/* RIGHT SIDE: High-Security Admin Authentication Form */}
            {/* Added 'min-h-screen' or layout adaptation to guarantee strict vertical centering on mobile viewports */}
            <div className="w-full md:w-[60%] min-h-screen md:min-h-0 flex items-center justify-center p-6 sm:p-8 md:p-16 bg-white">
                <div className="w-full max-w-md space-y-8 my-auto">

                    <Outlet />

                </div>
            </div>

        </div>
    </>
}
