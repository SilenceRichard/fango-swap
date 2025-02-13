import "./App.css";
import Header from "./Header"; // 添加Header组件的导入
import { Routes, Route } from "react-router";
import { Web3Provider } from "./Web3Provider";
import Faucet from "./Faucet";
import { Toaster } from "./components/ui/toaster";
import { Pool } from "./Pool";
import Swap from "./Swap";
import { useAccount, useSwitchChain } from "wagmi";
import { useEffect } from "react";
import { sepolia } from "viem/chains";

function App() {
  const { switchChain } = useSwitchChain();
  const { chainId } = useAccount();
  useEffect(() => {
    if (chainId !== sepolia.id) {
      switchChain?.({
        chainId: sepolia.id,
      });
    }
  }, [chainId]);
  return (
    <Web3Provider>
      <Toaster />
      <Header /> {/* 添加Header组件 */}
      <div className="p-16">
        <Routes>
          <Route path="/" element={<Swap />} />
          <Route path="/pools" element={<Pool />} />
          <Route path="/faucet" element={<Faucet />} />
        </Routes>
      </div>
    </Web3Provider>
  );
}

export default App;
