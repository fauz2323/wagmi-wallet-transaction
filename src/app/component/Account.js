import {
  useAccount,
  useBalance,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from "wagmi";
import { SendTransaction } from "./FormTransaction";

export function Account() {
  const { address, connector } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName });
  const { data: balanceDataMpro, isLoading: isLoadingMpro } = useBalance({
    address: address,
    token: "0x83b37130b8f6a8edd4e34c46a2fed1ac281bfb05",
  });

  const { data: balanceDataUSDT, isLoading: isLoadingUSDT } = useBalance({
    address: address,
    token: "0x55d398326f99059fF775485246999027B3197955",
  });

  console.log("====================================");
  console.log("Account component render");
  console.log({ address, connector, balanceDataUSDT });
  console.log("====================================");

  return (
    <div>
      {ensAvatar && <img alt="ENS Avatar" src={ensAvatar} />}
      {address && <div>{ensName ? `${ensName} (${address})` : address}</div>}
      {connector && <div>{connector.name}</div>}
      {isLoadingMpro ? (
        <p>Loading balance...</p>
      ) : (
        <>
          <p>
            {balanceDataMpro?.formatted} - {balanceDataMpro?.symbol} -{" "}
            {balanceDataMpro?.decimals}
          </p>
          <p>
            {balanceDataUSDT?.formatted} - {balanceDataUSDT?.symbol} -{" "}
            {balanceDataUSDT?.decimals}
          </p>
        </>
      )}
      <button
        className="p-3 bg-red-400 text-white rounded-lg"
        onClick={() => disconnect()}
      >
        Disconnect
      </button>
      <div>
        <SendTransaction />
      </div>
    </div>
  );
}
