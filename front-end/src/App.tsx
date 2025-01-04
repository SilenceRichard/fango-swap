import "./App.css";
import Header from "./Header"; // 添加Header组件的导入
import { Routes, Route } from "react-router";
import { Web3Provider } from "./Web3Provider";
import Faucet from "./Faucet";
import { Toaster } from "./components/ui/toaster";
import { Pool } from "./Pool";

function App() {
  return (
    <Web3Provider>
      <Toaster />
      <Header /> {/* 添加Header组件 */}
      <div className="p-16">
        <Routes>
          <Route path="/" element={<div>Swap</div>} />
          <Route path="/pools" element={<Pool />} />
          <Route path="/faucet" element={<Faucet />} />
        </Routes>
      </div>
    </Web3Provider>
  );
}

export default App;
