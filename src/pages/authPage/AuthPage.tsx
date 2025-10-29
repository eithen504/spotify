import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useCheckAuth, useVerifyGoogleToken } from "../../hooks/auth";
import { useNavigate } from "react-router-dom";
import { LogoIcon } from "../../Svgs";

const AuthPage = () => {
    const navigate = useNavigate()
    const { data: currentUser } = useCheckAuth()
    const { mutateAsync: verifyGoogleToken } = useVerifyGoogleToken()

    const handleLoginError = () => {
        console.log("Login Failed");
    };

    if (currentUser) {
        navigate("/")
        return
    }

    return (
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID}>
            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
                {/* Background image with low opacity */}
                <div
                    className="absolute inset-0 z-0 opacity-20"
                    style={{
                        backgroundImage: "url('https://www.shutterstock.com/shutterstock/videos/933763/thumb/1.jpg')",
                        backgroundSize: "cover",
                        backgroundPosition: "center"
                    }}
                ></div>

                {/* Main content */}
                <div className="relative z-10 text-center max-w-md w-full">
                    <div className="mb-8">
                        <div className="mx-auto mb-2 rounded-full flex items-center justify-center">
                            <LogoIcon width="60" height="60" />
                        </div>
                        <h1 className="text-4xl font-bold mb-2">Millions of songs.</h1>
                        <h2 className="text-4xl font-bold mb-4">Free on Spotify.</h2>
                    </div>

                    {/* Google Login buttons */}
                    <GoogleLogin
                        onSuccess={(credentials) => verifyGoogleToken(credentials.credential || "")}
                        onError={handleLoginError}
                    />
                </div>
            </div>
        </GoogleOAuthProvider>
    );
};

export default AuthPage;