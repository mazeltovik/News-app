import './sources.css';

type Link = {
    [key: string]: string;
};
type Links = Link[];
interface Sources {
    draw(data: Links): void;
}
class Sources implements Sources {
    draw(data: Links): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;
        data.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment;
            (sourceClone.querySelector('.source__item-name') as HTMLElement).textContent = item.name;
            (sourceClone.querySelector('.source__item') as HTMLElement).setAttribute('data-source-id', item.id);
            fragment.append(sourceClone);
        });
        (document.querySelector('.sources') as HTMLElement).append(fragment);
    }
}
const checkbox = document.querySelector('#nav__checkbox') as HTMLInputElement;
checkbox.addEventListener('click', (e) => {
    if ((e.target as HTMLInputElement).checked) {
        (document.querySelector('.sources') as HTMLDivElement).style.display = 'flex';
    } else {
        (document.querySelector('.sources') as HTMLDivElement).style.display = 'none';
    }
});

const sourceItem = document.querySelector('.buttons') as HTMLDivElement;
sourceItem.addEventListener('click', (e) => {
    const currentTarget = e.currentTarget as HTMLDivElement;
    const collection: Element[] = [...currentTarget.children];
    collection.forEach((v) => {
        if (v.classList.contains('active')) {
            v.classList.remove('active');
        }
    });
    const target = e.target as Element;
    if (target.className == 'source__item') {
        target.classList.add('active');
    } else if (target.className == 'source__item-name') {
        (target.parentElement as HTMLDivElement).classList.add('active');
    } else return;
});

export default Sources;
