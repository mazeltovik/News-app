import AppLoader from './appLoader';

type Options = {
    [key: string]: string;
};

type ResultSources = {
    status: string;
    sources: Options[];
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

type ResultNews = {
    status: string;
    totalResults: number;
    articles: Info<string, Options>[];
};

class AppController extends AppLoader {
    getSources(callback: (data?: ResultSources) => void) {
        super.getResp(
            {
                options: {},
                endpoint: 'sources',
            },
            callback
        );
    }

    getNews(e: Event, callback: (data?: ResultNews) => void) {
        let target = e.target as Element;
        const newsContainer = e.currentTarget as Element;
        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id') as string;
                if (newsContainer!.getAttribute('data-source') !== sourceId) {
                    newsContainer!.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentNode as Element;
        }
    }
}

export default AppController;
