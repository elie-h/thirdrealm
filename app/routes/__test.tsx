import { Outlet } from "@remix-run/react";
import { Web3Wrapper } from "~/components/Web3";

export default function Test() {
  return (
    <Web3Wrapper>
      <Outlet />
    </Web3Wrapper>
  );
}
