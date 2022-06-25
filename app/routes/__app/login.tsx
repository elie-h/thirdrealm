import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSigner } from "wagmi";
import { useOptionalUser } from "~/utils";

export default function Login() {
  const user = useOptionalUser();
  const { data: signer, isLoading } = useSigner();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && signer) {
      navigate("/spaces", { replace: true });
    }
  }, [signer, user, navigate]);

  return (
    /* {isLoading ? <p>Loading...</p> : <h1>Connect your wallet to continue</h1>} */
    <main className="mx-auto mt-16 max-w-7xl px-4 sm:mt-24">
      <div className="text-center">
        {isLoading ? (
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block xl:inline">Connect your wallet</span>
            </h1>
            <p className="mx-auto mt-3 max-w-md text-base text-gray-500 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
              Connect your wallet containing your tokens to find and join your
              communities.
            </p>
          </div>
        ) : (
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block xl:inline">Loading ...</span>
          </h1>
        )}
      </div>
    </main>
  );
}
