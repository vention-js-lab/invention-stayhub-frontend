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

const stripePromise = loadStripe(validatedEnv.VITE_STRIPE_PUBLISHABLE_KEY);

const styles = {
  container: {
    display: 'flex',
    gap: 2,
    marginTop: 4,
    marginBottom: 8,
    width: '100%',
    maxWidth: 1000,
  },
  form: {
    flexGrow: 1,
    marginRight: 4,
  },
  heading: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 2,
  },
};

export function Checkout() {
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
          <Typography fontSize={26} fontWeight="bold">
            {"Let's Make Your Trip Official"}
          </Typography>
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
