class Tamagotchi {
    constructor(name, img) {
        this.name = name;
        this.img = img;
        this.hunger = 0;
        this.sleepiness = 0;
        this.boredom = 0;
        this.age = 0;
    }
}

const babytchi = new Tamagotchi('babytchi', 'babytchi.gif');
console.log(babytchi);