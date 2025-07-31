export default function AuthLayout( {children, title} ){
    return(
        <div className="flex items-center justify-center min-h-screen bg-black">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-6">{title}</h1>
                {children}
            </div>
        </div>
    )
}