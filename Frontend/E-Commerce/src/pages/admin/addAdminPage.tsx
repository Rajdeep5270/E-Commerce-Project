import { useState } from "react";
import { addAdmin } from "../../services/admin/adminService";
import { toast } from "react-toastify";

export interface adminDataType {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone: string;
    profile_image: File | null;
}

export default function AddAdminPage() {
    const [addAdminFormData, setAddAdminFormData] = useState<adminDataType>({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        phone: "",
        profile_image: null
    });

    const [loader, setLoader] = useState<boolean>(false);

    const [error, setError] = useState<any>({});

    const validation = () => {
        const error: any = {};

        if (!addAdminFormData.first_name) error.first_name = "First name is required";

        // FIXED: Apne pehle first_name check kiya tha, ab ye cleanly last_name validator hai
        if (!addAdminFormData.last_name) error.last_name = "Last name is required";

        if (!addAdminFormData.email) error.email = "Email is required";
        if (!addAdminFormData.password) error.password = "Password is required";
        if (!addAdminFormData.phone) error.phone = "Phone mapping sequence is required";
        if (!addAdminFormData.profile_image) error.profile_image = "Profile image node payload is required";

        setError(error);
        return Object.keys(error).length === 0;
    };

    const onHandleChange = (e: any) => {
        const { name, value, files } = e.target;

        // FIXED: File validation block routing structure
        if (name === "profile_image") {
            setAddAdminFormData(prev => ({
                ...prev,
                profile_image: files && files[0] ? files[0] : null
            }));
        } else {
            setAddAdminFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const onHandleSubmit = async (e: any) => {
        e.preventDefault();

        setLoader(true);

        if (!validation()) return;

        // api logic here 
        const data = await addAdmin(addAdminFormData);

        if (data.status === 201) {
            toast.success(data.message);

            // navigate to view admin page 
        } else {
            toast.error(data.message);
        }

        setLoader(false);

        setAddAdminFormData({
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            phone: "",
            profile_image: null
        });
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
            {/* Page Descriptor Header */}
            <div className="pb-5 border-b border-slate-200">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">Provision New Admin</h1>
                <p className="text-sm text-slate-500 mt-0.5">
                    Deploy a privileged root account node into the cluster access schema matrix.
                </p>
            </div>

            {/* Core Card Structure */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                <form onSubmit={onHandleSubmit} className="p-6 sm:p-8 space-y-6">

                    {/* 2-Column Grid Layout: Name Context */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {/* First Name Field */}
                        <div className="space-y-1.5">
                            <label className={`text-xs font-semibold uppercase tracking-wider block ${error.first_name ? "text-red-600" : "text-slate-600"}`}>
                                First Name
                            </label>
                            <input
                                type="text"
                                name="first_name"
                                value={addAdminFormData.first_name}
                                onChange={onHandleChange}
                                placeholder="E.g., Alexander"
                                className={`w-full px-3.5 py-2.5 bg-white border rounded-lg text-sm text-slate-900 transition-all placeholder:text-slate-300 focus:outline-none ${error.first_name ? "border-red-500 focus:ring-2 focus:ring-red-600/20 focus:border-red-600" : "border-slate-200 focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600"
                                    }`}
                            />
                            {error.first_name && <p className="text-[11px] font-medium text-red-600 mt-1 select-none">{error.first_name}</p>}
                        </div>

                        {/* Last Name Field */}
                        <div className="space-y-1.5">
                            <label className={`text-xs font-semibold uppercase tracking-wider block ${error.last_name ? "text-red-600" : "text-slate-600"}`}>
                                Last Name
                            </label>
                            <input
                                type="text"
                                name="last_name"
                                value={addAdminFormData.last_name}
                                onChange={onHandleChange}
                                placeholder="E.g., Wright"
                                className={`w-full px-3.5 py-2.5 bg-white border rounded-lg text-sm text-slate-900 transition-all placeholder:text-slate-300 focus:outline-none ${error.last_name ? "border-red-500 focus:ring-2 focus:ring-red-600/20 focus:border-red-600" : "border-slate-200 focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600"
                                    }`}
                            />
                            {error.last_name && <p className="text-[11px] font-medium text-red-600 mt-1 select-none">{error.last_name}</p>}
                        </div>
                    </div>

                    {/* 2-Column Grid Layout: Email & Phone Network */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {/* Email Address */}
                        <div className="space-y-1.5">
                            <label className={`text-xs font-semibold uppercase tracking-wider block ${error.email ? "text-red-600" : "text-slate-600"}`}>
                                System Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={addAdminFormData.email}
                                onChange={onHandleChange}
                                placeholder="name@auracore.io"
                                className={`w-full px-3.5 py-2.5 bg-white border rounded-lg text-sm text-slate-900 font-mono transition-all placeholder:text-slate-300 focus:outline-none ${error.email ? "border-red-500 focus:ring-2 focus:ring-red-600/20 focus:border-red-600" : "border-slate-200 focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600"
                                    }`}
                            />
                            {error.email && <p className="text-[11px] font-medium text-red-600 mt-1 select-none">{error.email}</p>}
                        </div>

                        {/* Phone Number */}
                        <div className="space-y-1.5">
                            <label className={`text-xs font-semibold uppercase tracking-wider block ${error.phone ? "text-red-600" : "text-slate-600"}`}>
                                Secure Mobile Link
                            </label>
                            <input
                                type="number"
                                name="phone"
                                value={addAdminFormData.phone}
                                onChange={onHandleChange}
                                placeholder="9876543210"
                                className={`w-full px-3.5 py-2.5 bg-white border rounded-lg text-sm text-slate-900 font-mono transition-all placeholder:text-slate-300 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${error.phone ? "border-red-500 focus:ring-2 focus:ring-red-600/20 focus:border-red-600" : "border-slate-200 focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600"
                                    }`}
                            />
                            {error.phone && <p className="text-[11px] font-medium text-red-600 mt-1 select-none">{error.phone}</p>}
                        </div>
                    </div>

                    {/* Standalone Field: Password */}
                    <div className="space-y-1.5">
                        <label className={`text-xs font-semibold uppercase tracking-wider block ${error.password ? "text-red-600" : "text-slate-600"}`}>
                            Access Authentication Passcode
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={addAdminFormData.password}
                            onChange={onHandleChange}
                            placeholder="••••••••••••"
                            className={`w-full px-3.5 py-2.5 bg-white border rounded-lg text-sm text-slate-900 font-mono transition-all placeholder:text-slate-300 focus:outline-none ${error.password ? "border-red-500 focus:ring-2 focus:ring-red-600/20 focus:border-red-600" : "border-slate-200 focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600"
                                }`}
                        />
                        {error.password && <p className="text-[11px] font-medium text-red-600 mt-1 select-none">{error.password}</p>}
                    </div>

                    {/* Premium File Upload Interface Area */}
                    <div className="space-y-1.5">
                        <label className={`text-xs font-semibold uppercase tracking-wider block ${error.profile_image ? "text-red-600" : "text-slate-600"}`}>
                            Avatar Token Payload
                        </label>
                        <div className={`relative border-2 border-dashed rounded-xl p-5 text-center flex flex-col items-center justify-center transition-all bg-slate-50/50 hover:bg-slate-50 ${error.profile_image ? "border-red-400 bg-red-50/10" : "border-slate-200"
                            }`}>
                            <input
                                type="file"
                                id="profile_image"
                                name="profile_image"
                                accept="image/*"
                                onChange={onHandleChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            />

                            {/* Upload Graphic & Text Status */}
                            <svg className={`w-6 h-6 mb-2 transition-colors ${error.profile_image ? "text-red-400" : "text-slate-400"}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                            </svg>

                            <div className="text-xs text-slate-600 font-medium">
                                {addAdminFormData.profile_image ? (
                                    <span className="text-indigo-600 font-semibold font-mono bg-white px-2 py-1 rounded border border-slate-200 shadow-sm">
                                        {(addAdminFormData.profile_image as File).name}
                                    </span>
                                ) : (
                                    <span>Click to upload image or drag and drop</span>
                                )}
                            </div>
                            <p className="text-[10px] text-slate-400 mt-1">PNG, JPG, SVG up to 5MB</p>
                        </div>
                        {error.profile_image && <p className="text-[11px] font-medium text-red-600 mt-1 select-none">{error.profile_image}</p>}
                    </div>

                    {/* Submit Operational Button */}
                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={loader} // Prevent duplicate API requests while deploying
                            className={`w-full sm:w-auto px-6 py-2.5 text-sm font-medium rounded-lg shadow-sm transition-all duration-150 flex items-center justify-center gap-2 font-sans focus:outline-none ${loader
                                ? "bg-slate-700 text-slate-300 cursor-not-allowed"
                                : "bg-slate-900 hover:bg-slate-800 text-white active:bg-slate-950 cursor-pointer hover:shadow"
                                }`}
                        >
                            {loader ? (
                                /* Premium Circular Spinning Loader */
                                <svg className="animate-spin h-4 w-4 text-current flex-shrink-0" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                            ) : (
                                /* Standard Plus Plus Icon Graphic */
                                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                            )}

                            <span>{loader ? "Deploying New Admin..." : "Deploy New Admin"}</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}