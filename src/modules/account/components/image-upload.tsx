import React, { useRef, useState } from 'react';
import CloudUploadTwoToneIcon from '@mui/icons-material/CloudUploadTwoTone';
import { useUploadImageMutation } from '#/shared/hooks/upload-image.hook';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

interface ImageUploadProps {
  defaultImage: string;
  onImageUpload: (imageUrl: string) => void;
  disabled: boolean;
}

export function ImageUpload({ defaultImage, onImageUpload, disabled }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string>(defaultImage);
  const mutation = useUploadImageMutation();
  const theme = useTheme();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const objectUrl = URL.createObjectURL(file);

      setPreview(objectUrl);

      const formData = new FormData();
      formData.append('file', file);

      mutation.mutate(formData, {
        onSuccess: (data) => {
          onImageUpload(data.objectUrl);
        },
        onError: () => {
          alert('Failed to upload image');
        },
      });
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };
  const { t } = useTranslation();

  return (
    <Box sx={{ textAlign: 'center', position: 'relative' }}>
      <input type="file" accept="image/*" style={{ display: 'none' }} ref={fileInputRef} onChange={handleFileChange} />
      <img
        src={preview}
        alt="Preview"
        style={{
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          objectFit: 'cover',
          marginBottom: '10px',
        }}
      />

      <Button
        disabled={disabled}
        onClick={handleUploadClick}
        variant="contained"
        sx={{
          gap: 0.5,
          position: 'absolute',
          bottom: '2px',
          left: '45px ',
          background: `${theme.palette.secondary.main}`,
          borderRadius: '50px',
          color: 'white',
        }}
      >
        <CloudUploadTwoToneIcon />
        {t('profile.buttons.add')}
      </Button>
    </Box>
  );
}
