import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { useCategoriesQuery } from '#/shared/apis/get-categories.api';
import { useTranslation } from 'react-i18next';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export function SelectCategory({
  categoryIds,
  setCategoryIds,
}: {
  categoryIds: string[];
  setCategoryIds: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const { t } = useTranslation();
  const { data: categoriesData } = useCategoriesQuery();
  const categories = categoriesData?.result;

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    setCategoryIds(event.target.value as string[]);
  };

  return (
    <FormControl sx={{ width: '100%' }}>
      <InputLabel id="categories">{t('categories.name')}</InputLabel>
      <Select
        label={t('categories.name')}
        id="categories"
        multiple={true}
        value={categoryIds}
        onChange={handleChange}
        input={<OutlinedInput label={t('categories.name')} />}
        renderValue={(selectedIds) =>
          selectedIds
            .map((id) =>
              categories
                ?.find((category) => category.id === id)
                ?.name.toLowerCase()
                .replace(/\s+/g, '')
            )
            .filter(Boolean)
            .map((categoryKey) => t(`categories.${categoryKey?.toLowerCase().replace(/\s+/g, '')}`))
            .join(', ')
        }
        MenuProps={MenuProps}
      >
        {categories
          ? categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                <Checkbox checked={categoryIds.includes(category.id)} />
                <ListItemText primary={t(`categories.${category.name.toLowerCase().replace(/\s+/g, '')}`)} />
              </MenuItem>
            ))
          : null}
      </Select>
    </FormControl>
  );
}
