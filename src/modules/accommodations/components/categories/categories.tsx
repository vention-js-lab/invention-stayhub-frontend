import Box from '@mui/material/Box';
import Slider from 'react-slick';
import { useCategoriesQuery } from '#/shared/apis/get-categories.api';
import Typography from '@mui/material/Typography';
import { CustomPrevArrow, CustomNextArrow } from './slider-buttons';
import { useState } from 'react';
import { useListAccommodationQueryParams } from '#/modules/accommodations/hooks/list-accommodations-query-params.hook';
import { useTranslation } from 'react-i18next';

const styles = {
  categoryBox: (isSelected: boolean) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottom: isSelected ? '2px solid #E91E63' : '2px solid transparent',
    '&:hover': { borderBottom: isSelected ? '' : '2px solid #e9e9e9', cursor: 'pointer' },
    textAlign: 'center',
    fontSize: '10px',
    opacity: '0.9',
  }),
};

export function CategoriesCarousel() {
  const { data: categoriesData } = useCategoriesQuery();
  const { t } = useTranslation();
  const categories = categoriesData?.result;

  const { validatedQueryParams, setQueryParams } = useListAccommodationQueryParams();
  const [selectedCategory, setSelectedCategory] = useState(validatedQueryParams.category || null);

  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setQueryParams({ category: categoryName });
  };

  const carouselSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 10,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    arrows: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };
  return (
    <Box sx={{ p: 3, gap: 1, position: 'relative' }}>
      <Slider {...carouselSettings}>
        {categories?.map((category) => (
          <Box
            key={category.id}
            sx={styles.categoryBox(selectedCategory === category.name)}
            onClick={() => handleCategorySelect(category.name)}
          >
            <img src={category.icon} alt="" style={{ width: '26px', height: '24px', margin: 'auto' }} />
            <Typography sx={{ fontSize: '14px', marginTop: '5px' }}>
              {t(`categories.${category.name.toLowerCase().replace(/\s+/g, '')}`)}
            </Typography>
          </Box>
        ))}
      </Slider>
    </Box>
  );
}
