import { WalletConnectButton } from '@app/components';
import { presaleABI } from '@app/contracts/abis';
import BeInLogo from '@app/public/bin-logo.svg';
import MaticLogo from '@app/public/matic-logo.svg';
import { getContractErrorMessage } from '@app/utils';
import { Alert, Box, Button, Divider, Group, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDebouncedValue } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconAlertCircle } from '@tabler/icons';
import { useEffect } from 'react';
import { formatEther, parseEther } from 'viem';
import {
  useAccount,
  useBalance,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import useStyles from './TokenPurchaseForm.styles';

type FormValues = {
  amountMatic: number | null;
  amountTSTK: number | null;
};

const MaticTextInputLabel = () => (
  <span>
    Amount in <strong>MATIC</strong> you pay
  </span>
);

const TSTKTextInputLabel = () => (
  <span>
    Amount in <strong>TSTK</strong> you receive
  </span>
);

export default function TokenPurchaseForm() {
  const { classes } = useStyles();
  const { address, isConnected } = useAccount();

  const { data: balanceTSTK } = useBalance({
    address,
    token: process.env.NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS,
    watch: true,
  });
  const { data: balanceMatic } = useBalance({
    address,
    watch: true,
  });

  const { data: currentStagePrice = BigInt(0) } = useContractRead({
    address: process.env.NEXT_PUBLIC_PRESALE_CONTRACT_ADDRESS,
    abi: presaleABI,
    functionName: 'currentStagePrice',
    watch: true,
  });

  const parsedCurrentStagePrice = formatEther(currentStagePrice);

  const form = useForm<FormValues>({
    initialValues: {
      amountMatic: null,
      amountTSTK: null,
    },
    validate: {
      amountMatic: (value: number | null) =>
        value === null || value > 0 ? null : '* Amount must be greater than 0',
      amountTSTK: (value: number | null) =>
        value === null || value > 0 ? null : '* Amount must be greater than 0',
    },
  });

  const [debouncedAmountTSTK] = useDebouncedValue(+form.values.amountTSTK!, 200);

  const {
    config,
    isError: isPrepareError,
    error: prepareError,
  } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_PRESALE_CONTRACT_ADDRESS,
    abi: presaleABI,
    functionName: 'tokenSale',
    enabled: !!form.values.amountTSTK,
    args: [BigInt(debouncedAmountTSTK * 10 ** 18)],
    value: parseEther((+parsedCurrentStagePrice * debouncedAmountTSTK).toString()),
  });

  const { data: writeData, write } = useContractWrite(config);

  const {
    isLoading: isTransactionLoading,
    isSuccess: isTransactionSuccess,
    isError: isTransactionError,
  } = useWaitForTransaction({
    hash: writeData?.hash,
  });

  const handleMaticAmountChange = (value: number) => {
    const amountTSTK = value / +parsedCurrentStagePrice;
    form.setFieldValue('amountMatic', Number.isNaN(value) ? null : value);
    form.setFieldValue('amountTSTK', Number.isNaN(amountTSTK) ? null : +amountTSTK.toFixed(1));
  };

  const handleTSTKAmountChange = (value: number) => {
    const amountMatic = value * +parsedCurrentStagePrice;
    form.setFieldValue('amountTSTK', Number.isNaN(value) ? null : value);
    form.setFieldValue('amountMatic', Number.isNaN(amountMatic) ? null : amountMatic);
  };

  useEffect(() => {
    if (isTransactionSuccess) {
      notifications.show({
        title: 'Success',
        message: "You've successfully purchased tokens!",
        color: 'green',
      });
      form.reset();
    }
    if (isTransactionError) {
      notifications.show({
        title: 'Error',
        message: "Couldn't purchase tokens, please try again later.",
        color: 'red',
      });
    }
  }, [isTransactionSuccess, isTransactionError]);

  return (
    <Box mx="auto" className={classes.wrapper}>
      <form className={classes.form}>
        <Divider
          my="xs"
          label={`1 TSTK = ${parsedCurrentStagePrice} MATIC`}
          labelPosition="center"
        />

        <Group className={classes.inputsContainer}>
          <TextInput
            wrapperProps={{ sx: classes.inputWrapper }}
            label={<MaticTextInputLabel />}
            placeholder="0.0"
            type="number"
            min={0}
            step={0.05}
            description={`balance: ${balanceMatic?.formatted}`}
            value={form.values.amountMatic ?? ''}
            onChange={(event) => {
              handleMaticAmountChange(parseFloat(event.target.value));
            }}
            error={form.errors.amountMatic && String(form.errors.amountMatic)}
            rightSection={<MaticLogo width={25} height={25} />}
          />

          <TextInput
            wrapperProps={{ sx: classes.inputWrapper }}
            label={<TSTKTextInputLabel />}
            description={`balance: ${balanceTSTK?.formatted}`}
            placeholder="0.0"
            type="number"
            min={0}
            step={0.5}
            value={form.values.amountTSTK ?? ''}
            onChange={(event) => {
              handleTSTKAmountChange(parseFloat(event.target.value));
            }}
            error={form.errors.amountTSTK && String(form.errors.amountTSTK)}
            rightSection={<BeInLogo width={25} height={25} styles="background-color: white" />}
          />
        </Group>

        {isPrepareError && !!prepareError && !!form.values.amountTSTK && (
          <Alert color="red" icon={<IconAlertCircle />}>
            {getContractErrorMessage(prepareError)}
          </Alert>
        )}

        <Group mt="md">
          {isConnected ? (
            <Button
              type="button"
              fullWidth
              loading={isTransactionLoading}
              disabled={isPrepareError || !form.values.amountTSTK}
              onClick={() => write?.()}
              color="violet"
            >
              {isTransactionLoading ? 'Buying...' : 'Buy'}
            </Button>
          ) : (
            <WalletConnectButton />
          )}
        </Group>
      </form>
    </Box>
  );
}
