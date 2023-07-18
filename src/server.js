import express from "express";
import axios from "axios";

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000"); // Replace with your React app's domain
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

app.get("/api/data", async (req, res) => {
  try {
    let offset = 0;
    let transactions = [];

    while (true) {
      const response = await axios.get(
        `https://evmos.numia.xyz/txs/evmos1kdxj7ukuvw5ht93598l0n6t0ye4kvl8x8vj2nr?offset=${offset}`,
        {
          headers: {
            Authorization: "Bearer {your token here}",
          },
        }
      );

      const data = response.data;
      if (data.length === 0) {
        break;
      }
      transactions = transactions.concat(data);
      offset += 10; 
    }

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching data." });
  }
});
app.get("/api/rpc", (req, res) => {
  const rpcUrl = "https://osmosis-rpc.numia.xyz/status";

  const headers = {
    Authorization: "Bearer sk_99a4e2488a3e40ff9ce6ceb31ce543b4",
  };

  axios
    .get(rpcUrl, { headers })
    .then((response) => {
      console.log("Response:", response.data);
      res.send(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

app.listen(3001, () => {
  console.log("Proxy server is running on http://localhost:3001");
});
