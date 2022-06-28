import {React, useEffect, useState} from 'react'
import queryString from 'query-string'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

const baseURL = "http://localhost:3500/api/v1/auth"

function ResetPassword() {
  
  const location = useLocation()
  const navigate = useNavigate()
  const [invalidUser, setInvaliduser] = useState('')
  const [busy, setBusy] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [newPassword, setNewPassword] = useState({
    password: '',
    confirmPassword: ''
  })
  
  const {token, id} = queryString.parse(location.search)

  const verifyToken = async () =>{
      try {
        const {data} = await axios(`${baseURL}/verify-token?token=${token}&id=${id}`)
         setBusy(false)
      } catch (error) {
        if(error?.response?.data){
          const {data} = error.response
          if(!data.success) return setInvaliduser(data.error)
          return console.log(error.response.data)
        }
        console.log(error)
      }

        }
  useEffect(() =>{
    verifyToken()
  }, [])

  const handleOnChange = ({target}) =>{
     const {name, value} = target
     setNewPassword({...newPassword, [name]: value})
  }

  const handleSubmit = async (e) =>{
    e.preventDefault()
    const {password, confirmPassword} = newPassword
    if(password.trim().length == '') return setError('Password cannot be empty')
    if(confirmPassword.trim().length == '') return setError('Confirm Password field cannot be empty')
    if(password.trim().length < 8) return setError('Password cannot be less than 8 characters')
    if(password.trim() !== confirmPassword.trim()) return setError('Password confirmation failed (mismatch) error!')

    try {
      const {data} = await axios.post(`${baseURL}/reset-password?token=${token}&id=${id}`, {password})
      console.log(data)
      setBusy(false)
      if(data.success){
         navigate('/reset-password')
        setSuccess(true)
      }
    } catch (error) {
      setBusy(false)
      if(error?.response?.data){
        const {data} = error.response
        if(!data.success) return setError(data.error)
        return setError(error.response.data)
      }
      return setError(error)
    }
  }
   if(success) return <div className="max-w-screen-sm m-auto pt-40">
       <h1 className=' bg-red text-2xl text-gray-500 pb-3 text-center'>Your password has been reset successfully!</h1>
   </div>
  
  if(invalidUser) return <div className="max-w-screen-sm m-auto pt-40">
  <h1 className=' bg-red text-2xl text-gray-500 pb-3 text-center'>{invalidUser}</h1>
</div>
  
  if(busy) return <div className="max-w-screen-sm m-auto pt-40">
  <h1 className=' bg-red text-xl text-gray-500 pb-3 text-center'>
    Verifying reset token, please wait...
  </h1>
</div>

  return (
    <div className="w-full darkBG min-h-screen clear-both p-1">
    <div className="max-w-[95%] mt-[15%] mx-auto bg-white p-6 py-10 rounded-[10px] lg:mt-[5%] lg:max-w-[600px]">
      <div className="gradient-text-1 text-center pb-4">
        <h1>Password Reset...</h1>
      </div>
      <div className="grid">
   
      {error && <p className="text-center mb-3 p-3 text-white bg-red-500">
        {error}
      </p>
      }
      <input type="password" name="password"  onChange={handleOnChange} placeholder="***************" className="inputStyle-2" />
      <input type="password" name="confirmPassword" onChange={handleOnChange} placeholder="***************" className="inputStyle-2" />
      <button
            className="w-[95%] border-md m-auto mt-3 lg:m-auto"
            onClick={handleSubmit}
          >
            Reset Password
          </button>
    
    </div>
  </div>
  </div>
  )
}

export default ResetPassword