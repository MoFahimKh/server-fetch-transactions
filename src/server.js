import express from "express";
import axios from "axios";

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

app.get("/api/data", (req, res) => {
  const address = req.query.address;
  const offset = req.query.offset;

  const rpcUrl = `https://osmosis.numia.xyz/txs/${address}?offset=${offset}`;

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
  console.log("Server is running on http://localhost:3001");
});
