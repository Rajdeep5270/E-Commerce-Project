import { useState } from "react";
import { Link } from "react-router"; // Clean navigation ke liye
import { adminForgotPassword } from "../../services/authService";
import { toast } from "react-toastify";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState<string>("");
    const [loader, setLoader] = useState<boolean>(false);

    async function onHandleSubmit(e: any) {
        e.preventDefault();
        setLoader(true);

        console.log("Sending OTP to:", email);

        const data = await adminForgotPassword({ email });

        if (data.status === 200) {
            toast.success(data.message);
        } else {
            toast.error(data.message);
        }

        setLoader(false);
    }

    return (
        <div className="w-full max-w-md space-y-8">
            {/* Header */}
            <div className="space-y-2.5">
                <div className="text-xs font-bold text-indigo-600 uppercase tracking-widest">
                    Security Override
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                    Recover Core Access
                </h2>
                <p className="text-sm text-slate-500">
                    Enter your verified admin email address below. We will dispatch a secure validation OTP code.
                </p>
            </div>

            {/* Form */}
            <form onSubmit={onHandleSubmit} className="space-y-5">
                {/* Email Field */}
                <div className="space-y-1.5">
                    <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-slate-600 block">
                        System Email Address
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        placeholder="root_admin@auramarket.com"
                        onChange={(event) => setEmail(event.target.value)}
                        className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all placeholder:text-slate-400 bg-white font-mono"
                        required
                    />
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
                            <span>Dispatching OTP...</span>
                        </>
                    ) : (
                        "Send OTP Code"
                    )}
                </button>

                {/* Back to Login Anchor link */}
                <div className="text-center pt-2">
                    <Link
                        to="/login"
                        className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition-colors inline-flex items-center gap-1"
                    >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                        Return to Control Gate
                    </Link>
                </div>
            </form>
        </div>
    );
}