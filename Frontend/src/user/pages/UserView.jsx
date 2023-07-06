import React from 'react'

export const UserView = () => {

const token= localStorage.getItem("token");

  return (
    <div>{token}</div>
    
  )
}
