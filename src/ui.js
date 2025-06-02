import { Racer } from './api.js';
export class RacerUI {
    constructor(list) {
        this.list = list;
    }
    async render(racer){
        const newRacer = new Racer(racer);
        const {fullname, url, team } = await newRacer.getInfo();
        const html = `
            <div class="${String(racer)}-item" id="racer-square">
                <img class="racer-img" src="${url}" alt="${fullname}">
                <div class="racer-info">
                    <h3 class="racer-name">${fullname}</h3>
                    <p class="racer-team">${team}</p>
                    <p class="racer-team">#${racer}</p>
                </div>
            </div>
        `;
        this.list.innerHTML += html;
    }
    removeRacer(racer) {
        const className = `${String(racer)}-item`;
        const escapedClass = CSS.escape(className); 
        const racerItem = this.list.querySelector(`.${escapedClass}`);
        if (racerItem) {
            racerItem.remove();
        }
    }
    clear() {
        this.list.innerHTML = '';
    }
}