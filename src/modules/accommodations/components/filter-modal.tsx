import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
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
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

import { type AccommodationFilterParams } from '../types/accommodation-filter-params.type';
import { accommdationSortByMap, AccommodationListSortBy } from '../constants/sort-by.constant';
import { SortOrder, sortOrderMap } from '#/shared/constants/sort-order.constant';
import { useListAccommodationQueryParams } from '../hooks/list-accommodations-query-params.hook';
import { useSearchParams } from 'react-router-dom';
import { amenitiesMap } from '../constants/amenities-map.constant';

interface FilterModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

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
    margin: '0 2px 2px 0',
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
  const { setQueryParams } = useListAccommodationQueryParams();
  const [_searchParams, setSearchParams] = useSearchParams();
  const [filterParams, setFilterParams] = useState<AccommodationFilterParams>({
    minPrice: 0,
    maxPrice: 10000,
    sortBy: AccommodationListSortBy.Price,
    sortOrder: SortOrder.Asc,
  });

  const handlePriceRange = (newPrice: number | number[]) => {
    const [minPrice, maxPrice] = newPrice as number[];
    setFilterParams((prev) => ({
      ...prev,
      minPrice,
      maxPrice,
    }));
  };

  const handlePriceChange = (value: number, isMinPrice: boolean) => {
    if (!value || value === Infinity) {
      return;
    }
    if (isMinPrice) {
      setFilterParams((prev) => ({
        ...prev,
        minPrice: Math.min(value, prev.maxPrice),
      }));
    } else {
      setFilterParams((prev) => ({
        ...prev,
        maxPrice: Math.max(value, prev.minPrice),
      }));
    }
  };

  const handleRoomSelection = (rooms: number) => {
    setFilterParams((prev) => ({
      ...prev,
      rooms: rooms,
    }));
  };

  const handleAmenitySelection = (amenityKey: keyof AccommodationFilterParams) => {
    setFilterParams((prev) => ({
      ...prev,
      [amenityKey]: !prev[amenityKey],
    }));
  };

  const handleApplyFilters = () => {
    setQueryParams(filterParams);
    setOpen(false);
  };

  const handleClearAll = () => {
    setFilterParams({
      minPrice: 0,
      maxPrice: 10000,
      sortBy: AccommodationListSortBy.Price,
      sortOrder: SortOrder.Asc,
    });

    setSearchParams({});
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', maxWidth: '600px' }}>
        <DialogTitle>
          <CloseIcon sx={styles.closeIcon} onClick={() => setOpen(false)} />
          <Typography textAlign="center" fontWeight="600" fontSize="18px">
            Filter Options
          </Typography>
        </DialogTitle>

        <Divider sx={{ marginBottom: '15px', backgroundColor: '#000' }} />

        <Box sx={{ paddingX: '10px' }}>
          <Typography fontWeight="500" fontSize="16px" sx={{}}>
            Price Range
          </Typography>
          <Typography mb="6px" sx={{ color: '#333' }}>
            Nightly prices before fees and taxes
          </Typography>
          <Slider
            value={[filterParams.minPrice, filterParams.maxPrice]}
            onChange={(_, newPrice) => handlePriceRange(newPrice)}
            valueLabelDisplay="auto"
            color="secondary"
            min={0}
            max={10000}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', margin: '8px 10px 0' }}>
          <TextField
            sx={{ width: '200px' }}
            label="Min Price"
            value={filterParams.minPrice}
            slotProps={{
              input: {
                endAdornment: <Typography>$</Typography>,
              },
            }}
            onChange={(e) => handlePriceChange(Number(e.target.value), true)}
          />
          <TextField
            sx={{ width: '200px' }}
            label="Max Price"
            value={filterParams.maxPrice}
            onChange={(e) => handlePriceChange(Number(e.target.value), false)}
            slotProps={{
              input: {
                endAdornment: <Typography>$</Typography>,
              },
            }}
          />
        </Box>

        <Divider sx={{ margin: '20px 0 15px 0' }} />

        <Box>
          <Typography fontWeight="500" mb="8px" fontSize="16px">
            Rooms
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '2px', justifyContent: 'space-between' }}>
            {[1, 2, 3, 4, 5].map((room) => (
              <Button key={room} sx={styles.roomButton(room === filterParams.rooms)} onClick={() => handleRoomSelection(room)}>
                {room}
              </Button>
            ))}
          </Box>
        </Box>

        <Divider sx={{ margin: '15px 0' }} />

        <Box sx={{ display: 'flex', gap: '10px' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '50%' }}>
            <Typography fontWeight="500" fontSize="16px" noWrap={true}>
              Sort by:
            </Typography>
            <Select
              size="medium"
              value={filterParams.sortBy}
              onChange={(e) =>
                setFilterParams((prev) => ({
                  ...prev,
                  sortBy: e.target.value as AccommodationListSortBy,
                }))
              }
            >
              {accommdationSortByMap.map(({ key, name }) => (
                <MenuItem key={key} value={key}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '50%' }}>
            <Typography fontWeight="500" fontSize="16px" noWrap={true}>
              Order by:
            </Typography>
            <Select
              size="medium"
              value={filterParams.sortOrder}
              onChange={(e) =>
                setFilterParams((prev) => ({
                  ...prev,
                  sortOrder: e.target.value as SortOrder,
                }))
              }
            >
              {sortOrderMap.map(({ key, name }) => (
                <MenuItem key={key} value={key}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Box>

        <Divider sx={{ margin: '15px 0' }} />

        <Box>
          <Typography fontWeight="500" mb="8px" fontSize="16px">
            Amenities
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            {Object.entries(amenitiesMap).map(([key, { icon: Icon, label }]) => (
              <IconButton
                sx={styles.amenityButtons(Boolean(filterParams[key as keyof AccommodationFilterParams]))}
                key={key}
                onClick={() => handleAmenitySelection(key as keyof AccommodationFilterParams)}
              >
                <Icon />
                <Typography>{label}</Typography>
              </IconButton>
            ))}
          </Box>
        </Box>

        <DialogActions sx={{ display: 'flex', justifyContent: 'space-between', padding: '0', marginTop: '25px' }}>
          <Button size="large" onClick={handleClearAll} sx={{ paddingX: '0', color: '#000' }}>
            Clear All
          </Button>
          <Button variant="contained" size="large" onClick={handleApplyFilters} sx={styles.applyButton}>
            Apply Filters
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
