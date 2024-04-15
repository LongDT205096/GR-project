import Link from "next/link"

const Notlogin = () => {
  return (
    <div  className='h-[100vh]  md:w-full w-[98%] mx-auto overflow-hidden'>
         <div className="w-full h-full flex items-center justify-center">
<div className="block max-w-xl p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">Hi Mate!</h5>
    <p className="font-normal text-gray-700 dark:text-gray-400">Unlock your cinematic universe! Log in now to access your favorite movies, series, and your personalized liked list</p>
    <div className=' border-t-2 p-2 w-full mt-3 h-full flex items-center justify-center'>
        <Link href={'/login'}>
    <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Log In</button>
    </Link>
    </div>
</div>
</div>

    </div>
  )
}

export default Notlogin
