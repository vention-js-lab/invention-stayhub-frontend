export default {
  'src/**/*.{ts,tsx}': (filenames) => [`npx eslint --fix ${filenames.join(' ')}`],
  'src/**/*.css': (filenames) => [`npx prettier --write ${filenames.join(' ')}`],
};
