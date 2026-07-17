export const formatDate = ({date, locale = "en-GB"}) => {
  return new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

export const formatTime = ({date, hour12, locale = "en-GB"}) => {
  return new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: hour12,
  }).format(date);
};

export const formatDateTimeForAside = (date, locale = "en-GB") => {
  return {
    formattedDate: formatDate({
      date: date,
      locale: locale,
    }),
    formattedTime: formatTime({
      date: date,
      hour12: false,
      locale: locale,
    }),
  };
};