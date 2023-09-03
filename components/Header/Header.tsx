import MaticLogo from '@app/public/matic-logo.svg';
import { PublicRoutes } from '@app/utils/routes';
import { Box, Burger, Divider, Drawer, Group, Header, ScrollArea, Text, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ConnectKitButton } from 'connectkit';
import Link from 'next/link';
import ColorSchemeToggle from '../ColorSchemeToggle/ColorSchemeToggle';
import useStyles from './Header.styles';

export default function HeaderMenu() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const { classes, theme } = useStyles();

  return (
    <Box>
      <Header height={80} className={classes.header}>
        <Group position="apart" sx={{ height: '100%' }}>
          <Burger opened={drawerOpened} onClick={toggleDrawer} className={classes.hiddenDesktop} />
          <Group>
            <MaticLogo width={45} height={45} />
            <Text size="lg" weight={500} ml={5} className={classes.hiddenMobile}>
              Polygon Launchpad
            </Text>
          </Group>

          <Group sx={{ height: '100%' }} spacing={0} className={classes.hiddenMobile}>
            <Link href={PublicRoutes.HOME} className={classes.link}>
              Home
            </Link>

            <Link href={PublicRoutes.BUY_TOKENS} className={classes.link}>
              Buy Tokens
            </Link>
          </Group>

          <Group className={classes.hiddenMobile}>
            <ColorSchemeToggle />
            <ConnectKitButton showBalance />
          </Group>

          <Group className={classes.hiddenDesktop}>
            <ColorSchemeToggle />
          </Group>
        </Group>
      </Header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
          <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

          <Link href={PublicRoutes.HOME} className={classes.link}>
            Home
          </Link>

          <Link href={PublicRoutes.BUY_TOKENS} className={classes.link}>
            Buy Tokens
          </Link>

          <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

          <Group position="center" grow pb="xl" px="md">
            <ConnectKitButton />
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
