/*----- constants -----*/ 
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

const babytchi = new Tamagotchi("babytchi", "resources/imgs/babytchi.gif");
console.log(babytchi);

/*----- app's state (variables) -----*/ 

/*----- cached element references -----*/ 
const $name = $('#name');
const $hunger = $('#hunger');
const $sleepiness = $('#sleepiness');
const $boredom = $('#boredom');
const $age = $('#age');
const $stats = $('#stats');
const $feed = $('#food');
const $play = $('#play');
const $lights = $('#lights');

/*----- event listeners -----*/ 
$("#tamagotchi-screen").html(
  `<img src="${babytchi.img}" alt="Babytchi" title="Babytchi" id="sprite">`
);

$('#stats').on('click', displayStats);

/*----- functions -----*/
// init () {

// };

const render = function () {
    $name.text(`${babytchi.name}'s Stats`);
    $hunger.text(`Hunger: ${babytchi.hunger}/10`);
    $sleepiness.text(`Sleepiness: ${babytchi.sleepiness}/10`);
    $boredom.text(`Boredom: ${babytchi.boredom}/10`);
    $age.text(`Age: ${babytchi.age}`);
};
render();

// const displayStats = function () {
//     $name.text(`${babytchi.name}'s Stats`);
//     $hunger.text(`Hunger: ${babytchi.hunger}/10`);
//     $sleepiness.text(`Sleepiness: ${babytchi.sleepiness}/10`);
//     $boredom.text(`Boredom: ${babytchi.boredom}/10`);
//     $age.text(`Age: ${babytchi.age}`);
// };








