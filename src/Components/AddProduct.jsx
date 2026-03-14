import React, { useState } from "react"
import Navbar from "./Navbar"
import Footer from "./Footer"
import { addProduct } from "../api/apiService"

const Addproduct = () => {
    const [formData, setFormData] = useState({
        product_name: "",
        product_description: "",
        product_cost: "",
        product_photo: null
    })

    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState({ type: "", message: "" })

    const handleChange = (e) => {
        const { name, value, files } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: files ? files[0] : value
        }))
    }

    const submit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setStatus({ type: "info", message: "Uploading product to PythonAnywhere..." })
        
        try {
            const response = await addProduct(formData)
            setStatus({ type: "success", message: response.data.success || "Product uploaded successfully!" })
            // Reset form
            setFormData({
                product_name: "",
                product_description: "",
                product_cost: "",
                product_photo: null
            })
            e.target.reset()
        } catch (error) {
            setStatus({ type: "danger", message: error.response?.data?.error || "Error uploading product. Please try again." })
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
                <div className="col-md-6 col-lg-5">
                    <div className="card shadow-lg border-0">
                        <div className="card-body p-5 text-center">
                            <h2 className="mb-4 fw-bold">Upload New Product</h2>
                            
                            {status.message && (
                                <div className={`alert alert-${status.type} alert-dismissible fade show`} role="alert">
                                    {status.message}
                                    <button type="button" className="btn-close" onClick={() => setStatus({type:"", message:""})}></button>
                                </div>
                            )}

                            <form onSubmit={submit} className="text-start">
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Product Name</label>
                                    <input
                                        type="text"
                                        name="product_name"
                                        placeholder="e.g. Paracetamol 500mg"
                                        className="form-control"
                                        value={formData.product_name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Description</label>
                                    <textarea
                                        name="product_description"
                                        className="form-control"
                                        placeholder="Brief details about the medicine..."
                                        rows="3"
                                        value={formData.product_description}
                                        onChange={handleChange}
                                        required
                                    ></textarea>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Cost (KES)</label>
                                    <input
                                        type="number"
                                        name="product_cost"
                                        placeholder="Price in Kenya Shillings"
                                        className="form-control"
                                        value={formData.product_cost}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="form-label fw-semibold">Product Image</label>
                                    <input
                                        type="file"
                                        name="product_photo"
                                        className="form-control"
                                        accept="image/*"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <button 
                                    className="btn btn-primary w-100 py-3 fw-bold shadow-sm" 
                                    type="submit"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                            Uploading...
                                        </>
                                    ) : "Upload Product"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Addproduct
