import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { adminChangePassword } from "../../services/auth/authService";
import { toast } from "react-toastify";
import { allRoutes } from "../../router/routes";

export default function NewPasswordPage() {

    interface passwordType {
        new_password: String,
        conf_password: String
    }

    const [adminPassword, setAdminPassword] = useState<passwordType>({
        new_password: "",
        conf_password: ""
    })

    const navigate = useNavigate();

    const [error, setError] = useState<any>({});

    const [loader, setLoader] = useState<boolean>(false);


    function validation() {
        const error: any = {};

        if (!adminPassword.new_password) error.new_password = "New password is required";

        if (!adminPassword.conf_password) error.conf_password = "Confirm password is required";

        if (adminPassword.new_password !== adminPassword.conf_password) error.conf_password = "New password and confirm password does not matched";

        setError(error);

        return Object.keys(error).length === 0;
    }

    async function onHandleSubmit(e: any) {
        e.preventDefault();

        if (!validation()) return;

        setLoader(true);

        const data = await adminChangePassword(adminPassword.new_password);

        if (data.status === 200) {
            toast.success(data.message);

            // return to login page 
            navigate(allRoutes.login);

            sessionStorage.clear();
        }
        else {
            toast.error(data.message);
        }

        setLoader(false);
    }


    return (
        <div className="w-full max-w-md space-y-8">
            {/* Header Area */}
            <div className="space-y-2.5">
                <div className="text-xs font-bold text-indigo-600 uppercase tracking-widest">
                    Credentials Reset
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                    Set New Password
                </h2>
                <p className="text-sm text-slate-500">
                    Your identity token has been verified. Create a strong, unique administrative password to secure your gateway node.
                </p>
            </div>

            {/* Form Layout */}
            <form onSubmit={onHandleSubmit} className="space-y-5">
                {/* New Password Input Group */}
                <div className="space-y-1.5">
                    <label
                        htmlFor="new_password"
                        className={`text-xs font-semibold uppercase tracking-wider block transition-colors duration-150 ${error.new_password ? "text-red-600" : "text-slate-600"
                            }`}
                    >
                        New Password
                    </label>

                    <div className="relative">
                        <input
                            type="password"
                            name="new_password"
                            id="new_password"
                            onChange={(e) => {
                                setAdminPassword((prev) => ({ ...prev, new_password: e.target.value }));
                            }}
                            placeholder="••••••••••••"
                            className={`w-full px-3.5 py-2.5 bg-white border rounded-lg text-sm text-slate-900 placeholder:text-slate-300 focus:outline-none transition-all shadow-sm font-mono ${error.new_password
                                ? "border-red-500 focus:ring-2 focus:ring-red-600/20 focus:border-red-600"
                                : "border-slate-200 focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600"
                                }`}
                        />
                    </div>

                    {/* Premium Error Validation Alert */}
                    {error.new_password && (
                        <div className="flex items-center gap-1.5 text-[11px] font-medium text-red-600 animate-slide-in mt-1 select-none">
                            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                            </svg>
                            <span>{error.new_password}</span>
                        </div>
                    )}
                </div>

                {/* Confirm Password Input Group */}
                <div className="space-y-1.5">
                    <label
                        htmlFor="conf_password"
                        className={`text-xs font-semibold uppercase tracking-wider block transition-colors duration-150 ${error.conf_password ? "text-red-600" : "text-slate-600"
                            }`}
                    >
                        Confirm Password
                    </label>

                    <div className="relative">
                        <input
                            type="password"
                            name="conf_password"
                            id="conf_password"
                            onChange={(e) => {
                                setAdminPassword((prev) => ({ ...prev, conf_password: e.target.value }));
                            }}
                            placeholder="••••••••••••"
                            className={`w-full px-3.5 py-2.5 bg-white border rounded-lg text-sm text-slate-900 placeholder:text-slate-300 focus:outline-none transition-all shadow-sm font-mono ${error.conf_password
                                ? "border-red-500 focus:ring-2 focus:ring-red-600/20 focus:border-red-600"
                                : "border-slate-200 focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600"
                                }`}
                        />
                    </div>

                    {/* Premium Error Validation Alert */}
                    {error.conf_password && (
                        <div className="flex items-center gap-1.5 text-[11px] font-medium text-red-600 animate-slide-in mt-1 select-none">
                            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                            </svg>
                            <span>{error.conf_password}</span>
                        </div>
                    )}
                </div>

                {/* Submit Action Button with Premium Loader Design */}
                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={loader}
                        className={`w-full py-2.5 px-4 text-sm font-medium rounded-lg shadow-sm font-sans transition-all duration-150 flex items-center justify-center gap-2 select-none ${loader
                            ? "bg-slate-800 text-slate-400 cursor-not-allowed"
                            : "bg-slate-900 hover:bg-slate-800 text-white hover:shadow active:bg-slate-950 cursor-pointer"
                            }`}
                    >
                        {loader ? (
                            <>
                                {/* Embedded SVG Infinite Spinner */}
                                <svg
                                    className="animate-spin h-4 w-4 text-indigo-400 flex-shrink-0"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="3.5"
                                    />
                                    <path
                                        className="opacity-100"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    />
                                </svg>
                                <span>Updating Credentials...</span>
                            </>
                        ) : (
                            <span>Update Master Credentials</span>
                        )}
                    </button>
                </div>

                {/* Secondary Action Link */}
                <div className="text-center pt-2">
                    <Link
                        to={allRoutes.login}
                        className="text-xs font-semibold text-slate-400 hover:text-slate-700 transition-colors inline-flex items-center gap-1"
                    >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                        Back to Login Terminal
                    </Link>
                </div>
            </form>
        </div>
    );
}