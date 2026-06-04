import { useEffect, useState } from "react";
import { adminLogin } from "../../services/auth/authService";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router";
import { allRoutes } from "../../router/routes";

export default function LoginPage() {
    const [loginData, setLoginData] = useState({ email: "", password: "" });
    const [loader, setLoader] = useState<boolean>(false);
    const [error, setError] = useState<any>({});
    const navigate = useNavigate();


    function validiation() {
        const error: any = {};

        if (!loginData.email) error.email = "Email is required";

        if (!loginData.password) error.password = "Password is required";

        setError(error);

        return Object.keys(error).length === 0;
    }

    const onHandleSubmit = async (e: any) => {
        e.preventDefault();

        if (!validiation()) return;

        setLoader(true);

        const data = await adminLogin(loginData);

        if (data.status === 200) {
            toast.success(data.message || "Login successful");
            localStorage.setItem('adminToken', data.result);

            setLoginData({
                email: "",
                password: ""
            })

            navigate(allRoutes.dashboard);
        } else {
            toast.error(data?.message || "Authentication failed");
            navigate(allRoutes.login);
        }

        setLoader(false);
    };


    return (
        <div className="w-full max-w-md space-y-8">
            {/* Header */}
            <div className="space-y-2.5">
                <div className="text-xs font-bold text-indigo-600 uppercase tracking-widest">
                    Administrative Gateway
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                    Secure Console Login
                </h2>
                <p className="text-sm text-slate-500">
                    IP monitoring is active. Please authenticate via verified root credentials.
                </p>
            </div>

            {/* Form */}
            <form onSubmit={onHandleSubmit} className="space-y-5">
                {/* Email Field */}
                <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                        <label
                            htmlFor="email"
                            className={`text-xs font-semibold uppercase tracking-wider block transition-colors duration-150 ${error.email ? "text-red-600" : "text-slate-600"
                                }`}
                        >
                            Admin Email
                        </label>
                    </div>

                    <div className="relative">
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={loginData.email}
                            placeholder="root_admin@auramarket.com"
                            onChange={(event) => setLoginData((prev) => ({ ...prev, email: event.target.value }))}
                            className={`w-full px-3.5 py-2.5 border rounded-lg text-slate-900 text-xs focus:outline-none transition-all placeholder:text-slate-400 bg-white font-mono ${error.email
                                ? "border-red-500 focus:ring-2 focus:ring-red-600/20 focus:border-red-600 shadow-sm"
                                : "border-slate-200 focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600"
                                }`}
                        />
                    </div>

                    {/* Premium Error Wrapper Block */}
                    {error.email && (
                        <div className="flex items-center gap-1.5 text-[11px] font-medium text-red-600 animate-slide-in mt-1 select-none">
                            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                            </svg>
                            <span>{error.email}</span>
                        </div>
                    )}
                </div>

                {/* Password Field */}
                <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                        <label
                            htmlFor="password"
                            className={`text-xs font-semibold uppercase tracking-wider transition-colors duration-150 ${error.password ? "text-red-600" : "text-slate-600"
                                }`}
                        >
                            Password
                        </label>
                        <Link to={allRoutes.forgot_password} className="text-xs font-medium text-indigo-600 hover:text-indigo-700 transition-colors">
                            Forgot Password ?
                        </Link>
                    </div>

                    <div className="relative">
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={loginData.password}
                            placeholder="••••••••••••"
                            onChange={(event) => setLoginData((prev) => ({ ...prev, password: event.target.value }))}
                            className={`w-full px-3.5 py-2.5 border rounded-lg text-slate-900 text-xs focus:outline-none transition-all placeholder:text-slate-400 bg-white font-mono ${error.password
                                ? "border-red-500 focus:ring-2 focus:ring-red-600/20 focus:border-red-600 shadow-sm"
                                : "border-slate-200 focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600"
                                }`}
                        />
                    </div>

                    {/* Premium Error Wrapper Block */}
                    {error.password && (
                        <div className="flex items-center gap-1.5 text-[11px] font-medium text-red-600 animate-slide-in mt-1 select-none">
                            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                            </svg>
                            <span>{error.password}</span>
                        </div>
                    )}
                </div>

                {/* Remember Session */}
                <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center">
                        <input
                            id="remember-me"
                            name="remember-me"
                            type="checkbox"
                            className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500/20 accent-indigo-600 cursor-pointer"
                        />
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-600 select-none cursor-pointer">
                            Remember Me
                        </label>
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loader}
                    className="w-full mt-2 py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-lg shadow-sm hover:shadow active:bg-slate-950 transition-all duration-150 flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed font-sans"
                >
                    {loader ? (
                        <>
                            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>Authenticating...</span>
                        </>
                    ) : (
                        "Login"
                    )}
                </button>
            </form>
        </div>
    );
}