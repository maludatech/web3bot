import { createThirdwebClient } from "thirdweb";

const clientId = process.env.CLIENT_ID;

if (!clientId) {
  throw new Error("CLIENT_ID is not defined in environment variables.");
}

export const client = createThirdwebClient(clientId);