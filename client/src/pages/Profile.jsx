import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {app} from "../firebase.js";
import { useDispatch } from "react-redux";
import { updateUserStart , updateUserSuccess , updateUserFailure } from "../redux/user/user.slice.js";
import { ref, uploadBytesResumable , getStorage, getDownloadURL } from "firebase/storage";


function Profile() {
  const dispatch = useDispatch()
  const {currentUser} = useSelector((state) => state.user)  
  const [Picture , setPicture] = useState(undefined)
  const [imageError , setImageError] = useState(false)
  const [imagePercentage , setImagePercentage] = useState(0)
  const [Form , setForm] = useState({})

  console.log(imagePercentage)
  const fileRef = useRef(null)
  useEffect(()=> {
    if (Picture) {
      handleFileUpload(Picture)
    }
  },[Picture])
  const handleFileUpload = async (Picture) => {
    const storage = getStorage(app)
    const filename = new Date().getTime() + Picture.name
    const storageRef = ref(storage , filename)
    const uploadTask = uploadBytesResumable(storageRef , Picture)
  
    uploadTask.on(
      'stage_changed',
      (snapShot) => {
        const progress = (snapShot.bytesTransferred / snapShot.totalBytes) * 100
        setImagePercentage(Math.round(progress))
      },
      (error) => {
          console.log(error)
          setImageError(true)
      },
      ()=> {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>{
          setForm({...Form , profilePicture : downloadUrl})
        })
      }
    )
  }
  function handleChange(e){ 
    setForm({...Form , [e.target.id] : e.target.value})
  }

  const handleSubmit =  async (e) => {
    e.preventDefault()
    dispatch(updateUserStart())
    try {
      const res = await fetch(`/api/user/update/${currentUser._id}` , {
        method : 'POST' , 
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify(Form)
      })
      const data =await res.json()
      if(data.success === true) dispatch(updateUserSuccess(data))
      else dispatch(updateUserFailure(data))
    } 
    catch (error) {
      dispatch(updateUserFailure(error))  
    }

  }

  

  return (
    <div className='max-w-lg mx-auto p-3 font-mono mb-10'>
      <h1 className='text-center font-bold text-4xl mt-10'>Profile</h1>
    <form  onSubmit={handleSubmit} action="http://localhost:5000/api/users/login" method="POST" className='flex px-10 pt-10 gap-3 flex-col  '>
      <input type="file" ref={fileRef} hidden accept="image/*" onChange={(e) => setPicture(e.target.files[0])}/>
      <img src={Form.profilePicture || currentUser.ProfilePicture} onClick={() => fileRef.current.click()} alt="a profile pic" className="w-[120px] cursor-pointer border-2  border-slate-800 h-[120px] object-cover rounded-full mx-auto mt-5" />
      {imageError ? (<p className=" text-md text-red-700 font-extrabold">Error Uploading Image (File size must be less than 2MB)</p>) 
      : imagePercentage > 0 && imagePercentage < 100 ? (<p className=" text-md text-blue-500 font-extrabold">{`The Image Uploaded is ${imagePercentage}% `}</p>)
      : imagePercentage === 100 ? (<p className=" text-md text-green-700 font-extrabold">Image Uploaded</p>)
      : ('')
    }


        <input onChange={handleChange} defaultValue={currentUser.username} className=' h-[70px] py-5 px-10 bg-slate-200 rounded-md ' type="text" id="username" placeholder="Username"/>
        <input onChange={handleChange} defaultValue={currentUser.email} className=' h-[70px] py-5 px-10 bg-slate-200 rounded-md ' type="text" id="email" placeholder="Email"/>
        <input onChange={handleChange} className=' h-[70px] py-5 px-10 bg-slate-200 rounded-md ' type="password" id="password" placeholder="Password" />
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
