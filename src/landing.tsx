import Navbar from "./components/Navbar";

export default function Landing() {
    return (
        <div className="bg-black h-screen">
            <Navbar />
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-white text-4xl font-bold">Fullyhac</h1>
            </div>
        </div>
    )
}
