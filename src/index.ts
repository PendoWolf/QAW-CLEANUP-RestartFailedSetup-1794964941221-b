import * as pendo from "pendo-server-sdk";
import { createApp } from "./app.js";

// Pendo Agent Analytics records every Tripwise Assistant turn. Runs once, before the server starts.
pendo.init({
  apiKey: "671a82e4-5e1d-4549-be5e-1e8dddc18e14",
  agentId: "OrWvIQVn2s-sYm5WCXQHMtmOA04",
  endpoint: "https://app.pendo-dev.pendo-dev.com",
  autoPatch: true,
});

const port = Number(process.env.PORT) || 3001;
const corsOrigin = process.env.CORS_ORIGIN ?? "http://localhost:5173";

const server = createApp(corsOrigin).listen(port, () => {
  console.log(`Tripwise API on port ${port}, allowing ${corsOrigin}`);
});

// Send Pendo's buffered events before the process exits.
async function stop(): Promise<void> {
  server.close();
  await pendo.shutdown();
  process.exit(0);
}
process.on("SIGINT", () => void stop());
process.on("SIGTERM", () => void stop());
