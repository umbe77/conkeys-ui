import Navbar from "./navbar"
import Sidebar from "./sidebar"
export default function Layout({ children }) {
    return (
        <>
            <div className="flex items-start">
                <Sidebar />
                <div className="flex flex-col h-screen pl-0 w-full lg:space-y-4 lg:w-[calc(100%-16rem)]">
                    <Navbar />
                    <main className="h-screen overflow-hidden pb-36 pt-8 px-2 md:pb-8 md:pt-4 md:px-8 lg:pt-0">
                        {children}
                    </main>
                </div>
            </div>
        </>
    )
}
