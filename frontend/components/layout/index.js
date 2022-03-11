import Head from 'next/head'
import Navbar from './Navbar'
import Footer from './Footer'

const Layout = ({children, ...customMetaData}) => {
  const meta = {
    title: "Mini - URL Shortening Service",
    description: "URL Shortening Service",
    image: "",
    type: "website",
    ico: "/favicon.ico",
    ...customMetaData
  }

  return (
    <>
      <Head>
        <title>{meta.Title}</title>
        <meta name="robots" content="follow, index" />
        <meta name="description" content={meta.description} />
        <link rel="icon" href={meta.ico} />

        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Arif Oyong" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />

        {meta.date && (<meta property="article:published_time" content={meta.date} />)}
      </Head>

      <div className="flex flex-col max-w-screen-lg min-h-screen mx-auto bg-gradient-to-br from-yellow-300 to-red-200">
          <Navbar />

          <div className="flex-1   flex">
              {children}  
              
               
          </div>

          <Footer />
      </div>
    </>
  )
}

export default Layout
