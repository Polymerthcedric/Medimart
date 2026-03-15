import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { signIn } from "../api/apiService"
import Navbar from "./Navbar"
import Footer from "./Footer"
import { LogIn, XCircle, Loader2 } from "lucide-react"

const Signin = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const navigate = useNavigate()

    const submit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        try {
            const response = await signIn({ email, password })
            
            if (response.data.user) {
                localStorage.setItem("user", JSON.stringify(response.data.user))
                navigate("/")
            } else {
                setError(response.data.message || "Invalid credentials")
            }
        } catch (error) {
            setError(error.response?.data?.message || "Connection error. Please try again.")
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
                <div className="w-full max-w-md">
                    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800">
                        <div className="p-8 md:p-12">
                            <div className="text-center mb-10">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 mb-4">
                                    <LogIn className="w-8 h-8" />
                                </div>
                                <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Welcome Back</h2>
                                <p className="text-slate-500 dark:text-slate-400 font-medium">Sign in to your Medimart account</p>
                            </div>
                            
                            {error && (
                                <div className="mb-8 p-4 rounded-2xl flex items-center space-x-3 bg-red-50 text-red-700 border border-red-100 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900/30">
                                    <XCircle className="w-5 h-5 flex-shrink-0" />
                                    <p className="font-medium text-sm">{error}</p>
                                </div>
                            )}

                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 ml-1">Email Address</label>
                                    <input
                                        type="email"
                                        className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-primary-500 transition-all dark:text-white"
                                        placeholder="name@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                
                                <div>
                                    <div className="flex items-center justify-between mb-2 ml-1">
                                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Password</label>
                                        <a href="#" className="text-xs font-bold text-primary-600 hover:underline">Forgot?</a>
                                    </div>
                                    <input
                                        type="password"
                                        className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-primary-500 transition-all dark:text-white"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
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
                                            <span>Signing in...</span>
                                        </span>
                                    ) : "Sign In"}
                                </button>
                            </form>

                            <div className="mt-10 text-center">
                                <p className="text-slate-500 dark:text-slate-400 font-medium">
                                    Don't have an account? {' '}
                                    <Link to='/signup' className="text-primary-600 dark:text-primary-400 font-bold hover:underline">Create Account</Link>
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

export default Signin
