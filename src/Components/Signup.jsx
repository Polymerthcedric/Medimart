import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { signUp } from "../api/apiService"
import Navbar from "./Navbar"
import Footer from "./Footer"
import { CheckCircle2, XCircle, UserPlus, Loader2 } from "lucide-react"

const Signup = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        phone: ""
    })

    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState({ type: "", message: "" })

    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const submit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setStatus({ type: "", message: "" })

        try {
            const response = await signUp(formData)
            if (response.data.success) {
                setStatus({ type: "success", message: "Account created successfully!" })
                setTimeout(() => navigate("/signin"), 2000)
            } else {
                setStatus({ type: "error", message: response.data.message || "Signup failed" })
            }
        } catch (error) {
            setStatus({ type: "error", message: error.response?.data?.message || "Connection error. Please try again." })
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col min-vh-100 bg-slate-50 dark:bg-slate-950">
            <div className="bg-overlay"></div>
            <Navbar />
            
            <div className="flex-grow flex items-center justify-center px-4 py-20">
                <div className="w-full max-w-lg">
                    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800">
                        <div className="p-8 md:p-12">
                            <div className="text-center mb-10">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 mb-4">
                                    <UserPlus className="w-8 h-8" />
                                </div>
                                <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Create Account</h2>
                                <p className="text-slate-500 dark:text-slate-400 font-medium">Join Medimart for professional supplies</p>
                            </div>
                            
                            {status.message && (
                                <div className={`mb-8 p-4 rounded-2xl flex items-center space-x-3 ${status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100 dark:bg-green-900/20 dark:text-green-400 dark:border-green-900/30' : 'bg-red-50 text-red-700 border border-red-100 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900/30'}`}>
                                    {status.type === 'success' ? <CheckCircle2 className="w-5 h-5 flex-shrink-0" /> : <XCircle className="w-5 h-5 flex-shrink-0" />}
                                    <p className="font-medium text-sm">{status.message}</p>
                                </div>
                            )}

                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 ml-1">Username</label>
                                    <input
                                        type="text"
                                        name="username"
                                        className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-primary-500 transition-all dark:text-white"
                                        placeholder="Choose a username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 ml-1">Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-primary-500 transition-all dark:text-white"
                                            placeholder="name@example.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 ml-1">Phone Number</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-primary-500 transition-all dark:text-white"
                                            placeholder="0712345678"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 ml-1">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-primary-500 transition-all dark:text-white"
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <button 
                                    type="submit" 
                                    className="w-full bg-primary-600 hover:bg-primary-700 text-white py-5 rounded-2xl font-black text-lg transition-all shadow-xl shadow-primary-600/20 active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <span className="flex items-center justify-center space-x-2">
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            <span>Creating account...</span>
                                        </span>
                                    ) : "Create Account"}
                                </button>
                            </form>

                            <div className="mt-10 text-center">
                                <p className="text-slate-500 dark:text-slate-400 font-medium">
                                    Already have an account? {' '}
                                    <Link to='/signin' className="text-primary-600 dark:text-primary-400 font-bold hover:underline">Sign In Instead</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Signup
