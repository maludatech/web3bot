import { createThirdwebClient, CreateThirdwebClientOptions } from "thirdweb";

const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;

if (!clientId) {
  throw new Error("CLIENT_ID is not defined in environment variables.");
}

const clientOptions: CreateThirdwebClientOptions = {
  clientId,
};

export const client = createThirdwebClient(clientOptions);
