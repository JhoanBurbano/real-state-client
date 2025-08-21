import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { PropertyCard } from '../../components/ui/property-card';

describe('PropertyCard', () => {
  const defaultProps = {
    image: '/test-image.jpg',
    price: '$1,000,000',
    location: '123 Test St, Miami Beach',
    beds: 3,
    baths: 2,
    sqft: 2000,
  };

  it('renders property information correctly', () => {
    render(<PropertyCard {...defaultProps} />);
    
    expect(screen.getByText('$1,000,000')).toBeInTheDocument();
    expect(screen.getByText('123 Test St, Miami Beach')).toBeInTheDocument();
    expect(screen.getByText('3 Beds')).toBeInTheDocument();
    expect(screen.getByText('2 Baths')).toBeInTheDocument();
    expect(screen.getByText('2,000 sq ft')).toBeInTheDocument();
  });

  it('displays badge when provided', () => {
    render(<PropertyCard {...defaultProps} badge="New" />);
    
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('calls onViewDetails when View Details button is clicked', () => {
    const mockOnViewDetails = vi.fn();
    render(<PropertyCard {...defaultProps} onViewDetails={mockOnViewDetails} />);
    
    fireEvent.click(screen.getByText('View Details'));
    expect(mockOnViewDetails).toHaveBeenCalledTimes(1);
  });

  it('calls onFavorite when heart icon is clicked', () => {
    const mockOnFavorite = vi.fn();
    render(<PropertyCard {...defaultProps} onFavorite={mockOnFavorite} />);
    
    const heartButton = screen.getByRole('button', { name: /heart/i });
    fireEvent.click(heartButton);
    expect(mockOnFavorite).toHaveBeenCalledTimes(1);
  });

  it('shows filled heart when isFavorite is true', () => {
    render(<PropertyCard {...defaultProps} isFavorite={true} />);
    
    const heartIcon = screen.getByTestId('heart-icon');
    expect(heartIcon).toHaveClass('fill-error', 'text-error');
  });

  it('applies correct badge styling based on badge type', () => {
    const { rerender } = render(<PropertyCard {...defaultProps} badge="Hot" />);
    expect(screen.getByText('Hot')).toHaveClass('bg-error');

    rerender(<PropertyCard {...defaultProps} badge="New" />);
    expect(screen.getByText('New')).toHaveClass('bg-info');

    rerender(<PropertyCard {...defaultProps} badge="Sold" />);
    expect(screen.getByText('Sold')).toHaveClass('bg-text-muted');
  });

  it('has proper accessibility attributes', () => {
    render(<PropertyCard {...defaultProps} />);
    
    const card = screen.getByRole('button', { name: /property card/i });
    expect(card).toHaveAttribute('aria-label');
    
    const image = screen.getByAltText('Property in 123 Test St, Miami Beach');
    expect(image).toBeInTheDocument();
  });

  it('handles keyboard navigation', () => {
    const mockOnViewDetails = vi.fn();
    render(<PropertyCard {...defaultProps} onViewDetails={mockOnViewDetails} />);
    
    const viewDetailsButton = screen.getByText('View Details');
    viewDetailsButton.focus();
    
    fireEvent.keyDown(viewDetailsButton, { key: 'Enter' });
    expect(mockOnViewDetails).toHaveBeenCalledTimes(1);
  });
});