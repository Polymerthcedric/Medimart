import axios from "axios"
import { useState } from "react"
import Navbar from "./Navbar"

const Addproduct =()=>{

    const [product_name,setProductName] = useState("")
    const [product_description,SetProductDescription] = useState("")
    const [product_cost,setProductCost] = useState("")
    const [product_photo,setProductPhoto] = useState([])

    // user experience
    const [loading,setLoading] = useState("")
    const [message,setMessage] = useState("")
    const [error,setError] = useState("")


    const submit =async(e)=>{
        e.preventDefault();

        // set loading hook variable to show loading message 
        setLoading("Please wait as we upload your data")
        try {
            // first we need an empty object 
            const data = new FormData()
            data.append("product_name",product_name)
            data.append("product_description",product_description)
            data.append("product_cost",product_cost)
            data.append("product_photo",product_photo)
            
            const response = await axios.post(                // we use axios to post the data to our backend API 
            
                "https://polymerthcedric.pythonanywhere.com/api/add_product",
                data
            )

            // set loading to an empty string 
            setLoading("")
            setMessage(response.data.success)
            
            
        } catch (error) {
            setLoading("")  //we do this to reset the loading to an empty sting to remove "please wait....
            setError(error.message)
        }


    }


    return(
        <div className="row justify-content-center mt-4 " >
            <Navbar/>
            <div className="bg-overlay"></div>
            <div className="min-vh-100 d-flex justify-content-center align-items-center">
              <div className="col-md-6 card shadow p-4" >
                    <h3>
                        Upload products
                    </h3>
                    {loading}
                    {message}
                    {error}
                    <form onSubmit={submit}>
                        <input
                    
                        placeholder="Enter product name"
                        className="form-control"
                        value={product_name}
                        onChange={(e)=>setProductName(e.target.value)}
                        required/>
                    
                        <br/>

                        <textarea
                        className="form-control"
                        placeholder="Describe your product"
                        value={product_description}
                        onChange={(e)=>SetProductDescription(e.target.value)}
                        required>

                        </textarea>

                        <br />

                        <input
                        type="number"
                        placeholder="Enter product cost"
                        value={product_cost}
                        onChange={(e)=>setProductCost(e.target.value)}
                        className="form-control"
                        required
                        />

                        <br />

                        {/* file input is different because they are in an array  */}

                        <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={(e)=>setProductPhoto(e.target.files[0])}
                        required />
                        <br />

                        <button className="btn btn-primary" type="submit">Upload Product</button>

                    </form>

                </div>
            </div>
          
        </div>
    )
}
export default Addproduct