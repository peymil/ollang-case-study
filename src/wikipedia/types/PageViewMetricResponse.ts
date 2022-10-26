export type PageViewMetricItemArticles = {
  rank: number;
  article: string;
  views: number;
}

export type PageViewMetricItem = {
  project: string;
  access: string;
  year: string;
  month: string;
  day: string;
  articles: PageViewMetricItemArticles[];
};


export type PageViewMetricResponse = {
  items: PageViewMetricItem[];
};

