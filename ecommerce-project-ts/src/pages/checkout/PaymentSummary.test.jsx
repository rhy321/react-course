import { it, expect, describe, vi, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router'; //specifically for testing
// import React from 'react';
import axios from 'axios';
import { PaymentSummary } from './PaymentSummary';
import userEvent from '@testing-library/user-event';

vi.mock('axios');

describe('PaymentSummary testing', () => {

  let paymentSummary;
  let loadCart;
  let user;

  beforeEach(() => {
    loadCart = vi.fn();

    paymentSummary = {
      "totalItems": 8,
      "productCostCents": 11340,
      "shippingCostCents": 0,
      "totalCostBeforeTaxCents": 11340,
      "taxCents": 1134,
      "totalCostCents": 12474
    }

    user = userEvent.setup();
  });

  it('displays the correct details', () => {

    render(
      <MemoryRouter>
        <PaymentSummary 
          paymentSummary={paymentSummary} 
          loadCart={loadCart} 
        />
      </MemoryRouter>
    );

    expect(
      screen.getByText('Items (8):')
    ).toBeInTheDocument();

    expect(
      within(screen.getByTestId('payment-summary-cost'))
        .getByText('$113.40')
    );

    expect(
      screen.getByTestId('payment-summary-shipping')
    ).toHaveTextContent('$0.00');

  });

  it('places an order', async() => {

    function Location(){
      const location = useLocation();
      return (
        <div data-testid="url-path">
          {location.pathname}
        </div>
      );
    }

    render(
      <MemoryRouter>
        <PaymentSummary 
          paymentSummary={paymentSummary} 
          loadCart={loadCart} 
        />
        <Location />
      </MemoryRouter>
    );

    const orderButton = screen.getByTestId('place-order-button');

    await user.click(orderButton);

    expect(axios.post).toHaveBeenCalledWith('/api/orders');
    expect(loadCart).toHaveBeenCalled();
    expect(screen.getByTestId('url-path')).toHaveTextContent('/orders');

  });

});