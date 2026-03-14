import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "./Navbar"
import Carousel from "./Carousel"
import Footer from "./Footer"
import { getProducts, IMAGE_BASE_URL } from "../api/apiService"

const Getproducts = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [searchQuery, setSearchQuery] = useState("")
    const [filteredProducts, setFilteredProducts] = useState([])

    const navigate = useNavigate()

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
            product.product_description.toLowerCase().includes(searchQuery.toLowerCase())
        )
        setFilteredProducts(filtered)
    }, [searchQuery, products])

    return (
        <div className="d-flex flex-column min-vh-100">
            <div className="bg-overlay"></div>
            <Navbar />
            
            <header className="App-header">
                <div className="container">
                    <h1>Medimart</h1>
                    <p className="lead opacity-75">Quality Medical Supplies at Your Doorstep</p>
                </div>
            </header>

            <main className="container my-5">
                <Carousel />

                <div className="row mt-5 mb-4 g-3 align-items-center">
                    <div className="col-lg-7 col-md-6">
                        <h2 className="mb-0">Our Products</h2>
                    </div>
                    <div className="col-lg-5 col-md-6">
                        <div className="input-group input-group-lg shadow-sm">
                            <span className="input-group-text bg-white border-end-0">🔍</span>
                            <input
                                type="text"
                                className="form-control border-start-0 ps-0"
                                placeholder="Search by name or category..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {loading && (
                    <div className="text-center my-5 py-5">
                        <div className="spinner-border text-primary" role="status" style={{width: '3rem', height: '3rem'}}>
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="mt-3 text-muted fw-medium">Fetching medical supplies...</p>
                    </div>
                )}

                {error && (
                    <div className="alert alert-danger border-0 shadow-sm text-center py-4" role="alert">
                        <p className="mb-3">{error}</p>
                        <button className="btn btn-primary px-4" onClick={fetchProducts}>Retry Connection</button>
                    </div>
                )}

                {!loading && !error && (
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <div key={product.id || product.product_name} className="col">
                                    <div className="card h-100 border-0 shadow-sm overflow-hidden">
                                        <div className="position-relative overflow-hidden" style={{height: '220px'}}>
                                            <img
                                                className="w-100 h-100 object-fit-cover transition-transform"
                                                src={IMAGE_BASE_URL + product.product_photo}
                                                alt={product.product_name}
                                                style={{ transition: 'transform 0.5s ease' }}
                                                onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
                                                onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                                                onError={(e) => {
                                                    e.target.src = 'https://via.placeholder.com/300x250?text=Product+Image'
                                                }}
                                            />
                                        </div>
                                        <div className="card-body d-flex flex-column p-4">
                                            <h5 className="card-title fw-bold mb-2">{product.product_name}</h5>
                                            <p className="card-text text-muted small mb-4">
                                                {product.product_description.length > 80 
                                                    ? product.product_description.slice(0, 80) + "..." 
                                                    : product.product_description}
                                            </p>
                                            <div className="mt-auto pt-3 border-top d-flex justify-content-between align-items-center">
                                                <span className="h5 mb-0 fw-bold text-primary">KES {product.product_cost}</span>
                                                <button
                                                    className="btn btn-primary btn-sm rounded-pill px-3 py-2 fw-semibold"
                                                    onClick={() => navigate('/makepayment', { state: { product } })}
                                                >
                                                    Add to Cart
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-12 text-center py-5">
                                <div className="display-1 text-muted opacity-25 mb-3">🛒</div>
                                <h3 className="text-muted">No products found for "{searchQuery}"</h3>
                            </div>
                        )}
                    </div>
                )}
            </main>
            <Footer />
        </div>
    )
}

export default Getproducts
