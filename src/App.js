import { useEffect, useState } from "react";
import { ethers } from "ethers";

// Components
import Navigation from "./components/Navigation";
import Sort from "./components/Sort";
import Card from "./components/Card";
import SeatChart from "./components/SeatChart";

// ABIs
import TokenMaster from "./abis/TokenMaster.json";

// Config
import config from "./config.json";

function App() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);

  const [tokenMaster, setTokenMaster] = useState(null);
  const [occasions, setOccasions] = useState([]);

  const [occasion, setOccasion] = useState({});
  const [toggle, setToggle] = useState(false);

  const loadBlockchainData = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(provider);

      const network = await provider.getNetwork();
      const tokenMasterAddress = config[network.chainId]?.TokenMaster.address;
      if (!tokenMasterAddress) {
        console.error("TokenMaster address not found in config");
        return;
      }

      const tokenMaster = new ethers.Contract(
        tokenMasterAddress,
        TokenMaster,
        provider
      );
      setTokenMaster(tokenMaster);

      try {
        const totalOccasions = await tokenMaster.callStatic.getTotalOccasions();
        console.log("Total Occasions:", totalOccasions.toNumber());

        const occasions = [];
        for (let i = 1; i <= totalOccasions; i++) {
          const occasion = await tokenMaster.getOccasion(i);
          occasions.push(occasion);
        }
        setOccasions(occasions);
      } catch (err) {
        console.error("Error accessing totalOccasions:", err);
      }

      window.ethereum.on("accountsChanged", async () => {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const account = ethers.utils.getAddress(accounts[0]);
        setAccount(account);
      });
    } catch (error) {
      console.error("Error loading blockchain data:", error);
    }
  };

  useEffect(() => {
    loadBlockchainData();
  }, []);

  return (
    <div>
      <header>
        <Navigation account={account} setAccount={setAccount} />

        <h2 className="header__title">
          <strong>Event</strong> Tickets
        </h2>
      </header>

      <Sort />

      <div className="cards">
        {occasions.map((occasion, index) => (
          <p key={index}>{occasion.name}</p>
        ))}
      </div>

      {toggle && (
        <SeatChart
          occasion={occasion}
          tokenMaster={tokenMaster}
          provider={provider}
          setToggle={setToggle}
        />
      )}
    </div>
  );
}

export default App;
