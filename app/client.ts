import { createThirdwebClient, CreateThirdwebClientOptions } from "thirdweb";

const clientId = process.env.CLIENT_ID;

if (!clientId) {
  throw new Error("CLIENT_ID is not defined in environment variables.");
}

const clientOptions: CreateThirdwebClientOptions = {
  clientId,
};

export const client = createThirdwebClient(clientOptions);
