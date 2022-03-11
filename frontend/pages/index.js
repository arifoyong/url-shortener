import { useState } from 'react'
import Image from 'next/image'
import Layout from '../components/layout'
import {isURL} from '../helpers/helpers'

export default function Home() {
  const [url, setUrl] = useState("")
  const [shortUrl, setShortUrl] = useState("")

  const handleChange = e => {
    e.preventDefault()
    setUrl(e.target.value)
    e.target.value === "" && setShortUrl("")
  }

  const handleKeypress = e => {
    (e.key === "Enter")  && getAPi();
  };

  const getAPi = async () => {
    if (isURL(url)) {
      const res = await fetch(
        process.env.NEXT_PUBLIC_API,
        {
          body: JSON.stringify({ url: url }),
          headers: { 'Content-Type': 'application/json' },
          method: 'POST'
        }
      )

      const result = await res.json()
      setShortUrl(result.short)
    }  else {
      alert("Please enter a valid URL!")
    }
  }

  const showShortUrl = () => (
    <div className="flex flex-col mt-4">
      <div className="flex mx-auto justify-around">
        <div className="object-cover ">
          <Image src="/curve-arrow.png" alt="arrow" width="64" height="64" />
        </div>
        <div className="object-cover ">
          <Image src="/curve-arrow.png" alt="arrow" width="64" height="64" />
        </div>
        <div className="object-cover ">
          <Image src="/curve-arrow.png" alt="arrow" width="64" height="64" />
        </div>
      </div>
      <div className="flex-1 px-2 py-2 bg-white text-yellow-800 rounded-lg flex justify-between">
        <p>
          {shortUrl}
        </p>
        <button className= "hover:text-yellow-600 " 
              onClick={() => navigator.clipboard.writeText(shortUrl)}>
          copy
        </button>
      </div>
    </div>
  )

  return (
    <>
      <Layout>
        <div className="container px-2 pt-8 mx-auto flex flex-col md:flex-row justify-center">
          <div className="md:w-1/2 md:px-0 px-10 mx-auto">
            <div className="object-cover px-4 py-4">
                <Image src="/hero.svg" alt="hero" 
                      width="1280" 
                      height="800"/>
            </div>
          </div>
          <div className="flex flex-col md:w-1/2 px-4 py-2 mt-4">
            <p className="text-gray-500 font-medium italic">
              Shorten horrible URLs
            </p>
            <p className="font-bold text-4xl">
              Mini links, big results
            </p>
            <p className="mt-2">
              MINi helps you to take control of your web links. We provide the easiest way to shorten your links. 
            </p>

            <div className="flex mt-6 w-full">
              <input className="flex-1 px-2 py-2 rounded-lg" 
                  value={url} onChange={handleChange}
                  onKeyPress={handleKeypress}
                  type="text" placeholder="http://a-very-long-weblink.com/"/>
              <button className="bg-gray-600 hover:bg-gray-500 text-gray-100 px-4 py-2 ml-2 rounded-lg"
                      onClick={() => getAPi()}>
                minify
              </button>
            </div>
            { shortUrl && showShortUrl()}
          </div>
          
        </div>  
      </Layout>
    </>
  )
}
