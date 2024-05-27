import { Link } from "react-router-dom"

function Header() {
  return (
    <div className='w-full bg-gray-600 text-white p-4  '>
        <div className='flex justify-between items-center max-w-6xl mx-auto'>
            <Link to='/'>
        <p className='text-2xl font-bold '>Auth app</p>
            </Link>
        <ul className='flex space-x-4'>
            <Link to='/'>
            <li>Home</li>
            </Link>
            <Link to='/About'>
            <li>About</li>
            </Link>
            <Link to='/Sign-in'>
            <li>Sign-in</li>
            </Link>
        </ul>
        </div>
        
    </div>
  )
}

export default Header
