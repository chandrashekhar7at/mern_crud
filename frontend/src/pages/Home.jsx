import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast';

const Home = () => {
  const [userdata,setUserdata] = useState('')
  const [formclickedstatus,setFormClickedStatus] = useState(false)
  const [userid,setUserId] = useState('')
  const [username,setUsername] = useState('')
  const [email,setEmail] = useState('')
  const [phone,setPhone] = useState('')
  const [formbtnname,setFormButtonName] = useState('')
  const [formvisiblestatus,setFormVisibleStatus] = useState(false)
  useEffect(()=>{
    const getuserdata = async()=>{
      try {
        const response = await axios.get(`${window.location.origin}/api/${import.meta.env.VITE_USERDATA}`)
        setUserdata(response.data.result)
        console.log(response.data.result.length)
      } catch (error) {
        console.log(error)
      }
    }
    getuserdata()
  },[formclickedstatus])
  const handleAddUser = ()=>{
    setFormButtonName('createuser')
    setFormVisibleStatus(!formvisiblestatus)
  }
  const handleformSubmit = async(e)=>{
    e.preventDefault()
    if(e.target[3].value === 'Add User'){
      try {
        const result = await axios.post(`${window.location.origin}/api/${import.meta.env.VITE_USERCREATE}`,{
          username,email,phone
        })
        if(result.data.success){
          console.log(result.data.message)
          setUsername('')
          setEmail('')
          setPhone('')
          setFormVisibleStatus(!formvisiblestatus)
        }
        console.log(result.data.message)
      } catch (error) {
        console.log(error)
      }
    }else if(e.target[3].value === 'update'){
      try {
        const result = await axios.put(`${window.location.origin}/api/${import.meta.env.VITE_UPDATEUSERS}/${userid}`,{
          username,email,phone
        })
        if(result.data.success){
          console.log(result.data.message)
          setUsername('')
          setEmail('')
          setPhone('')
          setFormVisibleStatus(!formvisiblestatus)
        }
        console.log(result.data.message)
      } catch (error) {
        console.log(error)
      } 
    }
    setFormClickedStatus(!formclickedstatus)
  }
  const handleEdit = async(e,userId)=>{
    e.preventDefault()
    setUserId(userId)
    setFormButtonName('update')
    setFormVisibleStatus(!formvisiblestatus)
    try {
      const response = await axios.get(`${window.location.origin}/api/${import.meta.env.VITE_GETSINGLEUSER}/${userId}`)
      if(response.data.success){
        setUsername(response.data.result.username)
        setEmail(response.data.result.email)
        setPhone(response.data.result.phone)
      }
    } catch (error) {
      console.log(error)
    }

  }
  const handleDelete = async(e,userId)=>{
    e.preventDefault()
    try {
      const response = await axios.delete(`${window.location.origin}/api/${import.meta.env.VITE_USERDELETE}/${userId}`)
      if(response.data.success){
        console.log(response.data.message)
        setFormClickedStatus(!formclickedstatus)
      }
      console.log(response.data.message)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <button className='bg-blue-500 text-white mx-[242px] mt-6 rounded-sm p-1' onClick={()=>{handleAddUser()}}>add user</button>
      {/* <h1>{process.env.REACT_APP_USERDATA}</h1> */}
      <form onSubmit={handleformSubmit} className={`border border-blue-950 max-w-[490px] mx-auto p-2 mt-5 ${formvisiblestatus && (formbtnname === 'createuser' || formbtnname === 'update')?'block':'hidden'}`}>
        <div className='flex flex-col'>
          <label htmlFor="username">Username</label>
          <input type="text" id='username' name="username" value={username} onChange={e=>setUsername(e.target.value)} className='border border-blue-900' placeholder='Username'/>
        </div>
        <div className='flex flex-col'>
          <label htmlFor="email">email</label>
          <input type="email" id='email' name="email" value={email} onChange={e=>setEmail(e.target.value)} className='border border-blue-900' placeholder='email'/>
        </div>
        <div className='flex flex-col'>
          <label htmlFor="phone">phone</label>
          <input type="phone" id='phone' name="phone" value={phone} onChange={e=>setPhone(e.target.value)} className='border border-blue-900' placeholder='phone'/>
        </div>
        <div className='flex flex-col'>
          <input type="submit" value={formbtnname === 'createuser' ?'Add User':'update'} className='border border-blue-600 min-w-56 mx-auto mt-5 bg-blue-600 text-white'/>
        </div>
      </form>
      <table className='table-auto border border-separate border-spacing-1 mx-auto mt-3'>
        <tr>
          <th className="border border-slate-300">sr no.</th>
          <th className="border border-slate-300">Username</th>
          <th className="border border-slate-300">Email</th>
          <th className="border border-slate-300">Phone</th>
          <th className="border border-slate-300">Edit</th>
          <th className="border border-slate-300">Delete</th>
        </tr>
        {
          userdata.length > 0?userdata.map((userdata,id)=>(
            <tr key={id}>
              <td className="border border-slate-300">{id+1}.</td>
              <td className="border border-slate-300">{userdata.username}</td>
              <td className="border border-slate-300">{userdata.email}</td>
              <td className="border border-slate-300">{userdata.phone}</td>
              <td className="border border-slate-300">
                <button onClick={(e)=>handleEdit(e,userdata._id)}>Edit</button>
              </td>
              <td className="border border-slate-300">
                <button onClick={(e)=>handleDelete(e,userdata._id)}>delete</button> 
              </td>
            </tr>
          )):(<h1>No data</h1>)
        }
      </table>
    </>
  )
}

export default Home