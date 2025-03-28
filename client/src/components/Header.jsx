import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import profilepicture from  "../assets/blankprofile-picture-973460_960_720.webp"



function Header() {
  const {currentUser} = useSelector((state) => state.user)
 // console.log(currentUser , " the current user data")
  return (
    <div className='w-full bg-gray-600 text-white p-4  '>
        <div className='flex justify-between items-center max-w-6xl mx-auto'>
            <Link to='/'>
        <p className='text-2xl font-bold '>Auth app</p>
            </Link>
        <ul className='flex space-x-4  justify-center'>
            <Link to='/'>
            <li className="">Home</li>
            </Link>
            <Link to='/About'>
            <li className="">About</li>
            </Link>
            <Link to='/Profile'>
            {
              currentUser ? (
                <img src={currentUser.ProfilePicture || profilepicture
                } alt="" className="w-10 h-10 border-2 bg-green-200 rounded-full object-cover" />
              ) : (
                <li>Sign in</li>
              )
            }
            </Link>
        </ul>
        </div>
        
    </div>
  )
}

export default Header
