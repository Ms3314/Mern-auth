import {Link} from 'react-router-dom'

function SignUp() {
  return (
    <div className='max-w-lg mx-auto p-3'>
      <h1 className='text-center font-bold text-4xl mt-10'>SignUp</h1>
      <form action="http://localhost:5000/api/users/login" method="POST" className='flex px-10 pt-10 gap-3 flex-col  '>
        <input className=' h-[70px] py-5 px-10 bg-slate-200 rounded-md ' type="text" name="username" placeholder="Username" />
        <input className=' h-[70px] py-5 px-10 bg-slate-200 rounded-md ' type="text" name="email" placeholder="Email" />
        <input className=' h-[70px] py-5 px-10 bg-slate-200 rounded-md ' type="password" name="password" placeholder="Password" />
        <button className='disabled:opacity-80 p-4 bg-slate-800 text-white rounded-md hover:opacity-95' >Submit</button>
      </form>
      <div className='px-10 pt-1 text-[14px] '>
        <span>Have an account? </span>
        <Link to={'/sign-in'}>
        <span className='text-blue-500 font-400'>  Sign In</span>
        </Link>
      </div>
    </div>
  )
}

export default SignUp
