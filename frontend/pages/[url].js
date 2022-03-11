import {useEffect} from 'react'
import Layout from '../components/layout'

const ShortUrl = () => {
  useEffect( () => {
    async function fetchData() {
      const shortURL = window.location.href.split("/").pop();
      console.log(process.env.NEXT_PUBLIC_API )
      const res = await fetch(process.env.NEXT_PUBLIC_API + "/" + shortURL)
      const data = await res.json()
  
      if (data.url) {
        window.location.replace(data.url)
      }
    }

    fetchData()
  }, []);

  return (
      <Layout>
        <div className="flex flex-col items-center justify-center mx-auto">
          <p className="text-5xl font-bold py-4">
            Page Not Found
          </p>
          <p className="text-xl">
            Ops the page you are looking is not available.
          </p>          
        </div>
    </Layout>
  )
}


export default ShortUrl

