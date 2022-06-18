import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSigner } from "wagmi";
import { useOptionalUser } from "~/utils";

export default function Login() {
  const user = useOptionalUser();
  const { data: signer } = useSigner();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && signer) {
      navigate("/feed", { replace: true });
    }
  }, [signer, user]);

  return (
    <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <h1>Connect your wallet to continue</h1>
    </div>
  );
}
