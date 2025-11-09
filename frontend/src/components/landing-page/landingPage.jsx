import React from 'react'
import { BackgroundBeams } from '../ui/background-beams'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { Label } from '../ui/label'
import {toast } from 'react-hot-toast'
import {useState} from 'react'
import { Input } from '../ui/input'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {

const navigator = useNavigate()
const [formData, setFormData] = useState({
  name: '',
  email: '',
  role: '',
  password: ''
});
const [loginData,setLoginData] = useState({
  email:"",
  password:""
})

  const  handleSignup=async() =>{
    try {
  
      const res = await axios.post('http://localhost:5000/auth/signup', formData)
      console.log("response",res)
      if(res.data.success===false){
        toast.error(res.data.message)
      }
      else if(res.data.success===true){
        toast.success(res.data.message)
      }
    } catch (err) {
      console.error(err)
      console.log('Error response:', err.response.data.message)
      console.log('Error details:', err.message)
      const msg = err?.message || 'Signup failed'
      toast.error(err.response.data.message)
    }
  }
  const handleLogin=async()=>{
    console.log("login data",loginData);
    try{
      const res = await axios.post("http://localhost:5000/auth/login",loginData)
      console.log("login response ",res.data)
      if(res.data.success===true){
        if(res.data.token) {
          localStorage.setItem('token', res.data.token)
        localStorage.setItem("name",res.data.user.name)
        }
        toast.success(res.data.message || 'Logged in')
      navigator("/dashboard")
      }
      else if( res.data.success===false){
        toast.error(res.data.message || 'Login failed');
      }
    }
    catch(error){
      console.log("Error from login ",error)
      toast.error(error?.response?.data?.message || error.message || 'Login failed')
    }
    

  }


  return (
    <div className="h-screen w-full relative flex items-center justify-center bg-black">
        <BackgroundBeams />
        <div className="z-10 max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl  font-bold  text-white mb-6 bg-clip-text text-transparent">
            Clinic Management System
          </h1>
    
          <p className="text-base text-gray-400 leading-relaxed mb-6 max-w-2xl mx-auto">
            Experience seamless patient management, efficient appointment scheduling, and comprehensive 
            diagnostic tracking all in one intuitive platform. Our clinic management system empowers 
            healthcare professionals to focus on what matters most—providing exceptional patient care 
            while we handle the administrative complexities.
          </p>
          <div className="flex gap-4 justify-center">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Get Started</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-black border-gray-800 text-white">
                <form>
                  <DialogHeader>
                    <DialogTitle className="text-white">Get Started</DialogTitle>
                    <DialogDescription className="text-gray-400">
                      Create an account to access the platform.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gafp-3">
                      <Label htmlFor="name-1" className="text-gray-200 mb-2">Full Name</Label>
                      <Input id="name-1" name="name"onChange={(e)=>{
                        setFormData({...formData, name: e.target.value})
                      }} placeholder="Enter your name" className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-500" />
                    </div>
                    <div className="grid gafp-3">
                      <Label htmlFor="name-1" className="text-gray-200 mb-2">Email</Label>
                      <Input id="name-1" name="email" type="email"
                      onChange={(e)=>{
                        setFormData({...formData, email: e.target.value})
                      }}
                      placeholder="Enter your email" className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-500" />
                     </div>
                    <div className="grid gap-3">
  <Label htmlFor="role" className="text-gray-200">Role</Label>
  <select
    id="role"
    name="role"
    className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-500 p-2 rounded"
    onChange={(e) =>
      setFormData({ ...formData, role: e.target.value })
    }
  >
    <option value="">Select a role</option>
    <option value="doctor">Doctor</option>
    <option value="receptionist">Receptionist</option>
  </select>
</div>

                    <div className="grid gap-3">
                      <Label htmlFor="password-1" className="text-gray-200">Password</Label>
                      <Input id="password-1" name="password" type="password"
                      onChange={(e)=>{
                        setFormData({...formData, password: e.target.value})
                      }}
                       placeholder="Enter your password" className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-500" />
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline" className="border-gray-900 bg-gray-600 hover:bg-gray-700 hover:text-white">Cancel</Button>
                    </DialogClose>
                    <Button type="button" className="bg-white/90 text-black hover:bg-white/80" onClick={()=>handleSignup()}>Sign Up</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button>Log In</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-black border-gray-800 text-white">
                <form>
                  <DialogHeader>
                    <DialogTitle className="text-white">Welcome Back</DialogTitle>
                    <DialogDescription className="text-gray-400">
                      Log in to your account to continue.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-3">
                      <Label htmlFor="email-login" className="text-gray-200">Email or Full name</Label>
                      <Input id="email-login" name="email" type="email" placeholder="Enter your email" className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-500"
                       onChange={(e)=>
                         setLoginData({...loginData,email:e.target.value})
                      }
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="password-login" className="text-gray-200" >Password</Label>
                      <Input id="password-login" name="password" 
                      onChange={(e)=>
                         setLoginData({...loginData,password:e.target.value})
                      }
                      type="password" placeholder="Enter your password" className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-500" />
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                        
                        
                         <Button variant="outline" className="border-gray-900 bg-gray-600 hover:bg-gray-700 hover:text-white">Cancel</Button>
                
                    </DialogClose>
                     <Button type="button" className="bg-white/90 text-black hover:bg-white/80" onClick={()=>handleLogin()}>Log In</Button>

                  </DialogFooter>

                </form>
              </DialogContent>
            </Dialog>
          </div>
              
        </div>
    </div>
  )
}

export default LandingPage