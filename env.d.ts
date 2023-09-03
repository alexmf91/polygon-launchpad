declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_ALCHEMY_ID: string;
    NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID: string;
    NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS: `0x${string}`;
    NEXT_PUBLIC_PRESALE_CONTRACT_ADDRESS: `0x${string}`;
  }
}
