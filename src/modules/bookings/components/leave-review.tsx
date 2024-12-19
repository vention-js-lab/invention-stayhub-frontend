import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useValidatedUrlParams } from '#/shared/hooks/validated-url-params.hook';
import { checkoutUrlParamsSchema, type CheckoutUrlParams } from '../schemas/checkout-url-params.schema';
import { useReviewMutation } from '../api/create-review.api';
import { type SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { type ReviewFormData, reviewFormDataSchema } from '../schemas/review-form.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { showSnackbar } from '#/shared/utils/custom-snackbar.util';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function LeaveReview() {
  const { t } = useTranslation();
  const mutation = useReviewMutation();

  const { handleSubmit, register, setValue, control } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewFormDataSchema),
  });

  const { bookingId } = useValidatedUrlParams<CheckoutUrlParams>(checkoutUrlParamsSchema);
  const ratingValue = useWatch({ control, name: 'rating', defaultValue: 0 });
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<ReviewFormData> = (data) => {
    mutation.mutate(
      { bookingId, review: data },
      {
        onSuccess: () => {
          showSnackbar({ message: t('snackbars.successAddReview'), variant: 'success' });
          setValue('content', '');
          setValue('rating', 0);
          navigate(`/bookings`);
        },
        onError: () => {
          showSnackbar({
            message: t('snackbars.errorSomething'),
            variant: 'error',
          });
        },
      }
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        width: 500,
        margin: '0 auto',
        padding: 20,
        border: '1px solid #ccc',
        borderRadius: 10,
        backgroundColor: '#f9f9f9',
      }}
    >
      <Rating
        name="rating"
        value={ratingValue}
        onChange={(_, value) => {
          if (value) {
            setValue('rating', value);
          }
          return true;
        }}
      />

      <TextField
        {...register('content')}
        label="Write your review"
        multiline={true}
        minRows={3}
        placeholder="Share your experience (optional)"
        variant="outlined"
      />

      <Button
        variant="contained"
        color="secondary"
        type="submit"
        sx={{
          padding: '12px 24px',
          fontSize: '16px',
          borderRadius: '8px',
        }}
      >
        Submit Review
      </Button>
    </form>
  );
}
