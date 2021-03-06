import Navbar from "./navbar"
import Sidebar from "./sidebar"
export const Layout = ({ children }) => {
    return (
        <>
            <div className="flex items-start">
                <Sidebar />
                <div className="flex flex-col h-screen pl-0 w-full lg:space-y-4 lg:w-[calc(100%-14rem)]">
                    <Navbar />
                    <main className="h-screen overflow-hidden pb-36 pt-8 px-2">
                        {children}
                    </main>
                </div>
            </div>
        </>
    )
}
