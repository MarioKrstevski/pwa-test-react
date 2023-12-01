// server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 3005;
app.use(cors({ origin: true }));
app.use(express.json());
// if you want only your frontend running at port 3000 to connect to this backend
// app.use(cors({ origin: "<http://localhost:3000>" }))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Sample client manifests (replace this with data from your database)
const clientManifests = {
  agora: {
    name: "Client 1",
    short_name: "C1",
    start_url: "/menu/client1",
    background_color: "#ffffff",
    icons: [
      {
        src: "/icons/client1-icon.png",
        sizes: "192x192",
        type: "image/png",
      },
      // Add more icon variations if needed
    ],
  },
  pub: {
    name: "Client 2",
    short_name: "C2",
    start_url: "/menu/client2",
    background_color: "#000000",
    icons: [
      {
        src: "/icons/client2-icon.png",
        sizes: "192x192",
        type: "image/png",
      },
      // Add more icon variations if needed
    ],
  },
};
app.get("/", (req, res) => {
  return res.status(200).send("Server alive and works");
});
// Endpoint to fetch client-specific manifest
app.get("/api/manifest/client/:clientId", (req, res) => {
  const clientId = req.params.clientId;

  // Simulate fetching manifest from the database
  const clientManifest = clientManifests[clientId];

  if (clientManifest) {
    res.status(200).json({
      manifest: clientManifest,
    });
  } else {
    res.status(404).json({ error: "Client manifest not found" });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
