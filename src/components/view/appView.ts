import News from './news/news';
import Sources from './sources/sources';

type ResultSource = {
    status: string;
    sources: Source[];
};

type Source = {
    [key: string]: string;
};

type Info<T, U> = {
    author: T;
    content: T;
    description: T;
    publishedAt: T;
    title: T;
    source: U;
    url: T;
    urlToImage: T;
};

type Result = {
    status?: string;
    totalResults?: number;
    articles?: Info<string, Source>[];
};
interface AppView {
    new (): AppView;
    drawNews(data: Result): void;
    drawSources(data: ResultSource): void;
}

class AppView implements AppView {
    public news: News;
    public sources: Sources;
    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: Result | undefined): void {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data: ResultSource | undefined): void {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
