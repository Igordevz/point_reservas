import React from 'react'
import BarLoader from 'react-spinners/BarLoader'

export default function Loading() {
  return (
    <div className='flex w-full h-screen items-center justify-center flex-col gap-3' >
      <h1>carregando informações</h1>
          <BarLoader width={"40%"} height={2} color="yellow" />
    </div>
  )
}
