"use client";
import { useAccount } from "wagmi";
import { Account } from "./component/Account";
import { WalletOptions } from "./component/WalletOptions";

function ConnectWallet() {
  const { isConnected } = useAccount();
  if (isConnected) return <Account />;
  return <WalletOptions />;
}
export default function Page() {
  return (
    <div>
      <ConnectWallet />
    </div>
  );
}
