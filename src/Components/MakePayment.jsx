import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import { makePayment } from '../api/apiService'

const Makepayment = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { product } = location.state || {}

  const [phone, setPhone] = useState("")
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState({ type: "", message: "" })

  const validatePhone = (num) => {
    // Basic validation for Kenyan phone numbers (9 digits starting with 7 or 1)
    const regex = /^(7|1)[0-9]{8}$/;
    return regex.test(num);
  }

  const submit = async (e) => {
    e.preventDefault()
    if (!product) return

    if (!validatePhone(phone)) {
      setStatus({ type: "danger", message: "Please enter a valid 9-digit phone number (e.g. 712345678)" })
      return;
    }

    setLoading(true)
    setStatus({ type: "info", message: "Sending M-Pesa STK Push... Please check your phone." })

    try {
      // The backend expects 'phone' and 'amount'
      const response = await makePayment({
        phone: phone,
        amount: product.product_cost
      })
      
      if (response.data.message) {
        setStatus({ type: "success", message: response.data.message })
      } else {
        setStatus({ type: "success", message: "Payment request sent! Enter your PIN on your phone to complete." })
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Payment service is currently unavailable. Please try again later."
      setStatus({ type: "danger", message: errorMsg })
      console.error("Payment Error:", error)
    } finally {
      setLoading(false)
    }
  }

  if (!product) {
    return (
      <div className="container-fluid p-0 min-vh-100 d-flex flex-column text-center">
        <Navbar />
        <div className="container my-auto">
          <div className="card border-0 shadow-sm p-5 rounded-custom">
             <h3 className="text-muted mb-4">No product selected for payment</h3>
             <button className="btn btn-primary px-5 py-3 fw-bold rounded-pill" onClick={() => navigate('/')}>
               Browse Products
             </button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="container-fluid p-0 min-vh-100 d-flex flex-column">
      <div className="bgs-overlay"></div>
      <Navbar />
      
      <div className="container flex-grow-1 d-flex justify-content-center align-items-center my-5">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-lg border-0 overflow-hidden rounded-custom">
            <div className="card-header bg-success text-white text-center py-4 border-0">
              <div className="mb-2 h1">📲</div>
              <h3 className="mb-0 fw-bold">Lipa na M-Pesa</h3>
            </div>
            <div className="card-body p-4 p-lg-5 text-center">
              <div className="mb-4 bg-light p-3 rounded-custom border">
                <h6 className="text-uppercase text-muted small fw-bold mb-2">Item to Purchase</h6>
                <h4 className="fw-bold mb-1">{product.product_name}</h4>
                <div className="h3 text-success fw-bold mt-2">KES {product.product_cost}</div>
              </div>

              {status.message && (
                <div className={`alert alert-${status.type} alert-dismissible fade show border-0 shadow-sm mb-4`} role="alert">
                  {status.message}
                </div>
              )}

              <form onSubmit={submit} className="text-start">
                <div className="mb-4">
                  <label className="form-label fw-semibold text-dark">Safaricom Phone Number</label>
                  <div className="input-group input-group-lg">
                    <span className="input-group-text bg-white border-end-0">+254</span>
                    <input
                      type="tel"
                      className="form-control border-start-0 ps-0"
                      placeholder="712345678"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 9))}
                      required
                      autoComplete="tel"
                    />
                  </div>
                  <div className="form-text mt-2">
                    Enter the phone number that will receive the M-Pesa PIN prompt.
                  </div>
                </div>

                <button 
                  className="btn btn-success w-100 py-3 fw-bold rounded-pill shadow-custom"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Processing...
                    </>
                  ) : "Confirm & Pay"}
                </button>
              </form>
              
              <button 
                className="btn btn-link text-muted mt-3 text-decoration-none small"
                onClick={() => navigate('/')}
                disabled={loading}
              >
                ← Back to Shop
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Makepayment
