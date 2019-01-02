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

const babytchi = new Tamagotchi('babytchi', 'resources/imgs/babytchi.gif');
console.log(babytchi);

$('#tamagotchi-screen').html(`<img src="${babytchi.img}" alt="Babytchi" title="Babytchi" id="sprite">`);