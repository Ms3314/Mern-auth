import { useState } from 'react'
import {Link} from 'react-router-dom'

function SignUp() {
  const [formData , setFormData] = useState({})
  const [loading , setLoading] = useState(false)
  const [error , setError] = useState(false)


   function handleChange(e){
    setFormData({...formData,[e.target.name]:e.target.value})
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    //setLoading(true)
      // const res = await fetch("/api/auth/signup" , {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(formData)})
      //   const data = await res.json()
      //   console.log(data)
     try {
      setLoading(true)
      const res = await fetch("/api/auth/signup" , {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      console.log(data)
      setLoading(false)
      if (data.success === false) {
        setError(true)
        return 
      }
      setError(false)
    } catch (error) {
      setError(true)
      setLoading(false)
    }
  }
  return (
    <div className='max-w-lg mx-auto p-3'>
      <h1 className='text-center font-bold text-4xl mt-10'>SignUp</h1>
      <form onSubmit={handleSubmit} action="http://localhost:5000/api/users/login" method="POST" className='flex px-10 pt-10 gap-3 flex-col  '>
        <input className=' h-[70px] py-5 px-10 bg-slate-200 rounded-md ' type="text" name="username" placeholder="Username" onChange={handleChange} />
        <input className=' h-[70px] py-5 px-10 bg-slate-200 rounded-md ' type="text" name="email" placeholder="Email" onChange={handleChange} />
        <input className=' h-[70px] py-5 px-10 bg-slate-200 rounded-md ' type="password" name="password" placeholder="Password" onChange={handleChange} />
        <button className=' disabled:opacity-80 p-4 bg-slate-800 text-white rounded-md hover:opacity-95' >{loading ? "Loading..." : "Submit"}</button>
      </form>
      <div className='px-10 pt-1 text-[14px] '>
        <span>Have an account? </span>
        <Link to={'/sign-in'}>
        <span className='text-blue-500 font-400'>Sign In</span>
        </Link>
      </div>
      <p className='text-red-500 ml-10 font-semibold'>{error && "Something went wrong!!"}</p>
    </div>
  )
}

export default SignUp
