import { Link,useNavigate } from "react-router-dom"
import axios from "axios"
import { useState } from "react"


const Signin =()=>{

    const [email,setEmail] = useState("")
    const [password,setPassword] =useState("")

    // user experience
    const [loading,setLoading] = useState("")
    const [error,setError] =useState("")

    // a variable to hold useNavigate hook 
    const navigate = useNavigate()
    const submit =async(e) =>{
        e.preventDefault()

        // set loading hook variable to show loading message
        setLoading("Please wait as we log you in")

        try {
            const data = new FormData()
            data.append("email",email)
            data.append("password",password)
            
            // initialize the axios 
            // we use axios to post the data to our backend API 
            const response = await axios.post(
                "https://polymerthcedric.pythonanywhere.com/api/signin",
                data
            )
            // if everytrhing has went as planned 
            // set loading to an empty string 
            setLoading("")

            if(response.data.user){
            localStorage.setItem("user",JSON.stringify(response.data.user))
            navigate("/")

            }
            else{
                setError(response.data.message)
            }



        } catch (error) {
        // if there is a problem 
        // set loading to an empty string 
        setError("")
        setError(error.message)
            
        }



    }



    return(
        
        <div className="row justify-content-center mt-5 bic">
            <div className="col-md-6 card shadow p-4 ">
            <h2 className="text-success bg-color">Sign in</h2>
            {loading}
            {error}
            <form onSubmit={submit} className="form-container">
                <div className="form-group">
                <input
                type="email"
                className="form-control mb-3 product-container"
                placeholder="Email"
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                required
                />
                </div>
                
                <div className="form-group">
                <input
                type="password"
                className="form-control mb-3 product-container"
                placeholder="password"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                required
                />
                </div>
                <button type="submit" className="btn btn-primary">Sign In</button>

            </form>
            <p className="text-danger">
                Don't have an account ?
                <Link to = '/signup'>Sign Up</Link>
            </p>
                <p className="text-primary mt-3">
                    Want to browse available products?&nbsp;
                    <Link to="/">View Products</Link>
                </p>

        </div>

        </div>
    )
}
export default Signin