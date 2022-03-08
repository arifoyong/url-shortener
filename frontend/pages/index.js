import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'

export default function Home() {
  const [url, setUrl] = useState("")
  const [shortUrl, setShortUrl] = useState("http://localhost:3000/test")

  const handleChange = (e) => {
    e.preventDefault()
    setUrl(e.target.value)
  }

  const getAPi = async () => {
    if (url === "") {
      console.log("empty url")
      return
    }

    const res = await fetch(
      `http://localhost:3000/api/v1`,
      {
        body: JSON.stringify({
          url: url
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      }
    )

    const result = await res.json()
    setShortUrl(result.short)
  }

  const showShortUrl = () => (
    <div className="flex flex-col mt-4">
      <p className="py-1 font-semibold">Your mini url:</p>
      <p className="flex-1 px-2 py-2 bg-white rounded-lg">
        {shortUrl}
      </p>
    </div>
  )

  return (
    <>
      <Head>
        <title>Mini URL</title>
        <meta name="description" content="Mini URL - URL shortening service" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col h-screen max-w-screen-xl mx-auto">
        <nav className="bg-gray-100 px-4 py-4">
          <div className="px-4 text-yellow-700 font-bold">MINI</div>
        </nav>

        <main className="bg-yellow-200 flex-1 pt-8">
          <div className="container md:px-6 py-4 mx-auto flex flex-col  md:flex-row  ">
            <div className="md:w-1/3 px-6 py-2 mx-auto">
              <div className="h-72 w-96 relative">
                <Image src="/hero.svg" alt="hero" layout="fill" objectFit="cover"/>
              </div>
            </div>
            <div className="flex flex-col md:w-2/3 md:px-8 py-2 mt-4 justify-center">
              <p className="font-bold text-4xl">
                Mini links, big results
              </p>
              <p className="mt-2">
                URL shortening service to help you grow your brand
              </p>

              <div className="flex mt-6 w-full">
                <input className="flex-1 px-2 py-2 rounded-lg" 
                    value={url} onChange={handleChange}
                    type="text" placeholder="http://a-very-long-weblink.com/"/>
                <button onClick={() => getAPi()} className="bg-gray-500 text-gray-100 px-4 py-2 ml-2 rounded-lg">
                  minify
                </button>
              </div>
              { shortUrl && showShortUrl()}
            </div>
            
          </div>  
     
   
        </main>

        <footer className="bg-yellow-600 px-4 py-2 flex justify-end">
          <div className="text-white font-semibold text-sm">
            mini@copyright
          </div>
        </footer>
      </div>

    </>
  )
}
