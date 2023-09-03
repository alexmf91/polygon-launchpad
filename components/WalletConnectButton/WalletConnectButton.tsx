import { Button } from '@mantine/core';
import { ConnectKitButton } from 'connectkit';

export default function WalletConnectButton() {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show, address }) => (
        <Button onClick={show} color="violet" fullWidth>
          {isConnected ? address : 'Connect Wallet'}
        </Button>
      )}
    </ConnectKitButton.Custom>
  );
}
