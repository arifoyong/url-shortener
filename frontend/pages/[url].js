import {useRouter} from 'next/router'
import {useEffect} from 'react'

const ShortUrl = () => {
  const router = useRouter()
  const {url} = router.query

  useEffect(() => {
    router.push({
      pathname: 'http://www.nba.com'
    });

 
  }, []);

  
  
  return <div></div>
}


export default ShortUrl

