

export default class Tile{
    #tileElem
    #x
    #y
    #value
    constructor(tileContainer ,value = Math.random()> 0.5 ? 2 : 4){
        this.#tileElem = document.createElement('div');
        this.#tileElem.classList.add('tile');
        tileContainer.append(this.#tileElem);
        this.value = value;
    }

    get value(){
        return this.#value;
    }

    

    set value(v){
        this.#value = v;
        this.#tileElem.textContent = v;
        const pow = Math.log2(v);
        const bgLightness = 100 - pow *9;
        this.#tileElem.style.setProperty('--bg-lightness',`${bgLightness}%`);
        this.#tileElem.style.setProperty('--text-lightness',`${bgLightness >= 50 ? 20: 90}%`);
    }
    set x(value){
        this.#x = value;
        this.#tileElem.style.setProperty('--x',value)
    }

    set y(value){
        this.#y = value;
        this.#tileElem.style.setProperty('--y',value)
    }
    
    remove(){
        this.#tileElem.remove();
    }

    waitForTransition(animation = false){
        return new Promise(resolve => {
            this.#tileElem.addEventListener(animation ?"animationend" : "transitionend", resolve,
            {
                once: true,
            });   
        })
    }

}