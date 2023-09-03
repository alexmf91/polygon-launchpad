import { render, screen } from '@testing-library/react';
import Welcome from './Welcome';

describe('Welcome component', () => {
  it('has correct welcome message', () => {
    render(<Welcome />);
    expect(screen.getByText('Welcome to')).toBeInTheDocument();
    expect(screen.getByText('Polygon Launchpad')).toBeInTheDocument();
  });
});
