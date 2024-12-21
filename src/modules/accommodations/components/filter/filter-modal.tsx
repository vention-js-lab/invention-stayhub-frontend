import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import CloseIcon from '@mui/icons-material/Close';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { amenitiesMap } from '#/shared/constants/amenities-map.constant';

import { type AccommodationFilterParams } from '#/modules/accommodations/types/accommodation-filter-params.type';
import { accommdationSortByMap, AccommodationListSortBy } from '#/modules/accommodations/constants/sort-by.constant';
import { SortOrder, sortOrderMap } from '#/shared/constants/sort-order.constant';
import { useListAccommodationQueryParams } from '#/modules/accommodations/hooks/list-accommodations-query-params.hook';
import { type AmenityKey } from '#/shared/constants/accommodation-amenity.type';
import { useTranslation } from 'react-i18next';

interface FilterModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const initialFilterParams: AccommodationFilterParams = {
  minPrice: 0,
  maxPrice: 10000,
  sortBy: AccommodationListSortBy.Price,
  sortOrder: SortOrder.Asc,
};

const styles = {
  closeIcon: {
    position: 'absolute',
    left: '25px',
    top: '25px',
    cursor: 'pointer',
  },

  applyButton: {
    color: '#fff',
    fontWeight: '500',
    fontSize: '16px',
    backgroundColor: '#E91E63',
    '&:hover': {
      backgroundColor: '#CA1A55',
    },
  },

  amenityButtons: (isSelected: boolean) => ({
    border: '1px solid #C7C7C7',
    borderColor: isSelected ? '#E91E63' : '#C7C7C7',
    fontSize: '16px',
    borderRadius: '20px',
    backgroundColor: isSelected ? '#E91E63' : '#fff',
    margin: '0 5px 5px 0',
    color: isSelected ? '#fff' : '#C7C7C7',
    '&:hover': {
      borderColor: '#E91E63',
      backgroundColor: '#E91E63',
      color: '#fff',
    },
  }),

  roomButton: (isSelected: boolean) => ({
    flex: 1,
    paddingY: '8px',
    border: '2px solid #E91E63',
    fontSize: '16px',
    borderRadius: '20px',
    backgroundColor: isSelected ? '#E91E63' : '#fff',
    color: isSelected ? '#fff' : '#000',
    '&:hover': {
      backgroundColor: '#E91E63',
      color: '#fff',
    },
  }),
};

