import { render, screen } from '@testing-library/react';
import ContractResultDisplay from './ContractResultDisplay';

describe('ContractResultDisplay', () => {
  it('should render the label and a successful result with correct formatting and unit', () => {
    // Arrange
    const label = 'Test Label';
    const result = {
      status: 'success',
      result: BigInt(100),
    } as const;
    const resultHandler = jest.fn().mockReturnValue('Formatted Result');
    const needsAccount = false;
    const isConnected = true;
    const unit = 'ETH';

    // Act
    render(
      <ContractResultDisplay
        label={label}
        result={result}
        resultHandler={resultHandler}
        needsAccount={needsAccount}
        isConnected={isConnected}
        unit={unit}
      />
    );

    // Assert
    expect(screen.getByText(`${label}:`)).toBeInTheDocument();
    expect(screen.getByText('Formatted Result ETH')).toBeInTheDocument();
    expect(resultHandler).toHaveBeenCalledWith(BigInt(100));
  });

  it('should render the label and a failure result with the error message', () => {
    // Arrange
    const label = 'Test Label';
    const result = {
      status: 'failure',
      error: new Error('Test Error'),
    } as const;
    const resultHandler = jest.fn();
    const needsAccount = false;
    const isConnected = true;
    const unit = 'ETH';

    // Act
    render(
      <ContractResultDisplay
        label={label}
        result={result}
        resultHandler={resultHandler}
        needsAccount={needsAccount}
        isConnected={isConnected}
        unit={unit}
      />
    );

    // Assert
    expect(screen.getByText(`${label}:`)).toBeInTheDocument();
    expect(screen.getByText('Test Error')).toBeInTheDocument();
  });

  it('should render an alert message when needsAccount is true and isConnected is false', () => {
    // Arrange
    const label = 'Test Label';
    const result = undefined;
    const resultHandler = jest.fn();
    const needsAccount = true;
    const isConnected = false;
    const unit = 'ETH';

    // Act
    render(
      <ContractResultDisplay
        label={label}
        result={result}
        resultHandler={resultHandler}
        needsAccount={needsAccount}
        isConnected={isConnected}
        unit={unit}
      />
    );

    // Assert
    expect(screen.getByText('Connect your account to see these details')).toBeInTheDocument();
  });

  it('should render the label and a successful result with correct formatting and no unit', () => {
    // Arrange
    const label = 'Test Label';
    const result = {
      status: 'success',
      result: BigInt(100),
    } as const;
    const resultHandler = jest.fn().mockReturnValue('Formatted Result');
    const needsAccount = false;
    const isConnected = true;
    const unit = undefined;

    // Act
    render(
      <ContractResultDisplay
        label={label}
        result={result}
        resultHandler={resultHandler}
        needsAccount={needsAccount}
        isConnected={isConnected}
        unit={unit}
      />
    );

    // Assert
    expect(screen.getByText(`${label}:`)).toBeInTheDocument();
    expect(screen.getByText('Formatted Result')).toBeInTheDocument();
    expect(resultHandler).toHaveBeenCalledWith(BigInt(100));
  });
});
