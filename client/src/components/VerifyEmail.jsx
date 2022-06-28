import {React, useState, useEffect} from 'react'
import {useLocation, useNavigate } from 'react-router-dom'
import FlashMessage from 'react-flash-message'
import queryString from 'query-string'
import axios from 'axios'

const baseURL ="http://localhost:3500/api/v1/auth"


function VerifyEmail (){

    const location = useLocation()
    const {userId, otp} = queryString.parse(location.search)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [busy, setBusy] = useState(true)
    const navigate = useNavigate()


     const verify_user_email = async () =>{
       try {
        const {data} = await axios(`${baseURL}/verify-email?userId=${userId}&otp=${otp}`)
        if(!data.success) return setError(true)
         
          setBusy(false)
          return setSuccess(true)
          
        } catch (error) {
          setBusy(false)
          if(error?.response?.data){
            const {data} = error.response
          if(!data.success) return setError(data.response.error)
           return console.log(error.response.data)
        }
        return console.log({error})
       }
     }

      useEffect(() => {
        verify_user_email()
      }, [])


      if(busy) return <div className="max-w-screen-sm m-auto pt-40">
      <h1 className=' bg-red text-xl text-gray-500 pb-3 text-center'>
      Verifying your email, please wait...
      </h1>
    </div>

      if(success) return <div className="max-w-screen-sm m-auto pt-40">
       <h1 className=' bg-red text-xl text-gray-500 pb-3 text-center'>
     Email verification was successful, you may now login...
      </h1>
      </div>
      //navigate("/login")


  return (
    <div className='max-w-screen-sm mx-auto mt-50'>
       
      {error &&<FlashMessage duration={5000} ><p className="text-center mb-2 pt-2 text-red-500">{error}</p></FlashMessage> }
   
      {success &&<FlashMessage duration={5000} ><p className="text-center mb-2 pt-2 text-green-500">{success}</p></FlashMessage> }
       

    </div>
  )
}

export default VerifyEmail