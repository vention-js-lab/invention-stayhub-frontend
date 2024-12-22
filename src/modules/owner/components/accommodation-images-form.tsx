import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDropzone } from 'react-dropzone';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { type Theme } from '@mui/material';
import Box from '@mui/material/Box';
import Grid2 from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ImageIcon from '@mui/icons-material/Image';
import ClearIcon from '@mui/icons-material/Clear';
import StarIcon from '@mui/icons-material/Star';
import { pink } from '@mui/material/colors';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import { useUpdateAccommodationMutation } from '../api/update-accommodation.api';
import { type UpdateImageData } from '../types/create-accommodation-response.type';
import { showSnackbar } from '#/shared/utils/custom-snackbar.util';
import { useUploadImageMutation } from '#/shared/hooks/upload-image.hook';
import { useAccommodationDetailsQuery } from '../api/get-accommodation-details.api';
import { useTranslation } from 'react-i18next';

const styles = {
  heading: (theme: Theme) => ({
    marginTop: '16px',
    marginBottom: '16px',
    fontWeight: 'bold',
    fontSize: '24px',
    color: '#333',
    [theme.breakpoints.down('sm')]: {
      fontSize: '20px',
    },
  }),
  button: (theme: Theme) => ({
    backgroundColor: theme.palette.secondary.main,
    height: '42px',
    py: 2,
    px: 4,
    mt: 2,
    [theme.breakpoints.down('sm')]: {
      py: 1,
      px: 2,
      fontSize: '14px',
    },
  }),
  imgIcon: {
    minWidth: 'auto',
    padding: '2px',
    ml: 'auto',
  },
  starIcon: {
    minWidth: 'auto',
    padding: '2px',
    position: 'absolute',
    top: '8px',
    right: '8px',
    backgroundColor: 'white',
    borderRadius: '50%',
  },
  selectedFiles: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '0.5rem',
    overflow: 'hidden',
  },
  dragAndDropArea: (theme: Theme) => ({
    border: '2px dashed #ccc',
    padding: '2rem',
    textAlign: 'center',
    cursor: 'pointer',
    marginBottom: '1rem',
    [theme.breakpoints.down('sm')]: {
      padding: '1rem',
    },
  }),
  uploadedImgs: {
    position: 'relative',
    width: '100%',
    maxWidth: '200px',
    height: 'auto',
  },
  uploadedImgHeading: (theme: Theme) => ({
    fontWeight: 'bold',
    fontSize: '18px',
    color: '#696969',
    marginBottom: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      fontSize: '16px',
    },
  }),
};

export function AccommodationImagesForm() {
  const { t } = useTranslation();
  const accommodationId = localStorage.getItem('createdAccommodationId');
  const updateAccommodationMutation = useUpdateAccommodationMutation<UpdateImageData>();
  const uploadImageMutation = useUploadImageMutation();
  const { handleSubmit } = useForm<UpdateImageData>();
  const { data, refetch } = useAccommodationDetailsQuery(accommodationId);

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [coverImage, setCoverImage] = useState<string>('');

  const handleDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length + selectedFiles.length > 10) {
      alert('You can select up to 10 images.');
      return;
    }
    setSelectedFiles((prev) => [...prev, ...acceptedFiles]);
  };

  const handleRemoveFile = (fileToRemove: File) => {
    setSelectedFiles((prev) => prev.filter((file) => file !== fileToRemove));
  };

  const handleCoverImageChange = (imageUrl: string) => {
    setCoverImage(imageUrl);
    if (accommodationId) {
      updateAccommodationMutation.mutate(
        {
          id: accommodationId,
          data: { coverImage: imageUrl },
        },
        {
          onSuccess: () => {
            showSnackbar({
              message: t('snackbars.successUploadCoverImg'),
              variant: 'success',
            });
          },
          onError: () => {
            showSnackbar({
              message: t('snackbars.errorSomething'),
              variant: 'error',
            });
          },
        }
      );
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    accept: { 'image/*': [] },
    maxFiles: 10,
  });

  const onSubmit: SubmitHandler<UpdateImageData> = async () => {
    if (accommodationId) {
      const uploadedImages: UpdateImageData['images'] = await Promise.all(
        selectedFiles.map(async (file) => {
          const formData = new FormData();
          formData.append('file', file);
          const { objectUrl } = await uploadImageMutation.mutateAsync(formData, {
            onSuccess: () => {
              showSnackbar({
                message: t('snackbars.successUploadImg'),
                variant: 'success',
              });
              setSelectedFiles([]);
            },
            onError: () => {
              showSnackbar({
                message: t('snackbars.errorUploadImg'),
                variant: 'error',
              });
            },
          });
          return { url: objectUrl };
        })
      );

      updateAccommodationMutation.mutate(
        {
          id: accommodationId,
          data: {
            images: uploadedImages,
          },
        },
        {
          onSuccess: () => {
            showSnackbar({
              message: t('snackbars.successSaved'),
              variant: 'success',
            });
            refetch();
          },
          onError: () => {
            showSnackbar({
              message: t('snackbars.errorSomething'),
              variant: 'error',
            });
          },
        }
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography sx={(theme) => styles.heading(theme)}>{t('accommodation.images.title')}</Typography>
      <Box {...getRootProps()} sx={(theme) => styles.dragAndDropArea(theme)}>
        <input {...getInputProps()} />
        <AddPhotoAlternateOutlinedIcon />
        <Typography>{t('accommodation.images.uploadField')}</Typography>
      </Box>
      {selectedFiles.length > 0 && (
        <Box>
          <Typography>{t('accommodation.images.selected')}:</Typography>
          <Grid2 container={true} spacing={2}>
            {selectedFiles.map((file) => (
              <Grid2
                key={uuidv4()}
                container={false}
                sx={{
                  gridColumn: { xs: 'span 6', sm: 'span 4', md: 'span 2' },
                }}
              >
                <Box sx={styles.selectedFiles}>
                  <ImageIcon sx={{ marginRight: '0.5rem', color: '#666' }} />
                  <Typography noWrap={true}>{file.name}</Typography>
                  <Button size="small" sx={styles.imgIcon} onClick={() => handleRemoveFile(file)}>
                    <ClearIcon />
                  </Button>
                </Box>
              </Grid2>
            ))}
          </Grid2>
        </Box>
      )}
      {/* eslint-disable-next-line react/jsx-no-leaked-render */}
      {data?.images && data.images.length > 0 && (
        <Box>
          <Typography sx={(theme) => styles.uploadedImgHeading(theme)}>{t('accommodation.images.selected')}:</Typography>
          <Grid2 container={true} spacing={2}>
            {data.images.map((image) => {
              const isCoverImage = coverImage === image.url;

              return (
                <Grid2
                  key={uuidv4()}
                  container={false}
                  sx={{
                    gridColumn: { xs: 'span 6', sm: 'span 4', md: 'span 2' },
                  }}
                >
                  <Box sx={styles.uploadedImgs}>
                    <Box component="img" src={image.url} sx={{ width: '100%' }} />
                    <Button size="small" sx={styles.starIcon} onClick={() => handleCoverImageChange(image.url)}>
                      {isCoverImage ? <StarIcon sx={{ color: pink[500] }} /> : <StarBorderIcon />}
                    </Button>
                  </Box>
                </Grid2>
              );
            })}
          </Grid2>
        </Box>
      )}
      <Box mt={3} mb={2} display="flex" justifyContent="flex-end">
        <Button variant="contained" sx={(theme) => styles.button(theme)} type="submit">
          {t('accommodation.images.uploadButton')}
        </Button>
      </Box>
    </form>
  );
}
