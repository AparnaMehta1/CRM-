import { CSidebar, CNavItem, CNavTitle, CSidebarNav, CSidebarToggler, CFormSwitch } from '@coreui/react'
import HomeIcon from '@mui/icons-material/Home';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import Switch from '@mui/material/Switch';
import LogoutIcon from '@mui/icons-material/Logout';
import '../Styles/Sidebar.css'

export const Sidebar = ({check, change}) => {
    const logoutFn =()=>{
        localStorage.clear()
        window.location.assign('/')
    }

    const label = { inputProps: { 'aria-label': 'Switch demo' } };

    return (
        <div>
            <CSidebar unfoldable className="bg-black vh-100 text-light">
            <CSidebarNav>
                <CNavItem className="bg-dark text-center d-flex">
                    <SignalCellularAltIcon className='mx-2 my-1'/>
                    <h5 className="mx-5 my-1 fw-bolder">INSTACART</h5>
                </CNavItem>
                <CNavTitle className="">
                    A CRM App for all your needs...
                </CNavTitle>
                <CNavItem className="d-flex">
                    <HomeIcon className='mx-2 my-1'/>
                    <div className="mx-5 my-1 fw-bold">Home</div>
                </CNavItem>
                <CNavItem className="d-flex">
                    <LogoutIcon className='mx-2 my-1'/>
                    <div className="logout mx-5 my-1 fw-bold" onClick={()=>logoutFn()}>Logout</div>
                </CNavItem>
                <Switch {...label} className='my-3 mx-2' id="formSwitchCheckDefault" checked={check} onClick={change}/>
            </CSidebarNav>
            <CSidebarToggler />
        </CSidebar>
        </div>
    )
}
