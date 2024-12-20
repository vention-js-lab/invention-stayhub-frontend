import { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { showSnackbar } from '#/shared/utils/custom-snackbar.util';
import { PayButton } from './pay-button';
import { PaymentProcessingButton } from './payment-processing-button';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import { useTranslation } from 'react-i18next';

const styles = {
  container: {
    padding: 1,
  },
};

export function PaymentForm() {
  const { t } = useTranslation();
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  async function handleClick() {
    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
    });

    if (error && error.type === 'card_error') {
      showSnackbar({
        message: `${t('snackbars.errorTransaction')}: ${error.message}`,
        variant: 'error',
      });
    }

    if (paymentIntent && paymentIntent.status === 'succeeded') {
      showSnackbar({
        message: t('snackbars.successTransaction'),
        variant: 'success',
      });

      navigate(`/bookings`);
    }

    setIsProcessing(false);
  }

  return (
    <Card sx={styles.container}>
      <form>
        <PaymentElement />
        {isProcessing ? <PaymentProcessingButton /> : <PayButton handleClick={handleClick} />}
      </form>
    </Card>
  );
}
