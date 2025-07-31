import { Outlet } from "react-router-dom"

const MainContent = () => {
    return (
        <div className="mb-[125px] bg-[#121212]">
            <div className="p-4">
                <Outlet />
            </div>
        </div>
    )
}

export default MainContent