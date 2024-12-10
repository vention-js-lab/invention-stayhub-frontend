import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Countries } from '../constants/countries.constant';
import { type Country } from '../types/country.type';
import React from 'react';

interface CountrySelectorProps {
  disabled: boolean;
  selectedCountry: Country | null;
  onCountryChange: (event: React.SyntheticEvent, newValue: Country | null) => void;
}

export function CountrySelect({ disabled, selectedCountry, onCountryChange }: CountrySelectorProps) {
  return (
    <Autocomplete
      disabled={disabled}
      id="country-select-demo"
      value={selectedCountry}
      options={Countries}
      autoHighlight={true}
      onChange={onCountryChange}
      getOptionLabel={(option) => option.label}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        return (
          <Box key={key} component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...optionProps}>
            <img
              loading="lazy"
              width="20"
              srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
              src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
              alt=""
            />
            {option.label} ({option.code}) +{option.phone}
          </Box>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          slotProps={{
            htmlInput: {
              ...params.inputProps,
              autoComplete: 'new-password',
            },
          }}
        />
      )}
    />
  );
}
