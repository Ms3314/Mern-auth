import { useSelector } from "react-redux";

function Profile() {
  const {currentUser} = useSelector((state) => state.user)  
  return (
    <div className='max-w-lg mx-auto p-3 font-mono mb-10'>
      <h1 className='text-center font-bold text-4xl mt-10'>Profile</h1>
      <img src={currentUser.ProfilePicture} alt="a profile pic" className="w-[120px] cursor-pointer border-2 border-slate-800 h-[120px] object-cover rounded-full mx-auto mt-5"/>
      <form  action="http://localhost:5000/api/users/login" method="POST" className='flex px-10 pt-10 gap-3 flex-col  '>
        <input defaultValue={currentUser.username} className=' h-[70px] py-5 px-10 bg-slate-200 rounded-md ' type="text" name="username" placeholder="Username"/>
        <input defaultValue={currentUser.email} className=' h-[70px] py-5 px-10 bg-slate-200 rounded-md ' type="text" name="email" placeholder="Email"/>
        <input className=' h-[70px] py-5 px-10 bg-slate-200 rounded-md ' type="password" name="password" placeholder="Password" />
        <button className=' disabled:opacity-80 p-4 bg-slate-800 text-white rounded-md hover:opacity-95' >Submit</button>
      </form>
      <div className="flex justify-between mt-5 px-10  ">
        <span className="cursor-pointer text-red-700">Delete Account</span>
        <span className="cursor-pointer text-red-700">Sign Out</span>
      </div>
    </div>
  )
}

export default Profile
