import { useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

const Signup=()=>{

    const[username,setUsername]=useState("")
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const[phone,setPhone]=useState("")

    // user experience 
    const [success,setSuccess] = useState("")
    const [error,setError] = useState("")
    const[loading,setLoading] = useState("")

    const submit =async(e)=>{
        e.preventDefault()

        // set loading hook variable to show loading message 
        setLoading("Please wait as we upload your data")
        try {
            // this is like a jerrican(container)
            const data = new FormData() 
            data.append("username",username)
            data.append("email",email)
            data.append("password",password)
            data.append("phone",phone)
            
            // we use axios to post the data to our backend API 
            const response = await axios.post(
                "https://polymerthcedric.pythonanywhere.com/api/signup",
                data
            )

            // set loading to an empty string 
            setLoading("")
            setSuccess(response.data.success)



        } catch (error) {
          setLoading("")  //reset the loading to an empty sting to remove "please wait...." 
          setError(error.message)
        }


    }


    return(
        <div className="row justify-content-center mt-4 bic">
            <div className="col-md-6 card shadow p-4 ">

                <h2 className="text-success bg-color">Signup</h2>
                    {loading}
                    {error}
                    {success}

                 <form onSubmit={submit}className="form-container ">
                   <div className="form-group">
                   <input 
                    type="text"
                    className="form-control product-container"
                    placeholder="Enter Username" 
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}
                    required 
                    />
                    
                   </div>
                    
                   <div className="form-group">
                   <input 
                    type="email"
                    className="form-control product-container"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    required
                    />
                   </div>
                    
                   <div className="form-group">
                   <input 
                    type="password" 
                    className="form-control product-container"
                    placeholder="Enter password"
                    onChange={(e)=>setPassword(e.target.value)}
                    required
                    />
                   </div>
        
                    <div className="form-group">
                    <input 
                    type="text" 
                    className="form-control product-container"
                    placeholder="Enter Phone"
                    onChange={(e)=>setPhone(e.target.value)}
                    required
                    />
                    </div>
                    
                    <button type="submit" className=" btn btn-primary">Signup</button>

                </form>
                <p className="text-dark">
                    Already have an account ?
                    <Link to ='/signin'>signin</Link>
                </p>


            </div>
        </div>
    )
}

export default Signup
