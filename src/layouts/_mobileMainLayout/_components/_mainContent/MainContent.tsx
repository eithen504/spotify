import { Outlet } from "react-router-dom"

const MainContent = () => {
    return (
        <div className="mb-[125px] bg-[#121212]">
            <Outlet />
        </div>
    )
}

export default MainContent