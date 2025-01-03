import "./App.css";
import Header from "./Header"; // 添加Header组件的导入
import { Routes, Route } from "react-router";
import { Web3Provider } from "./Web3Provider";

function App() {
  return (
    <Web3Provider>
      <Header /> {/* 添加Header组件 */}
      <div className="p-16">
        <Routes>
          <Route path="/" element={<div>Swap</div>} />
          <Route path="/pools" element={<div>Pools</div>} />
          <Route path="/faucet" element={<div>Faucet</div>} />
        </Routes>
      </div>
    </Web3Provider>
  );
}

export default App;
