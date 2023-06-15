"use client"
import React, {FormEvent, useEffect, useState} from 'react'
import SVG from 'react-inlinesvg'
import QRCode from 'qrcode'
import Image from 'next/image'



export default function Home() {
  const [qrCode, setQrCode] = useState<string>('')
  const [qrCodeImage, setQrCodeImage] = useState<any>(
    null
  )

  const generateQrCode = async (url:string) : Promise<any>  => {
    const response = await fetch(`https://api.api-ninjas.com/v1/qrcode?format=png&data=${url}`, {
      method: 'GET',
      headers: {
       "Content-Type": "application/json",
       "X-Api-Key" : process.env.API_KEY || ''
      },
      
      
    })

    const data = await response.json() || 'empty';
    
    console.log(data.toString())
    // setQrCodeImage(data)
  
    QRCode.toFileStream(data, './qr.png', {}, function (err:any) {
      if (err) throw err
      console.log('done')
    })

    return data
  }

  const submitQrCode = (e:FormEvent) : void => {
    e.preventDefault();
    
  }
  useEffect(() => {
    generateQrCode('https://www.google.com')
    

  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-4">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <div className='flex flex-col justify-center items-center'>
          <h1 className="text-2xl font-bold">QR Code App.</h1>
          <div className='border-xl mt-2 w-full text-center bg-slate-900 rounded'>
              <form className='grid grid-cols-6 gap-3 items-center text-black p-3'>
                <input type="text" className='col-span-3 p-3 border' placeholder='Paste your website here...' value={qrCode} onChange={(e) => { setQrCode(e.target.value) }}/>
                <div  className='col-span-3 p-3 mx-3 h-32'>
                  { qrCodeImage ? <Image  src={qrCodeImage} alt='whatever'/> : <p className='text-center text-white'>No QR Code</p>}
                </div>
                <button className='col-span-3 p-3 border text-white' onClick={(e) => { submitQrCode(e) }}>Generate</button>
              </form>
          </div>
        </div>
      </div>
    </main>
  ) 
}
