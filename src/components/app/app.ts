import AppController from '../controller/controller';
import AppView from '../view/appView';
class App {
    public readonly controller: AppController;
    public readonly view: AppView;
    private constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }
    start() {
        document
            .querySelector('.sources')!
            .addEventListener('click', (e) => this.controller.getNews(e, (data) => this.view.drawNews(data)));
        this.controller.getSources((data) => this.view.drawSources(data));
    }
    static create() {
        return new App();
    }
}

export default App;
