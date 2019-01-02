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
const $stats = $('#status');
const $feed = $('#food');
const $play = $('#play');
const $lights = $('#lights');

/*----- functions -----*/
// init () {

// };
const game = {
    init () {
        
    },
    render() {
        $name.text(`${babytchi.name}'s Stats`);
        $hunger.text(`Hunger: ${babytchi.hunger}/10`);
        $sleepiness.text(`Sleepiness: ${babytchi.sleepiness}/10`);
        $boredom.text(`Boredom: ${babytchi.boredom}/10`);
        $age.text(`Age: ${babytchi.age}`);
    },
    feed() {
        babytchi.hunger -= 2;
    },
    play() {
        babytchi.boredom -= 2;
    },
    lights () {
        babytchi.sleepiness = 0;
    },
    displayStats() {
        if ($('#metrics').css('visibility') === 'visible') {
            
        } else if ($("#metrics").css("visibility") === 'hidden') {
            $("#metrics").css("visibility", "visible");
        }    
    }
}

game.render();


/*----- event listeners -----*/
$("#tamagotchi-screen").html(
    `<img src="${babytchi.img}" alt="Babytchi" title="Babytchi" id="sprite">`
);

// $('#icons').on('click', function (evt) {
//     console.log(evt.target);
//     if ($(evt.target) === )
// });

$status.on('click', game.displayStats);
$food.on('click', game.feed);
$play.on('click', game.play);
$lights.on('click', game.lights);





