import NormalNavbar from "@/components/Navbar/NormalNavbar.tsx/NormalNavbar"
import { UserRole } from '@/types/enum.types'
// import SideLayout from '../Layout/SideNavbar/SideLayout'
import { useAuth } from '@/store/auth.store'


const Navbar = () => {
    const {role} = useAuth()
  return (
    <>
        {role == UserRole.CUSTOMER || role==UserRole.ANONYMOUS ?(<NormalNavbar/>):(null)}
    </>
  )
}

export default Navbar