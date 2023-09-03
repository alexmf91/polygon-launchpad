import MaticLogo from '@app/public/matic-logo.svg';
import { ActionIcon, Anchor, Group } from '@mantine/core';
import { IconBrandInstagram, IconBrandTwitter, IconBrandYoutube } from '@tabler/icons-react';

import useStyles from './Footer.styles';

const links = [
  { label: 'About', link: '#' },
  { label: 'Blog', link: '#' },
  { label: 'Contact', link: '#' },
  { label: 'Privacy Policy', link: '#' },
  { label: 'Terms & Conditions', link: '#' },
];

export default function Footer() {
  const { classes } = useStyles();

  return (
    <div className={classes.footer}>
      <div className={classes.inner}>
        <MaticLogo width={45} height={45} />

        <Group className={classes.links}>
          {links.map((link) => (
            <Anchor<'a'>
              color="dimmed"
              key={link.label}
              href={link.link}
              sx={{ lineHeight: 1 }}
              onClick={(event) => event.preventDefault()}
              size="sm"
            >
              {link.label}
            </Anchor>
          ))}
        </Group>

        <Group spacing="xs" position="right" noWrap>
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandTwitter size="1.05rem" stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandYoutube size="1.05rem" stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandInstagram size="1.05rem" stroke={1.5} />
          </ActionIcon>
        </Group>
      </div>
    </div>
  );
}
