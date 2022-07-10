import { Link, Outlet, useNavigate } from "@remix-run/react";
import { useEffect } from "react";
import { useSigner } from "wagmi";
import Layout from "~/components/Layout";
import NavBar from "~/components/Layout";
import { Web3Wrapper } from "~/components/Web3";
import { useOptionalUser } from "~/utils";

export const AuthGaurd = ({ children }: any) => {
  const user = useOptionalUser();
  const { data: signer, isError, isLoading } = useSigner();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading === false && isError === false) {
      if (!user) {
        console.log("Navigating", isLoading, !user);
        navigate("/");
      }
    }
  }, [signer, isError, isLoading, user]);

  return children;
};

export default function App() {
  return (
    <Web3Wrapper>
      <AuthGaurd>
        <Layout />
        {/* <Outlet /> */}
      </AuthGaurd>
    </Web3Wrapper>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  if (process.env.NODE_ENV === "development") {
    console.log(error.stack);
  }
  return (
    <Web3Wrapper>
      <NavBar />
      <div className="flex min-h-full flex-col bg-white pt-16 pb-12">
        <main className="mx-auto flex w-full flex-grow flex-col justify-center px-4 sm:px-6 lg:px-8">
          <div className="flex flex-shrink-0 justify-center">
            <a href="/" className="inline-flex">
              <img
                className="h-12 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"
                alt=""
              />
            </a>
          </div>
          <div className="py-16">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">
                error
              </p>
              <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                Something went wrong!
              </h1>
              <p className="mt-2 text-base text-gray-500">{error.message}</p>
              <p className="mt-2 text-base text-gray-500">{error.stack}</p>
              {process.env.NODE_ENV === "development" ? (
                <p className="mt-2 text-base text-gray-500">{error.stack}</p>
              ) : null}
              <div className="mt-6">
                <Link
                  to="/home"
                  className="text-base font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Home<span aria-hidden="true"> &rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </Web3Wrapper>
  );
}
