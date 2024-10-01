export const syncEvaluatedArticles = async () => {
  // fetch all articles from publications
  const publications = await datocms.fetchPublications();
  const articles = await extractArticles(publications);

  // fetch all evaluated articles from DatoCMS
  const evaluatedArticles = await datocms.fetchEvaluatedArticles();

  // filter new articles
  const evaluatedArticlesMapping = evaluatedArticles.reduce(
    (acc, curr) => {
      acc[curr.title] = curr;
      return acc;
    },
    {} as Record<string, EvaluatedArticleFragment>,
  );

  const newArticles = articles.filter(
    (article) => !evaluatedArticlesMapping[article.title],
  );

  // evaluate new articles with OpenAI
  const newEvaluatedArticles = await evaluateArticles(newArticles);

  // create new evaluated articles in DatoCMS
  try {
    await datocms.createEvaluatedArticles(newEvaluatedArticles);
  } catch (error) {
    console.error("Failed to create evaluated articles", error);
  }

  // if evaluated articles are more than 30 in datocms, delete the oldest ones
  if (evaluatedArticles.length > 30) {
    const sortedEvaluatedArticles = evaluatedArticles.sort(
      (a, b) => a.createdAt - b.createdAt,
    );
    const articlesToDelete = sortedEvaluatedArticles.slice(
      0,
      evaluatedArticles.length - 30,
    );

    try {
      await datocms.deleteEvaluatedArticles(articlesToDelete);
    } catch (error) {
      console.error("Failed to delete evaluated articles", error);
    }
  }
};
