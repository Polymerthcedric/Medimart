// shortcut rafce
import { useLocation } from 'react-router-dom'
import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'

const Makepayment = () => {

  // a variable to hold useLocation hook
  const {product} = useLocation().state || {}
  const [phone,setPhone] = useState("")
  const [message,setMessage] = useState("")

  const submit = async (e) => {
    e.preventDefault()
    setMessage("Please wait as we process your payment")

    const data= new FormData()
    data.append("phone",phone)
    data.append("amount",product.product_cost)
    
    const response = await axios.post(
      "https://polymerthcedric.pythonanywhere.com/api/mpesa_payment",
      data
    )
      
    setMessage(response.data.message)

    

  }

  return (
    <div className='product-container'>
      <Navbar/>
     <div className='bgs-overlay'></div>
      
      <h1 className='bg-color'>Make Payment - Lipa na Mpesa</h1>

      <p>Product Name : {product.product_name}</p>
      <p>Product Cost : {product.product_cost}</p>
      <form onSubmit={submit}>
      {message}
      
      <br/>
      <input 
      type="text"
      placeholder='Enter Your phone number'
      className='form-group'
      value={phone}
      onChange={(e) => setPhone(e.target.value)} 
      />

      <br /><br />

      <button className="btn btn-primary">Make Payment</button>
      </form>
    </div>
  )
}

export default Makepayment