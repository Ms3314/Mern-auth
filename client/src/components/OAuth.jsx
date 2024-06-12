import { GoogleAuthProvider, signInWithPopup , getAuth } from 'firebase/auth'  
import { app } from '../firebase'
import {useDispatch} from 'react-redux'
import { signInSuccess } from '../redux/user/user.slice'

function OAuth() {
  const dispatch = useDispatch()
    const handleGoogleClick = async () => {
         try {
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)
            const result = await signInWithPopup(auth , provider)
            const res  = await fetch('/api/auth/google' , {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                name : result.user.displayName,
                email : result.user.email,
                photo : result.user.photoURL
              })
            })
            const data = await res.json();
            console.log(data);
            dispatch(signInSuccess(data));
         } catch (error) {
            console.log("could not log in with google");
         }
    }
  return (
    <div>
      <button onClick={handleGoogleClick} type="button" className='my-1  p-4 px-[134px] font-sans font-xl bg-red-800 text-white rounded-md hover:opacity-95' >Sign In with Google</button>
    </div>
  )
}

export default OAuth
