import { getDefaultConfig } from 'connectkit';
import { createConfig } from 'wagmi';
import { polygonMumbai } from 'wagmi/chains';

const config = createConfig(
  getDefaultConfig({
    alchemyId: process.env.NEXT_PUBLIC_ALCHEMY_ID,
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
    appName: 'Polygon Launchpad',
    appDescription:
      'Discover and participate in the most promising token presales on the Polygon network.',
    appUrl: 'https://polygon-launchpad.vercel.app',
    appIcon: 'https://polygon-launchpad.vercel.app/favicon.svg',
    chains: [polygonMumbai],
  })
);

export default config;
