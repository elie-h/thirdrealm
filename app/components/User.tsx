import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Form, useSubmit } from "@remix-run/react";
import { useEffect } from "react";
import { SiweMessage } from "siwe";
import invariant from "tiny-invariant";
import { useSigner } from "wagmi";
import { useOptionalUser } from "~/utils";
import { useCallback } from "react";

const domain = "localhost";
const origin = "https://localhost/login";

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

export default function User() {
  const user = useOptionalUser();
  const submit = useSubmit();
  const { data: signer, isError, isLoading } = useSigner();

  const handleSubmit = useCallback(async () => {
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
  }, [signer, submit]);

  useEffect(() => {
    // if (user && signer) {
    //   navigate("/feed", { replace: true });
    // }

    const handleSIWE = async () => {
      if (signer && !user && !isLoading && !isError) {
        await handleSubmit();
      }
    };
    handleSIWE();
  }, [signer, isError, isLoading, user, handleSubmit]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!user && !signer) {
    return (
      <ConnectButton.Custom>
        {({ account, chain, openConnectModal, mounted }) => {
          return (
            <div
              {...(!mounted && {
                "aria-hidden": true,
                style: {
                  opacity: 0,
                  pointerEvents: "none",
                  userSelect: "none",
                },
              })}
            >
              {(() => {
                if (!mounted || !account || !chain) {
                  return (
                    <button
                      className="rounded bg-green-600 py-2 px-4 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
                      onClick={openConnectModal}
                      type="button"
                    >
                      Connect Wallet
                    </button>
                  );
                }
              })()}
            </div>
          );
        }}
      </ConnectButton.Custom>
    );
  } else if (signer && !user) {
    return (
      <button
        onClick={handleSubmit}
        className="rounded bg-green-600 py-2 px-4 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
      >
        SIWE
      </button>
    );
  } else if (user) {
    return (
      <Form action="/siwe/logout" method="post">
        <button
          type="submit"
          className="rounded bg-slate-600 py-2 px-4 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
        >
          Logout
        </button>
      </Form>
    );
  }
  return <p></p>;
}
