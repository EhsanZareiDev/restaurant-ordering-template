export const formatDate = (date, locale = "en-GB") => {
  return new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

export const formatTime = (date, locale = "en-GB") => {
  return new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
};

export const formatDateTimeForAside = (date, locale = "en-GB") => {
  return {
    formattedDate: formatDate(date, locale),
    formattedTime: formatTime(date, locale),
  };
};