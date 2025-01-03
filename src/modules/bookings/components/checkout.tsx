import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { PaymentForm } from './payment-form';
import { useCheckoutDetails } from '../hooks/checkout-details.hook';
import { useValidatedUrlParams } from '#/shared/hooks/validated-url-params.hook';
import { BookingDetails } from './booking-details';
import { useNavigate } from 'react-router-dom';
import { type CheckoutUrlParams, checkoutUrlParamsSchema } from '../schemas/checkout-url-params.schema';
import { validatedEnv } from '#/configs/env.config';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useTranslation } from 'react-i18next';

const stripePromise = loadStripe(validatedEnv.VITE_STRIPE_PUBLISHABLE_KEY);

const styles = {
  container: {
    display: 'flex',
    gap: 2,
    marginTop: 4,
    marginBottom: 8,
    width: '100%',
    maxWidth: 1000,
    '@media (max-width: 960px)': {
      flexDirection: 'column',
    },
  },
  form: {
    flexGrow: 1,
    marginRight: 4,
    '@media (max-width: 960px)': {
      marginRight: 0,
    },
  },
  heading: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 2,
  },
  payTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    '@media (max-width: 600px)': {
      fontSize: 20,
    },
  },
};

export function Checkout() {
  const { t } = useTranslation();
  const { bookingId } = useValidatedUrlParams<CheckoutUrlParams>(checkoutUrlParamsSchema);
  const { booking, priceDetails, paymentToken: clientSecret } = useCheckoutDetails(bookingId);
  const navigate = useNavigate();

  return (
    <Box sx={styles.container}>
      <Box sx={styles.form}>
        <Box sx={styles.heading}>
          <IconButton
            onClick={() => {
              navigate(-1);
            }}
          >
            <ArrowBackIcon fontSize="small" />
          </IconButton>
          <Typography sx={styles.payTitle}>{t('bookings.payTitle')}</Typography>
        </Box>
        {clientSecret ? (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <PaymentForm />
          </Elements>
        ) : null}
      </Box>
      <Box>{booking && priceDetails ? <BookingDetails booking={booking} priceDetails={priceDetails} /> : null}</Box>
    </Box>
  );
}
