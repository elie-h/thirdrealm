import { useEffect } from "react";
import { useNavigate } from "@remix-run/react";
import { useSigner } from "wagmi";
import { useOptionalUser } from "~/utils";

export default function Login() {
  const user = useOptionalUser();
  const { data: signer } = useSigner();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && signer) {
      navigate("/home", { replace: true });
    }
  }, [signer, user, navigate]);

  return (
    <main className="mx-auto mt-16 max-w-7xl px-4 sm:mt-24">
      <div className="text-center">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block xl:inline">Connect your wallet</span>
          </h1>
          <p className="mx-auto mt-3 max-w-md text-base text-gray-500 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
            Connect your wallet containing your tokens to find and join your
            communities.
          </p>
        </div>
      </div>
    </main>
  );
}
