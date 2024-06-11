import { useState } from 'react'
import {Link , useNavigate} from 'react-router-dom'
import { signInFailure, signInStart, signInSuccess } from '../redux/user/user.slice'
import {useDispatch, useSelector} from 'react-redux'




function SignIn() {
  const [formData , setFormData] = useState({})
  const {loading , error} = useSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()


   function handleChange(e){
    setFormData({...formData,[e.target.name]:e.target.value})
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
     try {
      dispatch(signInStart())
      const res = await fetch("/api/auth/signin" , {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      console.log(data) 
      if (data.success === false) {
        dispatch(signInFailure(data))
        return 
      }
      dispatch(signInSuccess())
      navigate("/")
    } catch (error) {
      dispatch(signInFailure(error.message))
      
    }
  }
  return (
    <div className='max-w-lg mx-auto p-3 font-mono'>
      <h1 className='text-center font-bold text-4xl mt-10'>Sign In</h1>
      <form onSubmit={handleSubmit} action="http://localhost:5000/api/users/login" method="POST" className='flex px-10 pt-10 gap-3 flex-col  '>
        <input className=' h-[70px] py-5 px-10 bg-slate-200 rounded-md ' type="text" name="email" placeholder="Email" onChange={handleChange} />
        <input className=' h-[70px] py-5 px-10 bg-slate-200 rounded-md ' type="password" name="password" placeholder="Password" onChange={handleChange} />
        <button className=' disabled:opacity-80 p-4 bg-slate-800 text-white rounded-md hover:opacity-95' >{loading ? "Loading..." : "Submit"}</button>
      </form>
      <div className='px-10 pt-1 text-[14px] '>
        <span>Dont Have an account? </span>
        <Link to={'/sign-up'}>
        <span className='text-blue-500 font-400'>Create An Account</span>
        </Link>
      </div>
      <p className='text-red-500 ml-10 mt-5 font-semibold'>{error ? error.message || "Something went wrong!!" : ""}</p>
    </div>
  )
}

export default SignIn
