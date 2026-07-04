import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "./Navbar"
import Carousel from "./Carousel"
import Footer from "./Footer"
import { getProducts, deleteProduct, IMAGE_BASE_URL } from "../api/apiService"
import { Search, ShoppingCart, Plus, PackageSearch, Trash2, X } from "lucide-react"

const Getproducts = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [searchQuery, setSearchQuery] = useState("")
    const [filteredProducts, setFilteredProducts] = useState([])
    const [deleteTarget, setDeleteTarget] = useState(null)
    const [deleting, setDeleting] = useState(false)

    const navigate = useNavigate()

    const handleDelete = async () => {
        if (!deleteTarget) return
        setDeleting(true)
        try {
            await deleteProduct(deleteTarget.id)
            setProducts(prev => prev.filter(p => p.id !== deleteTarget.id))
            setDeleteTarget(null)
        } catch (err) {
            alert('Failed to delete product. Please try again.')
        } finally {
            setDeleting(false)
        }
    }

    const fetchProducts = async () => {
        setLoading(true)
        setError("")
        try {
            const response = await getProducts()
            setProducts(response.data)
        } catch (error) {
            setError("Could not load products. Please check your backend connection.")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    useEffect(() => {
        if (!products) return
        const filtered = products.filter((product) =>
            product.product_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (product.product_description && product.product_description.toLowerCase().includes(searchQuery.toLowerCase()))
        )
        setFilteredProducts(filtered)
    }, [searchQuery, products])

    return (
        <div className="flex flex-col min-vh-100 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
            <div className="bg-overlay"></div>
            <Navbar />
            
            <header className="py-20 bg-gradient-to-br from-primary-600 to-primary-800 text-white overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-white blur-3xl"></div>
                    <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-primary-400 blur-3xl"></div>
                </div>
                <div className="container mx-auto px-6 text-center relative z-10">
                    <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight">Medimart</h1>
                    <p className="text-xl md:text-2xl opacity-90 font-medium max-w-2xl mx-auto">
                        Quality Medical Supplies at Your Doorstep
                    </p>
                </div>
            </header>

            <main className="container mx-auto px-4 md:px-6 py-12">
                <div className="mb-12">
                    <Carousel />
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Our Products</h2>
                    <div className="relative w-full md:w-96 group">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors">
                            <Search className="w-5 h-5" />
                        </span>
                        <input
                            type="text"
                            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 shadow-sm transition-all dark:text-white"
                            placeholder="Search by name or category..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {loading && (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-16 h-16 border-4 border-slate-200 border-t-primary-500 rounded-full animate-spin mb-4"></div>
                        <p className="text-slate-600 dark:text-slate-400 font-semibold text-lg">Fetching medical supplies...</p>
                    </div>
                )}

                {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-2xl p-8 text-center max-w-2xl mx-auto shadow-sm">
                        <p className="text-red-700 dark:text-red-400 mb-6 font-medium text-lg">{error}</p>
                        <button 
                            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-red-600/20" 
                            onClick={fetchProducts}
                        >
                            Retry Connection
                        </button>
                    </div>
                )}

                {!loading && !error && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <div key={product.id || product.product_name} className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:shadow-primary-500/10 transition-all duration-500 hover:-translate-y-2 flex flex-col h-full">
                                    <div className="relative overflow-hidden aspect-[4/3]">
                                        <img
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            src={IMAGE_BASE_URL + product.product_photo}
                                            alt={product.product_name}
                                            onError={(e) => {
                                                e.target.src = 'https://via.placeholder.com/400x300?text=Product+Image'
                                            }}
                                        />
                                        <button
                                            className="absolute top-4 left-4 bg-red-500/90 hover:bg-red-600 text-white p-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all shadow-lg backdrop-blur z-10"
                                            onClick={(e) => { e.stopPropagation(); setDeleteTarget(product) }}
                                            aria-label="Delete product"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                        <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary-600 dark:text-primary-400 shadow-sm">
                                            New Arrival
                                        </div>
                                    </div>
                                    <div className="p-6 flex flex-col flex-grow">
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{product.product_name}</h3>
                                        <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 line-clamp-2">
                                            {product.product_description || "High-quality medical product for professional use."}
                                        </p>
                                        <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-50 dark:border-slate-800">
                                            <div className="flex flex-col">
                                                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Price</span>
                                                <span className="text-xl font-black text-primary-600 dark:text-primary-400">KES {product.product_cost}</span>
                                            </div>
                                            <button
                                                className="bg-primary-600 hover:bg-primary-700 text-white p-3 rounded-2xl shadow-lg shadow-primary-600/20 transition-all active:scale-95 group-hover:scale-110"
                                                onClick={() => navigate('/makepayment', { state: { product } })}
                                                aria-label="Add to cart"
                                            >
                                                <Plus className="w-6 h-6" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800">
                                <div className="flex justify-center mb-4">
                                    <PackageSearch className="w-16 h-16 text-slate-300" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-400">No products found for "{searchQuery}"</h3>
                                <button 
                                    className="mt-4 text-primary-600 font-bold hover:underline"
                                    onClick={() => setSearchQuery("")}
                                >
                                    Clear search
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </main>
            {deleteTarget && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 max-w-md w-full shadow-2xl border border-slate-100 dark:border-slate-800">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Delete Product</h3>
                            <button
                                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                                onClick={() => setDeleteTarget(null)}
                                disabled={deleting}
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 mb-2">
                            Are you sure you want to delete <strong className="text-slate-900 dark:text-white">{deleteTarget.product_name}</strong>?
                        </p>
                        <p className="text-sm text-red-500 mb-8">This action cannot be undone.</p>
                        <div className="flex space-x-4">
                            <button
                                className="flex-1 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                                onClick={() => setDeleteTarget(null)}
                                disabled={deleting}
                            >
                                Cancel
                            </button>
                            <button
                                className="flex-1 py-3 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold transition-all shadow-lg shadow-red-600/20 disabled:opacity-50"
                                onClick={handleDelete}
                                disabled={deleting}
                            >
                                {deleting ? "Deleting..." : "Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <Footer />
        </div>
    )
}

export default Getproducts
