export const createPageUrl = (pageName, params = {}) => {
  const searchParams = new URLSearchParams(params).toString();
  return searchParams ? `/${pageName}?${searchParams}` : `/${pageName}`;
};
