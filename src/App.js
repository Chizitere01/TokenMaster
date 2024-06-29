import { useEffect, useState } from "react";
import { ethers } from "ethers";

// Components
import Navigation from "./components/Navigation";
import Sort from "./components/Sort";
import Card from "./components/Card";
import SeatChart from "./components/SeatChart";
import Home from "./components/Home";

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
    if (!window.ethereum) {
      console.error("MetaMask is not installed!");
      return;
    }

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(provider);

      const accounts = await provider.send("eth_requestAccounts", []);
      if (accounts.length === 0) {
        console.error("No accounts found");
        return;
      }
      setAccount(ethers.utils.getAddress(accounts[0]));

      const network = await provider.getNetwork();
      console.log("Network:", network);
      const tokenMasterAddress = config[network.chainId]?.TokenMaster.address;
      if (!tokenMasterAddress) {
        console.error("TokenMaster address not found in config");
        return;
      }

      // Check if contract is deployed at the address
      const code = await provider.getCode(tokenMasterAddress);
      if (code === "0x") {
        console.error("No contract deployed at the provided address");
        return;
      }

      console.log("TokenMaster Address:", tokenMasterAddress);

      const tokenMaster = new ethers.Contract(
        tokenMasterAddress,
        TokenMaster,
        provider
      );
      setTokenMaster(tokenMaster);

      try {
        const totalOccasions = await tokenMaster.getTotalOccasions();
        console.log("Total Occasions:", totalOccasions.toNumber());

        const occasions = await Promise.all(
          Array.from({ length: totalOccasions.toNumber() }, (_, i) =>
            tokenMaster.getOccasion(i + 1)
          )
        );
        setOccasions(occasions);
      } catch (err) {
        console.error("Error accessing totalOccasions:", err);
      }

      window.ethereum.on("accountsChanged", async (accounts) => {
        if (accounts.length === 0) {
          console.error("No accounts found");
          return;
        }
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
          <Card
            key={index}
            occasion={occasion}
            toggle={toggle}
            setToggle={setToggle}
            setOccasion={setOccasion}
          />
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
