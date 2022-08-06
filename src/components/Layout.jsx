import { Outlet } from "react-router-dom"

const Layout = () => {
  return (
    <div
      className={`
      flex justify-center items-center bg-primary text-white relative 
      h-auto sm:h-auto md:h-screen lg:h-screen xl:h-screen
      `}
    >
      <div
        className={`flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row
        h-full
        items-center
        w-screen 
        justify-center 
        z-10 overflow-hidden  `}
      >
        <Outlet />
      </div>
    </div>
  )
}

export default Layout

export const RightLayout = ({ children }) => {
  return (
    <div
      className={`w-full sm:w-full md:w-full lg:w-[40%] xl:w-[30%] 
          h-full sm:h-full md:h-full lg:h-[550px] xl:h-[550px]
          bg-tertiary
          relative 
          shadow-lg 
          rounded-none sm:rounded-none md:rounded-none lg:rounded-r-xl xl:rounded-r-xl`}
    >
      <img
        src="/images/inkpen-potrait.png"
        alt=""
        className="w-[46px] z-10 absolute -right-16 top-6 hidden sm:hidden md:block lg:block xl:block"
      />
      {children}
    </div>
  )
}

export const BlankSpaces = () => {
  return (
    <>
      <div className="h-20"></div>
    </>
  )
}
