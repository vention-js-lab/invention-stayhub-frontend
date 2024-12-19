import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import LanguageIcon from '@mui/icons-material/Language';
import { style } from '#/layout/styles/style';
import { type LanguageCode } from '#/shared/types/language.type';
import { useTranslation } from 'react-i18next';

export function Languages() {
  const { i18n, t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode>('en');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLanguageChange = (language: LanguageCode) => {
    i18n.changeLanguage(language);
    setSelectedLanguage(language);
    handleClose();
  };

  return (
    <>
      <Button sx={style.languages} onClick={handleOpen}>
        <LanguageIcon fontSize="medium" />
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle sx={{ textAlign: 'center', pb: '8px' }}>{t('chooseLanguage')}</DialogTitle>
        <DialogContent>
          <FormControl component="fieldset">
            <RadioGroup
              value={selectedLanguage}
              sx={{ width: '200px' }}
              onChange={(e) => handleLanguageChange(e.target.value as LanguageCode)}
            >
              {[
                { code: 'en', label: 'English' },
                { code: 'ru', label: 'Русский' },
                { code: 'uz', label: "O'zbekcha" },
              ].map((language) => (
                <FormControlLabel
                  key={language.code}
                  value={language.code}
                  control={<Radio />}
                  label={language.label}
                  sx={{
                    margin: '5px 0',
                    borderRadius: '30px',
                    padding: '5px',
                    backgroundColor: selectedLanguage === language.code ? '#f0f0f0' : 'transparent',
                  }}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </DialogContent>
      </Dialog>
    </>
  );
}
