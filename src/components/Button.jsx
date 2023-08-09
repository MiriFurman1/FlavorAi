import React from 'react'

function Button({content,setChosenModel}) {
  return (
    <button className="bg-emerald-700 m-5" onClick={()=>{
      {setChosenModel&&setChosenModel(content)}}
    }>{content}</button>
  )
}

export default Button