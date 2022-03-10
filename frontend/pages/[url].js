import {useRouter} from 'next/router'
import {useEffect} from 'react'

const ShortUrl = () => {
  
  

  useEffect(async () => {
  
    const last = window.location.href.split('/').pop();
    console.log("fetching from :", `http://localhost:3000/${last}`)
    const res = await fetch(`http://localhost:3000/${last}`)
    const data = await res.json()

    console.log("data:", data)
    if (data.url) {
      window.location.replace(data.url)
    }
  }, []);

  
  return (
    <div>
      <p>page not available</p>
    </div>
  )
}


export default ShortUrl

