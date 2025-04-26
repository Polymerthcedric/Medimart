import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Navbar from "./Navbar"
import Carousel from "./Carousel"
import Footer from "./Footer"

const Getproducts =()=>{

    const [products,setProducts] = useState([])
    const [loading,setLoading] = useState("")
    const [error,setError] = useState("")

    // new to filter products 
    const [filteredProducts,setFilteredProducts] = useState([])
    const[searchQuery,setSearchQuery] = useState("")

    // a variable to hold useNavigate hook 
    const navigate = useNavigate()

    //specify the url of our images 
    const img_url = "https://polymerthcedric.pythonanywhere.com/static/images/"

    // get products function 
    const getProducts = async()=>{
        // we don't need an event (e)here 

        // set loading hook variable to show loading message
        setLoading("Please wait, we are retrieving the products")

        // as the user  waits we fetch the product 
        try {
            // because we are retrieving data we don't need an empty object 
            // so we want to send a GET request to the backend Api 
            const response = await axios.get(
                "https://polymerthcedric.pythonanywhere.com/api/get_product_details"       // we don't need to specify data
            )

            setProducts(response.data)
            // set loading to an empty string 
            setLoading("")
        } catch (error) {
            setLoading("")  // set loading to an empty string 
            setError("There was an error")
        }
    }

    useEffect(()=>{
        getProducts();
    },[])



    // filter loic 
    // search filter logic 
    useEffect(()=>{
        if (!products) return;   //prevent errors if products is undefined

        const filtered = products.filter((product)=>
            product.product_name.toLowerCase().includes(searchQuery.toLowerCase())||
            product.product_description.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredProducts(filtered);
    },[searchQuery,products]);


console.log(products)
    return(
        <div className="row ">
            <div className="bg-overlay"></div>
           <Navbar/>
           <header className="App-header">
            <h1 className='bg-success'>Medimart</h1>
            </header>
           <Carousel/>


            <h3 className="mt-5 text-light">Available Products</h3>
            <input
             type="text-center" 
             className="form-control shadow-sm p-2 bg-success"
             placeholder="Search products..."
             value={searchQuery}
             onChange={(e)=>setSearchQuery(e.target.value)}
              />
            {loading}
            {error}

            {/* short form of if...statement  */}

            {
                filteredProducts?.map((product)=>(
                    <div className="col-md-3 justify-content-center mb-4 ">
                <div className="card shadow">
                    <img
                        className="mt-4 product_img"
                        src={img_url+product.product_photo}
                        alt=""
                    />
                        <h5 className="mt-2">
                            {product.product_name}</h5>    
                    <div className="card-body">
                        <p className="text-muted">
                            {product.product_description.slice(0,10)}
                        </p>
                        <b className="text-warning">
                            {product.product_cost}</b><br />
                        <button
                         className="btn btn-dark mt-2 w-100"
                         onClick={()=>navigate('/makepayment',{state:{product}})} //*
                        >
                            Purchase Now
                        </button>
                    </div>
                </div>
            </div>
                ))
            }

            
           <Footer/> 

        </div>
    )
}
export default Getproducts