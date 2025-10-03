const POSTER_SIZE = "w500";
const BACKDROP_SIZE = "w1280";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";
const PLACEHOLDER_POSTER = "https://placehold.co/500x750/121212/00bcd4?text=Poster+Unavailable";
const PLACEHOLDER_BACKDROP = "https://placehold.co/1280x400/121212/00bcd4?text=Backdrop+Unavailable";

export const useContentFormatters = () => ({
  POSTER_SIZE,
  BACKDROP_SIZE,
  getImageUrl: (path, size) => path ? `${IMAGE_BASE_URL}${size}${path}` : (size === POSTER_SIZE ? PLACEHOLDER_POSTER : PLACEHOLDER_BACKDROP),
  formatList: (items) => items?.map(i => i.name).join(', ') || 'N/A',
  formatCurrency: (value) => value > 0 ? `$${value.toLocaleString()}` : 'N/A',
  formatRuntime: (minutes) => minutes > 0 ? `${minutes} minutes` : 'N/A',
  formatTVStats: (item) => `${item.number_of_seasons || 0} Seasons, ${item.number_of_episodes || 0} Episodes`,
});
