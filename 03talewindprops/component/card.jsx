import React from 'react'

function card({channel}) {
    console.log(channel)
  return (
  <div class="flex flex-col items-center p-7 rounded-2xl">
  <div>
    <img class="size-48 shadow-xl rounded-md" alt="" src="https://images.unsplash.com/photo-1787057857057-de005ca82478?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
  </div>
  <div class="flex"> 
    <span class="font-medium text-sky-500">{channel}</span>
    
  </div>
</div>
  )
}

export default card