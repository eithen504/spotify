import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useCheckAuth, useVerifyGoogleToken } from "../../hooks/auth";
import { useNavigate } from "react-router-dom";

function AuthPage() {
    const navigate = useNavigate()
    const { data, isLoading } = useCheckAuth()
    const { mutateAsync } = useVerifyGoogleToken()

    const handleLoginError = () => {
        console.log("Login Failed");
    };

    if (data) {
        navigate("/")
        return
    }

    return (
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID}>
            <div className="bg-black w-full h-full min-h-screen overflow-hidden flex items-center justify-center fixed inset-0">
                <div className="flex flex-col items-center justify-center gap-8 text-white">
                    {
                        isLoading ? (
                            <h1>Loading...</h1>
                        ) : (
                            <>
                                <h1 className="text-4xl font-bold text-center">Welcome</h1>
                                <GoogleLogin
                                    onSuccess={(credentials) => mutateAsync(credentials.credential || "")}
                                    onError={handleLoginError}
                                />
                            </>
                        )
                    }
                </div >
            </div >
        </GoogleOAuthProvider>

    );
}

export default AuthPage;