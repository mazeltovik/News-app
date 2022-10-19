import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://nodenews.herokuapp.com/', {
            apiKey: '73c6821d337144f98c0fa64b2b88947e', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
