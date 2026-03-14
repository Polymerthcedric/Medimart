import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { signUp } from "../api/apiService"
import Navbar from "./Navbar"
import Footer from "./Footer"

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
                setStatus({ type: "danger", message: response.data.message || "Signup failed" })
            }
        } catch (error) {
            setStatus({ type: "danger", message: error.response?.data?.message || "Connection error. Please try again." })
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
                            <h2 className="mb-4 fw-bold">Sign Up</h2>
                            
                            {status.message && (
                                <div className={`alert alert-${status.type}`} role="alert">
                                    {status.message}
                                </div>
                            )}

                            <form onSubmit={submit} className="text-start">
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Username</label>
                                    <input
                                        type="text"
                                        name="username"
                                        className="form-control"
                                        placeholder="Choose a username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        placeholder="name@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        className="form-control"
                                        placeholder="0712345678"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="form-label fw-semibold">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <button 
                                    type="submit" 
                                    className="btn btn-primary w-100 py-3 fw-bold shadow-sm"
                                    disabled={loading}
                                >
                                    {loading ? "Creating account..." : "Create Account"}
                                </button>
                            </form>

                            <div className="mt-4 text-center">
                                <p className="mb-1 text-muted">Already have an account?</p>
                                <Link to='/signin' className="fw-bold text-decoration-none">Sign In Instead</Link>
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
