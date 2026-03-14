import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { signIn } from "../api/apiService"
import Navbar from "./Navbar"
import Footer from "./Footer"

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
        <div className="container-fluid p-0 min-vh-100 d-flex flex-column">
            <div className="bg-overlay"></div>
            <Navbar />
            
            <div className="container flex-grow-1 d-flex justify-content-center align-items-center my-5">
                <div className="col-md-5 col-lg-4">
                    <div className="card shadow-lg border-0">
                        <div className="card-body p-5 text-center">
                            <h2 className="mb-4 fw-bold">Sign In</h2>
                            
                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={submit} className="text-start">
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Email Address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="name@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                
                                <div className="mb-4">
                                    <label className="form-label fw-semibold">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>

                                <button 
                                    type="submit" 
                                    className="btn btn-primary w-100 py-3 fw-bold shadow-sm"
                                    disabled={loading}
                                >
                                    {loading ? "Signing in..." : "Sign In"}
                                </button>
                            </form>

                            <div className="mt-4 text-center">
                                <p className="mb-1 text-muted">Don't have an account?</p>
                                <Link to='/signup' className="fw-bold text-decoration-none">Create Account</Link>
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
