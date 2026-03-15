import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import { makePayment } from '../api/apiService'
import { Smartphone, CreditCard, ShoppingBasket, CheckCircle2, Info, XCircle, ArrowLeft, Loader2 } from 'lucide-react'

const Makepayment = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { product } = location.state || {}

  const [phone, setPhone] = useState("")
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState({ type: "", message: "" })

  const validatePhone = (num) => {
    const regex = /^(7|1)[0-9]{8}$/;
    return regex.test(num);
  }

  const submit = async (e) => {
    e.preventDefault()
    if (!product) return

    if (!validatePhone(phone)) {
      setStatus({ type: "error", message: "Please enter a valid 9-digit phone number (e.g. 712345678)" })
      return;
    }

    setLoading(true)
    setStatus({ type: "info", message: "Sending M-Pesa STK Push... Please check your phone." })

    try {
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
      setStatus({ type: "error", message: errorMsg })
      console.error("Payment Error:", error)
    } finally {
      setLoading(false)
    }
  }

  if (!product) {
    return (
      <div className="flex flex-col min-vh-100 bg-slate-50 dark:bg-slate-950">
        <Navbar />
        <div className="flex-grow flex items-center justify-center p-6 text-center">
          <div className="bg-white dark:bg-slate-900 p-12 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 max-w-lg w-full">
             <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-slate-100 dark:bg-slate-800 text-slate-400 mb-6">
                <ShoppingBasket className="w-10 h-10" />
             </div>
             <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-6">No product selected for payment</h3>
             <button 
                className="w-full bg-primary-600 hover:bg-primary-700 text-white py-4 rounded-2xl font-black transition-all shadow-xl shadow-primary-600/20 active:scale-95 flex items-center justify-center space-x-2" 
                onClick={() => navigate('/')}
             >
               <ArrowLeft className="w-5 h-5" />
               <span>Browse Products</span>
             </button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-vh-100 bg-slate-50 dark:bg-slate-950">
      <div className="bg-overlay"></div>
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-lg">
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800">
            <div className="bg-emerald-600 dark:bg-emerald-700 p-10 text-center text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10 text-8xl pointer-events-none">
                    <Smartphone className="w-24 h-24" />
                </div>
                <div className="relative z-10">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <CreditCard className="w-8 h-8" />
                    </div>
                    <h3 className="text-3xl font-black tracking-tight">Lipa na M-Pesa</h3>
                </div>
            </div>
            <div className="p-8 md:p-10">
              <div className="mb-8 p-6 rounded-3xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-black uppercase tracking-widest text-slate-400">Item to Purchase</span>
                    <span className="text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 px-2 py-1 rounded-lg font-bold">Secure</span>
                </div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{product.product_name}</h4>
                <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 tracking-tighter">KES {product.product_cost}</div>
              </div>

              {status.message && (
                <div className={`mb-8 p-4 rounded-2xl flex items-center space-x-3 ${
                    status.type === 'success' 
                    ? 'bg-green-50 text-green-700 border border-green-100 dark:bg-green-900/20 dark:text-green-400 dark:border-green-900/30' 
                    : status.type === 'info'
                    ? 'bg-blue-50 text-blue-700 border border-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-900/30'
                    : 'bg-red-50 text-red-700 border border-red-100 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900/30'
                }`}>
                    {status.type === 'success' ? <CheckCircle2 className="w-5 h-5 flex-shrink-0" /> : status.type === 'info' ? <Info className="w-5 h-5 flex-shrink-0" /> : <XCircle className="w-5 h-5 flex-shrink-0" />}
                    <p className="font-medium text-sm">{status.message}</p>
                </div>
              )}

              <form onSubmit={submit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 ml-1">Safaricom Phone Number</label>
                  <div className="relative group">
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 flex items-center space-x-2 border-r border-slate-200 dark:border-slate-700 pr-3">
                        <span className="text-slate-500 dark:text-slate-400 font-bold">+254</span>
                    </div>
                    <input
                      type="tel"
                      className="w-full pl-20 pr-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-emerald-500 transition-all dark:text-white"
                      placeholder="712345678"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 9))}
                      required
                      autoComplete="tel"
                    />
                  </div>
                  <p className="mt-3 text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                    Enter the phone number that will receive the <span className="text-emerald-600 font-bold">M-Pesa PIN prompt</span> to complete this transaction.
                  </p>
                </div>

                <button 
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-5 rounded-2xl font-black text-lg transition-all shadow-xl shadow-emerald-600/20 active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center justify-center space-x-2">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Processing...</span>
                    </span>
                  ) : "Confirm & Pay Now"}
                </button>
              </form>
              
              <button 
                className="w-full mt-6 text-slate-500 dark:text-slate-400 font-bold text-sm hover:text-slate-700 dark:hover:text-slate-200 transition-colors flex items-center justify-center space-x-2"
                onClick={() => navigate('/')}
                disabled={loading}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Shop</span>
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
