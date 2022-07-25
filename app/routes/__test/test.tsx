import { Outlet } from "@remix-run/react";
import { Web3Wrapper } from "~/components/Web3";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Test() {
  return (
    <div className="h-full w-full">
      <div className="mx-auto flex items-center">
        <ConnectButton />
      </div>
    </div>
  );
}
