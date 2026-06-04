export default function Footer() {
    return (
        <footer className="h-12 bg-white border-t border-slate-200/80 px-6 flex items-center justify-between text-[11px] font-medium text-slate-400 select-none">
            {/* Live Infrastructure System Log Status */}
            <div className="flex items-center gap-2">
                <span className="flex h-1.5 w-1.5 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                </span>
                <span className="font-mono uppercase tracking-wider text-slate-500">Cluster Status: Operational</span>
            </div>

            {/* Copyright Framework Meta Links */}
            <div>
                <span>&copy; 2026 AuraCore Logistics Network.</span>
            </div>
        </footer>
    );
}