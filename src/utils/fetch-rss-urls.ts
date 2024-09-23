export const fetchRssUrls = async () => {
  const mockRssUrls = [
    "https://www.theguardian.com/world/rss",
    "https://www.theguardian.com/uk/rss",
  ];

  return Promise.resolve(mockRssUrls);
};
