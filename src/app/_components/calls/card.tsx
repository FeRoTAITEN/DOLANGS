import Image from 'next/image'
import React from 'react'
interface User {
    name: string;
  }
  
  interface CardProps {
    user: User;
  }

const card:React.FC<CardProps>  = ({user}) => {
  return (
    <div className='caller-card flex flex-col items-center gap-5 rounded-md justify-center bg-slate-300 w-2/5 max-w-96 min-h-64' style={{backgroundColor:"#D9D9D9"}}>
      <Image className=' rounded-full ' width="100" height={100} alt="User's Profile Picture" src="https://placehold.co/500"></Image>
      <p>{user.name}</p>
    </div>
  )
}

export default card
