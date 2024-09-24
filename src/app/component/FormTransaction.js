import { parseEther, parseUnits } from "ethers";
import {
  usePrepareTransactionRequest,
  useSendTransaction,
  useWaitForTransactionReceipt,
} from "wagmi";
import { MproAbi } from "./MproAbi";
import { useState } from "react";

export function SendTransaction() {
  const [amount, setAmount] = useState(0);
  const [to, setTo] = useState(0);

  const { config } = usePrepareTransactionRequest({
    address: "usdtContractAddress",
    abi: MproAbi,
    functionName: "transfer",
    args: ["receiverAddress", amount ? parseUnits(`${amount}`, 6) : 0],
    enabled: Boolean(amount),
  });

  const {
    data: hash,
    error,
    isPending,
    sendTransaction,
  } = useSendTransaction();

  async function submit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const to = formData.get("address");
    const value = formData.get("value");
    sendTransaction({ to, value: parseEther(value) });
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  return (
    <div className="container">
      <div className="stack">
        <form className="set" onSubmit={submit}>
          <input name="to" placeholder="Address" required />
          <input
            name="value"
            placeholder="Amount (ETH)"
            type="number"
            step="0.000000001"
            required
          />
          <button disabled={isPending} type="submit">
            {isPending ? "Confirming..." : "Send"}
          </button>
        </form>
        {hash && <div>Transaction Hash: {hash}</div>}
        {isConfirming && <div>Waiting for confirmation...</div>}
        {isConfirmed && <div>Transaction confirmed.</div>}
        {error && <div>Error: {error.shortMessage || error.message}</div>}
      </div>
    </div>
  );
}
