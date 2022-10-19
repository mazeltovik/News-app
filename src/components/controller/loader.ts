import { type } from 'os';

type Options = {
    [key: string]: string;
};

type ResultSource = {
    status?: string;
    sources?: Options[];
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
    status?: string;
    totalResults?: number;
    articles?: Info<string, Options>[];
};

type PointOption = {
    endpoint: string;
    options: Options;
};

type callback<T> = (data?: T) => void;

enum ResResult {
    Unauthorized = 401,
    NotFound = 404,
}

interface Loader {
    new (baseLink: string, options: Options): Loader;
    makeUrl(options: Options, endpoint: string): string;
    errorHandler(res: Response): Response | undefined;
    load(method: string, endpoint: string, callback: () => void, options: Options): void;
    getResp(pointOption: PointOption, callback: () => void): void;
}

class Loader implements Loader {
    constructor(public baseLink: string, public options: Options) {}

    makeUrl(options: Options, endpoint: string): string {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;
        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });
        return url.slice(0, -1);
    }

    errorHandler(res: Response): Response | undefined {
        if (!res) return undefined;
        if (!res.ok) {
            if (res.status === ResResult.Unauthorized || res.status === ResResult.NotFound)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }
        return res;
    }

    load(
        method: string,
        endpoint: string,
        callback: callback<ResultSource> | callback<ResultNews>,
        options: Options
    ): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res?.json())
            .then((data: ResultSource | ResultNews) => callback(data))
            .catch((err) => console.error(err));
    }

    getResp(
        pointOption: PointOption,
        callback: callback<ResultSource> | callback<ResultNews> = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load('GET', pointOption.endpoint, callback, pointOption.options);
    }
}

export default Loader;
