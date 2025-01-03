import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid2 from '@mui/material/Grid2';
import Avatar from '@mui/material/Avatar';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useOwnerDetailsQuery } from '../api/get-owner-details';
import imagePlaceholder from '#/assets/images/avatar-placeholder.png';
import { readableDate } from '#/shared/utils/readable-date.util';
import { AccommodationCard } from '#/modules/accommodations/components/accommodation-card/accommodation-card';
import { calculateOverallRating } from '#/modules/accommodations/components/reviews/rating.component';
import DefaultImage from '#/assets/images/default-home-image.png';
import { NoResult } from '#/shared/components/no-result';
import Divider from '@mui/material/Divider';

export function OwnerProfile() {
  const { t } = useTranslation();
  const { ownerId } = useParams<{ ownerId: string }>();
  const { data, status } = useOwnerDetailsQuery(ownerId);

  if (status === 'pending') return <Typography>{t('UI.loading')}</Typography>;
  if (status === 'error') return <Typography>{t('snackbars.errorLoadingOwnerDetails')}</Typography>;
  if (!data) return <Typography>{t('snackbars.noData')}</Typography>;

  return (
    <Box>
      <Box
        sx={(theme) => ({
          padding: theme.spacing(3),
          maxWidth: 800,
          margin: '0 auto',
          borderRadius: 2,
          boxShadow: 1,
          [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(2),
          },
        })}
      >
        <Box
          sx={(theme) => ({
            display: 'flex',
            alignItems: 'center',
            marginBottom: theme.spacing(2),
            [theme.breakpoints.down('sm')]: {
              flexDirection: 'column',
              textAlign: 'center',
            },
          })}
        >
          <Avatar
            src={data.ownerProfile.image || imagePlaceholder}
            sx={(theme) => ({
              width: '200px',
              height: '200px',
              marginRight: theme.spacing(2),
              [theme.breakpoints.down('sm')]: {
                width: '150px',
                height: '150px',
                marginBottom: theme.spacing(2),
                marginRight: 0,
              },
            })}
          />
          <Box sx={{ marginLeft: { xs: 0, sm: 2 }, textAlign: { xs: 'center', sm: 'left' } }}>
            <Typography
              variant="h5"
              sx={(theme) => ({
                fontWeight: 600,
                fontSize: '30px',
                [theme.breakpoints.down('sm')]: {
                  fontSize: '24px',
                },
              })}
            >
              {data.ownerProfile.firstName} {data.ownerProfile.lastName}
            </Typography>
            <Typography color="text.secondary" sx={{ fontSize: '20px' }}>
              {t('profile.country')}: {data.ownerProfile.country}
            </Typography>
            <Typography sx={{ padding: 0 }} variant="body1" color="text.secondary">
              {t('singleAccommodation.since')}: {readableDate(data.ownerProfile.createdAt)}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ padding: 2 }}>
          <Typography
            variant="body2"
            sx={(theme) => ({
              fontStyle: 'italic',
              fontSize: '18px',
              [theme.breakpoints.down('sm')]: {
                fontSize: '16px',
              },
            })}
          >
            “ {data.ownerProfile.description || 'No description available.'} ”
          </Typography>
        </Box>
      </Box>

      <Box sx={{ mt: 5 }}>
        <Typography
          sx={(theme) => ({
            fontSize: '24px',
            marginBottom: theme.spacing(1),
            textAlign: 'left',
            [theme.breakpoints.down('sm')]: {
              textAlign: 'center',
            },
          })}
          variant="body1"
        >
          {t('profile.ownerAccommodations')}
        </Typography>

        <Divider sx={{ color: '#000', mb: 3, boxShadow: 1 }} />
        <Grid2 container={true} spacing={3}>
          {data.ownerAccommodations.length > 0 ? (
            data.ownerAccommodations.map((item) => (
              <Grid2 key={item.id} size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}>
                <AccommodationCard
                  status={status}
                  id={item.id}
                  image={item.coverImage ? item.coverImage : DefaultImage}
                  name={item.name}
                  address={item.address}
                  pricePerNight={item.price}
                  isSavedToWishlist={false}
                  rating={calculateOverallRating(item.reviews)}
                />
              </Grid2>
            ))
          ) : (
            <NoResult text={t('empties.emptyWishlist')} />
          )}
        </Grid2>
      </Box>
    </Box>
  );
}