export function AccommodationFilterModal({ open, setOpen }: FilterModalProps) {
  const { t } = useTranslation();
  const [priceRange, setPriceRange] = useState([initialFilterParams.minPrice || 0, initialFilterParams.maxPrice || 10000]);
  const { setQueryParams, validatedQueryParams } = useListAccommodationQueryParams();
  const [_searchParams, setSearchParams] = useSearchParams();
  const { handleSubmit, setValue, getValues, reset, control } = useForm<AccommodationFilterParams>({
    defaultValues: {
      ...initialFilterParams,
      ...validatedQueryParams,
    },
  });

  const handlePriceRange = (newPriceRange: [min: number, max: number]) => {
    setPriceRange(newPriceRange);
    const [minPrice, maxPrice] = newPriceRange as number[];
    setValue('minPrice', minPrice);
    setValue('maxPrice', maxPrice);
  };

  const handlePriceChange = (value: number, is: 'min' | 'max') => {
    if (!value || value === Infinity) return;

    const currentMinPrice = getValues('minPrice') || 0;
    const currentMaxPrice = getValues('maxPrice') || 10000;

    const newMinPrice = Math.min(value, currentMaxPrice);
    const newMaxPrice = Math.max(value, currentMinPrice);

    if (is === 'min') {
      setValue('minPrice', newMinPrice);
      setPriceRange([newMinPrice, currentMaxPrice]);
    } else {
      setValue('maxPrice', newMaxPrice);
      setPriceRange([currentMinPrice, newMaxPrice]);
    }
  };

  const handleAmenitySelection = (amenityKey: AmenityKey) => {
    setValue(amenityKey, !getValues(amenityKey));
  };

  const applyFilters = (data: AccommodationFilterParams) => {
    setPriceRange([initialFilterParams.minPrice || 0, initialFilterParams.maxPrice || 10000]);
    setQueryParams(data);
    reset();
    setOpen(false);
  };

  const handleClearAll = () => {
    setPriceRange([initialFilterParams.minPrice || 0, initialFilterParams.maxPrice || 10000]);
    setSearchParams({});
    reset();
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <form onSubmit={handleSubmit(applyFilters)}>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', maxWidth: '600px' }}>
          <DialogTitle>
            <CloseIcon sx={styles.closeIcon} onClick={() => setOpen(false)} />
            <Typography textAlign="center" fontWeight="600" fontSize="18px">
              {t('filterModal.title')}
            </Typography>
          </DialogTitle>

          <Divider sx={{ marginBottom: '15px', backgroundColor: '#000' }} />

          <Box sx={{ paddingX: '10px' }}>
            <Typography fontWeight="500" fontSize="16px" sx={{}}>
              {t('filterModal.priceRange')}
            </Typography>
            <Typography mb="6px" sx={{ color: '#333' }}>
              {t('filterModal.info')}
            </Typography>
            <Slider
              value={priceRange}
              onChange={(_, newPrice) => handlePriceRange(newPrice as [min: number, max: number])}
              valueLabelDisplay="auto"
              color="secondary"
              min={0}
              max={10000}
            />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', margin: '8px 10px 0' }}>
            <Controller
              name="minPrice"
              control={control}
              render={({ field }) => (
                <TextField
                  sx={{ width: '200px' }}
                  label={t('filterModal.minPrice')}
                  value={field.value}
                  onChange={(e) => handlePriceChange(Number(e.target.value), 'min')}
                  slotProps={{
                    input: {
                      endAdornment: <Typography>$</Typography>,
                    },
                  }}
                />
              )}
            />
            <Controller
              name="maxPrice"
              control={control}
              render={({ field }) => (
                <TextField
                  sx={{ width: '200px' }}
                  label={t('filterModal.maxPrice')}
                  value={field.value}
                  onChange={(e) => handlePriceChange(Number(e.target.value), 'max')}
                  slotProps={{
                    input: {
                      endAdornment: <Typography>$</Typography>,
                    },
                  }}
                />
              )}
            />
          </Box>

          <Divider sx={{ margin: '20px 0 15px 0' }} />

          <Box>
            <Typography fontWeight="500" mb="8px" fontSize="16px">
              {t('filterModal.rooms')}
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '2px', justifyContent: 'space-between' }}>
              {[1, 2, 3, 4, 5].map((room) => (
                <Controller
                  name="rooms"
                  key={room}
                  control={control}
                  render={({ field }) => (
                    <Button sx={styles.roomButton(room === field.value)} onClick={() => setValue('rooms', room)}>
                      {room}
                    </Button>
                  )}
                />
              ))}
            </Box>
          </Box>

          <Divider sx={{ margin: '15px 0' }} />

          <Box sx={{ display: 'flex', gap: '10px' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '50%' }}>
              <Typography fontWeight="500" fontSize="16px" noWrap={true}>
                {t('filterModal.sortBy')}:
              </Typography>
              <Controller
                name="sortBy"
                control={control}
                render={({ field }) => (
                  <Select
                    size="medium"
                    value={field.value}
                    onChange={(e) => setValue('sortBy', e.target.value as AccommodationListSortBy)}
                  >
                    {accommdationSortByMap.map(({ key }) => (
                      <MenuItem key={key} value={key}>
                        {t(`filterModal.sortByOptions.${key}`)}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '50%' }}>
              <Typography fontWeight="500" fontSize="16px" noWrap={true}>
                {t('filterModal.orderBy')}:
              </Typography>
              <Controller
                name="sortOrder"
                control={control}
                render={({ field }) => (
                  <Select size="medium" value={field.value} onChange={(e) => setValue('sortOrder', e.target.value as SortOrder)}>
                    {sortOrderMap.map(({ key }) => (
                      <MenuItem key={key} value={key}>
                        {t(`filterModal.orderByOptions.${key.toLowerCase()}`)}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </Box>
          </Box>

          <Divider sx={{ margin: '15px 0' }} />

          <Box>
            <Typography fontWeight="500" mb="8px" fontSize="16px">
              {t('amenities.name')}
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
              {Object.entries(amenitiesMap).map(([key, { icon: Icon }]) => (
                <Controller
                  key={key}
                  name={key as AmenityKey}
                  control={control}
                  render={({ field }) => (
                    <IconButton
                      sx={styles.amenityButtons(Boolean(field.value))}
                      onClick={() => handleAmenitySelection(key as AmenityKey)}
                    >
                      <Icon />
                      <Typography>{t(`amenities.${key}`)}</Typography>
                    </IconButton>
                  )}
                />
              ))}
            </Box>
          </Box>

          <DialogActions sx={{ display: 'flex', justifyContent: 'space-between', padding: '0', marginTop: '15px' }}>
            <Button size="large" onClick={handleClearAll} sx={{ paddingX: '0', color: '#000' }}>
              {t('filterModal.buttons.clear')}
            </Button>
            <Button variant="contained" size="large" type="submit" sx={styles.applyButton}>
              {t('filterModal.buttons.apply')}
            </Button>
          </DialogActions>
        </DialogContent>
      </form>
    </Dialog>
  );
}
