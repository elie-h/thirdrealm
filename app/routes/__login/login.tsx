import { useNavigate, useSubmit } from "@remix-run/react";
import { useEffect } from "react";
import { SiweMessage } from "siwe";
import invariant from "tiny-invariant";
import { useSigner } from "wagmi";
import WalletButton from "~/components/Web3";
import { useOptionalUser } from "~/utils";

const domain = "thirdrealm";
const origin = "https://thirdrealm.xyz/login";

async function createSiweMessage(address: string, statement: string) {
  const res = await fetch(`siwe/nonce`);
  const siweMessage = new SiweMessage({
    domain,
    address,
    statement,
    uri: origin,
    version: "1",
    chainId: 1,
    nonce: await res.text(),
  });
  return siweMessage.prepareMessage();
}

export default function Login() {
  const user = useOptionalUser();
  const navigate = useNavigate();

  const submit = useSubmit();
  const { data: signer, isError, isLoading } = useSigner();

  const handleSubmit = async () => {
    invariant(signer, "Signer is required");
    const message = await createSiweMessage(
      await signer.getAddress(),
      "Sign in with Ethereum to the app."
    );

    const signature = await signer.signMessage(message);
    const formData = new FormData();
    formData.append("signature", signature);
    formData.append("message", message);
    submit(formData, {
      action: "/siwe/verify",
      method: "post",
      encType: "application/x-www-form-urlencoded",
      replace: true,
    });
  };

  useEffect(() => {
    if (signer && user && !isLoading && !isError) {
      navigate("/home");
    }
  }, [signer, isError, isLoading, user, handleSubmit]);

  return (
    <div className="flex min-h-screen">
      <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm text-center lg:w-96">
          <div>
            <img className="mx-auto h-16 w-auto" src="/logo.png" alt="Logo" />
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Sign in with your wallet
            </h2>
          </div>

          <div className="mt-14 space-y-6">
            {(() => {
              if (isLoading) {
                return <p>Loading ...</p>;
              }

              if (!signer) {
                return <WalletButton />;
              } else if (signer && !user) {
                return (
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md border border-transparent bg-rose-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
                    onClick={() => handleSubmit()}
                  >
                    SIWE
                  </button>
                );
              }
              return null;
            })()}
          </div>
        </div>
      </div>
      <div className="relative hidden w-0 flex-1 lg:block">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="/loginsplash.jpg"
          alt="Login splash screen"
        />
      </div>
    </div>
  );
}
