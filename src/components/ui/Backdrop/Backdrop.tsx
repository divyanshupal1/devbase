export const Backdrop = ({children}:{children?:React.ReactNode}) => {
  return (
    <div className="w-screen h-[110vh] z-50 bg-black absolute top-[-10vh] left-0 backdrop-blur-sm bg-opacity-70 grid place-content-center">
            {children}
    </div>
  )
}
