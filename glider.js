export class Glider {
    constructor(loop = false, delay = 0, navigation = true) {
        this.loop = loop;
        this.glider = document.querySelector('.glider');
        this.gliderList = document.querySelector('.glider-list');
        this.gliderThumbNails = document.querySelector('.glider-thumbnails-wrapper');
        this.state = 0;
        this.timeRunning = 3000;
        this.delay = delay;
        this.timerOutId = 0;
        this.timerLoopId = 0;

        this.gliderThumbNails.appendChild(this.gliderThumbNails.children[0]);

        let timer = document.createElement('div');
        timer.classList.add('glider-loader');
        this.glider.appendChild(timer);

        if (navigation) {

            let arrows = document.createElement('div');
            arrows.classList.add('glider-arrows');

            let buttonPrev = document.createElement('button');
            buttonPrev.id = 'glider-prev';
            buttonPrev.textContent = '<';
            let buttonNext = document.createElement('button');
            buttonNext.id = 'glider-next';
            buttonNext.textContent = '>';

            arrows.appendChild(buttonPrev);
            arrows.appendChild(buttonNext);

            this.glider.appendChild(arrows);

            buttonPrev.addEventListener('click', this.#prevButton.bind(this));
            buttonNext.addEventListener('click', this.#nextButton.bind(this));
        }
        this.#loopUpdate();
    }
    #prevButton() {
        this.state = 0;
        this.#updateGlider();
    }
    #nextButton() {
        this.state = 1;
        this.#updateGlider();
    }
    #updateGlider() {
        if (this.state === 0) {
            this.gliderList.prepend(this.gliderList.children[this.gliderList.children.length - 1]);
            this.gliderThumbNails.prepend(this.gliderThumbNails.children[this.gliderThumbNails.children.length - 1]);
            this.glider.classList.add('prev');
        }
        else {
            this.gliderList.appendChild(this.gliderList.children[0]);
            this.gliderThumbNails.appendChild(this.gliderThumbNails.children[0]);
            this.glider.classList.add('next');
        }
        if (this.timerOutId !== 0) {
            clearTimeout(this.timerOutId);
        }
        this.timerOutId = setTimeout( () => {

            this.glider.classList.remove('prev');
            this.glider.classList.remove('next');
        }, this.timeRunning);

        this.#loopUpdate();
    }
    #loopUpdate() {

        if (this.loop) {

            if (this.timerLoopId !== 0) {
                clearTimeout(this.timerLoopId);
            }
            this.timerLoopId = setTimeout(() => {

                this.state = 1;
                this.#nextButton();
            }, this.delay);
        }
    }
}