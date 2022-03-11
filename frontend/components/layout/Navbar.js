import Link from 'next/link'
const Navbar = () => {
  return (
    <div className="flex items-start justify-between py-4 bg-gray-50">     
      <div className="px-4 text-yellow-700 font-bold hover:text-yellow-500">
        <Link href="/">
          <a>  MINi </a>
        </Link>
      </div>       
    </div>
  )
}

export default Navbar