import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { adminVerifyOTP, resendOTPfunc } from "../../services/auth/authService";
import { toast } from "react-toastify";
import { allRoutes } from "../../router/routes";

export default function VerifyOtpPage() {
    // 6 length ka string array pure passcode ko perfectly tracking ke liye
    const [OTP, setOTP] = useState<string[]>(new Array(6).fill(""));
    const [loader, setLoader] = useState<boolean>(false);
    const [timer, setTimer] = useState<number>(120);

    const navigate = useNavigate();

    useEffect(() => {

        if (timer <= 0) return;

        const timerInterval = setInterval(() => {
            setTimer(state => state - 1);
        }, 100);

        return () => clearInterval(timerInterval);
    }, [timer]);

    // Focus automatically jump karne ke liye inputs array reference element
    const inputRefs = useRef<HTMLInputElement[]>([]);

    // Handle single alphanumeric entry & shifts focus forward
    const handleChange = (value: string, index: number) => {
        const upperValue = value.toUpperCase(); // System parameters uniform tokens matching
        if (!upperValue) return;

        const newOtp = [...OTP];
        newOtp[index] = upperValue.slice(-1); // Sirf right-most updated raw element context filter array me add karein
        setOTP(newOtp);

        // Auto focus trigger forward direction rule
        if (index < 5 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1].focus();
        }
    };

    // Handle clean removal or jumps focus backward on Backspace
    const handleKeyDown = (e: any, index: number) => {
        if (e.key === "Backspace") {
            const newOtp = [...OTP];

            if (!OTP[index] && index > 0) {
                // Input panel area targeted is clear, step back container element
                newOtp[index - 1] = "";
                setOTP(newOtp);
                inputRefs.current[index - 1].focus();
            } else {
                // Focus area data context array clean command operation
                newOtp[index] = "";
                setOTP(newOtp);
            }
        }
    };

    // Support for direct copy-paste command configurations (Pasting all 6 characters)
    const handlePaste = (e: any) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").toUpperCase().trim().slice(0, 6);

        if (pastedData.length === 6) {
            const pastedArray = pastedData.split("");
            setOTP(pastedArray);
            inputRefs.current[5].focus(); // Focus dumps immediately to the terminal point unit
        }
    };

    const onHandleSubmit = async (e: any) => {
        e.preventDefault();
        const finalOtpCode = OTP.join("");

        if (finalOtpCode.length < 6) return;

        setLoader(true);

        // api calling 
        const data = await adminVerifyOTP(finalOtpCode);

        if (data.status === 200) {
            toast.success(data.message);

            //navigate to new password page 
            navigate(allRoutes.change_password);
        } else {
            toast.error(data.message);
        }

        setLoader(false);
    };

    const resendOTP = async () => {
        const data = await resendOTPfunc();

        if (data.success === 200) {
            toast.success(data.message);

            navigate(allRoutes.change_password);
        } else {
            toast.error(data.message);
        }
    }

    const minute = Math.floor(timer / 60).toString().padStart(2, '0');
    const second = Math.floor(timer % 60).toString().padStart(2, '0');

    return (
        <div className="w-full max-w-md space-y-8">
            {/* Header */}
            <div className="space-y-2.5">
                <div className="text-xs font-bold text-indigo-600 uppercase tracking-widest">
                    Security Verification
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                    Enter Security Token
                </h2>
                <p className="text-sm text-slate-500">
                    A 6-letter verification security payload has been transmitted to your encrypted admin mailbox.
                </p>
            </div>

            {/* Form Layout */}
            <form onSubmit={onHandleSubmit} className="space-y-6">

                {/* 6 Grid OTP Blocks */}
                <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 block">
                        Secure Authentication Passcode
                    </label>

                    <div className="flex justify-between gap-2" onPaste={handlePaste}>
                        {OTP.map((value, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength={1}
                                value={value}
                                ref={(el) => {
                                    if (el) inputRefs.current[index] = el;
                                }}
                                onChange={(e) => handleChange(e.target.value, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                placeholder="•"
                                className="w-12 h-14 text-center border-2 border-slate-200 rounded-xl text-lg font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all font-mono bg-white uppercase shadow-sm placeholder:text-slate-300"

                            />
                        ))}
                    </div>
                </div>

                {/* Submit Action Button */}
                <button
                    type="submit"
                    disabled={loader || OTP.join("").length < 6}
                    className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-lg shadow-sm hover:shadow active:bg-slate-950 transition-all duration-150 flex items-center justify-center gap-2 font-sans disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loader ? (
                        <>
                            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>Validating Token Node...</span>
                        </>
                    ) : (
                        "Verify Security Token"
                    )}
                </button>

                {/* Footer Controls */}
                <div className="space-y-4 pt-2">

                    <div>
                        {timer > 0 ? (
                            <span className="text-slate-500">
                                Resend dynamic token in{" "}
                                <strong className="text-slate-700 font-mono font-bold tracking-wide">
                                    {minute}:{second}
                                </strong>
                            </span>
                        ) : (
                            <button
                                type="button"
                                disabled={false}
                                onClick={resendOTP}
                                className="text-indigo-600 hover:text-indigo-700 font-semibold transition-colors duration-150 cursor-pointer focus:outline-none focus:underline"
                            >
                                Request New Token Payload
                            </button>
                        )}
                    </div>

                    <div className="text-center">
                        <Link
                            to={allRoutes.login}
                            className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors inline-flex items-center gap-1"
                        >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                            Cancel & Return
                        </Link>
                    </div>
                </div>

            </form>
        </div>
    );
}