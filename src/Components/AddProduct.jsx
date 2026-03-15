import React, { useState } from "react"
import Navbar from "./Navbar"
import Footer from "./Footer"
import { addProduct } from "../api/apiService"
import { PackagePlus, Image as ImageIcon, CheckCircle2, XCircle, Info, Loader2, X } from "lucide-react"

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
        setStatus({ type: "info", message: "Uploading product to Medimart..." })
        
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
            setStatus({ type: "error", message: error.response?.data?.error || "Error uploading product. Please try again." })
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
                <div className="w-full max-w-2xl">
                    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800">
                        <div className="p-8 md:p-12">
                            <div className="text-center mb-10">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 mb-4">
                                    <PackagePlus className="w-8 h-8" />
                                </div>
                                <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Add New Product</h2>
                                <p className="text-slate-500 dark:text-slate-400 font-medium">Expand our medical inventory</p>
                            </div>
                            
                            {status.message && (
                                <div className={`mb-8 p-4 rounded-2xl flex items-center justify-between space-x-3 ${
                                    status.type === 'success' 
                                    ? 'bg-green-50 text-green-700 border border-green-100 dark:bg-green-900/20 dark:text-green-400 dark:border-green-900/30' 
                                    : status.type === 'info'
                                    ? 'bg-blue-50 text-blue-700 border border-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-900/30'
                                    : 'bg-red-50 text-red-700 border border-red-100 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900/30'
                                }`}>
                                    <div className="flex items-center space-x-3">
                                        {status.type === 'success' ? <CheckCircle2 className="w-5 h-5 flex-shrink-0" /> : status.type === 'info' ? <Info className="w-5 h-5 flex-shrink-0" /> : <XCircle className="w-5 h-5 flex-shrink-0" />}
                                        <p className="font-medium text-sm">{status.message}</p>
                                    </div>
                                    <button onClick={() => setStatus({type:"", message:""})} className="p-1 hover:bg-black/5 rounded-lg">
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            )}

                            <form onSubmit={submit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 ml-1">Product Name</label>
                                        <input
                                            type="text"
                                            name="product_name"
                                            placeholder="e.g. Paracetamol 500mg"
                                            className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-primary-500 transition-all dark:text-white"
                                            value={formData.product_name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 ml-1">Cost (KES)</label>
                                        <input
                                            type="number"
                                            name="product_cost"
                                            placeholder="Price"
                                            className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-primary-500 transition-all dark:text-white"
                                            value={formData.product_cost}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 ml-1">Description</label>
                                    <textarea
                                        name="product_description"
                                        className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-primary-500 transition-all dark:text-white resize-none"
                                        placeholder="Brief details about the medicine..."
                                        rows="4"
                                        value={formData.product_description}
                                        onChange={handleChange}
                                        required
                                    ></textarea>
                                </div>

                                <div className="p-8 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl text-center hover:border-primary-500 transition-colors group">
                                    <label className="cursor-pointer block">
                                        <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 group-hover:bg-primary-50 dark:group-hover:bg-primary-900/20 group-hover:text-primary-500 transition-all">
                                            <ImageIcon className="w-6 h-6" />
                                        </div>
                                        <span className="block text-slate-600 dark:text-slate-400 font-bold mb-1">Upload Product Image</span>
                                        <span className="text-xs text-slate-400">PNG, JPG up to 10MB</span>
                                        <input
                                            type="file"
                                            name="product_photo"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={handleChange}
                                            required
                                        />
                                        {formData.product_photo && (
                                            <p className="mt-4 text-primary-600 font-bold text-sm bg-primary-50 dark:bg-primary-900/30 px-4 py-2 rounded-xl inline-block">
                                                Selected: {formData.product_photo.name}
                                            </p>
                                        )}
                                    </label>
                                </div>

                                <button 
                                    className="w-full bg-primary-600 hover:bg-primary-700 text-white py-5 rounded-2xl font-black text-lg transition-all shadow-xl shadow-primary-600/20 active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100"
                                    type="submit"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <span className="flex items-center justify-center space-x-2">
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            <span>Uploading...</span>
                                        </span>
                                    ) : "Add Product"}
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
