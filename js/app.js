/*----- constants -----*/ 
class Tamagotchi {
  constructor(name, img) {
    this.name = name;
    this.img = img;
    this.hunger = 0;
    this.sleepiness = 0;
    this.boredom = 0;
    this.age = 0;
    this.stage = 'babytchi';
    this.tickChart = {
        hunger: {
            threshold: getRandomBetween(7, 10)
        },
        sleepiness: {
            threshold: getRandomBetween(20, 30)
        },
        boredom: {
            threshold: getRandomBetween(3, 5)
        },
        age: {
            threshold: getRandomBetween(29, 30)
        }
    }
  }
}

const renderLookup = {
    // 'babytchi': '<img src="resources/imgs/babytchi.gif" alt="Babytchi" title="Babytchi" id="sprite">',
    // 'marutchi': '<img src="resources/imgs/marutchi.gif" alt="Marutchi" title="Marutchi" id="sprite">',
    // 'tamatchi': '<img src="resources/imgs/tamatchi.gif" alt="Tamatchi" title="Tamatchi" id="sprite">',
    // 'mametchi': '<img src="resources/imgs/mametchi.gif" alt="Mametchi" title="Mametchi" id="sprite">'
    'babytchi': 'resources/imgs/babytchi.gif',
    'marutchi': 'resources/imgs/marutchi.gif',
    'tamatchi': 'resources/imgs/tamatchi.gif',
    'mametchi': 'resources/imgs/mametchi.gif'
};

let newTamagotchi;

// const babytchi = new Tamagotchi("babytchi", "resources/imgs/babytchi.gif");
// console.log(babytchi);

/*----- app's state (variables) -----*/
let time = 0; 

/*----- cached element references -----*/ 
const $name = $('#name');
const $hunger = $('#hunger');
const $sleepiness = $('#sleepiness');
const $boredom = $('#boredom');
const $age = $('#age');
const $status = $('#status');
const $food = $('#food');
const $play = $('#play');
const $lights = $('#lights');
const $time = $('#time');

/*----- functions -----*/
// init () {

// };
const game = {
    init () {
        const newName = prompt('What would you like to name your Tamagotchi?');
        newTamagotchi = new Tamagotchi(newName, renderLookup.babytchi);
        console.log(newTamagotchi);

        game.timer();
        game.render();

        // function getRandomBetween(min, max) {
        //     return Math.floor(Math.random()*(max-min) + min)
        // }
    },
    timer () {
        window.setInterval(function () {
            time += 1;
            $time.text(`Time Elapsed: ${time} seconds`);

            for (let trait in newTamagotchi.tickChart) {
                if (time % newTamagotchi.tickChart[trait]['threshold'] === 0) {
                    // newTamagotchi[trait][curCount] += 1;
                    newTamagotchi[trait] += 1;
                }
            }
            
            game.render();
        }, 1000);
    },
    render() {
        $("#tamagotchi-screen").html(`<img src="${renderLookup[newTamagotchi.stage]}" alt="${newTamagotchi.stage} image" title="${newTamagotchi.stage} image">`);
        $name.text(`${newTamagotchi.name}'s Stats`);
        $hunger.text(`Hunger: ${newTamagotchi.hunger}/10`);
        $sleepiness.text(`Sleepiness: ${newTamagotchi.sleepiness}/10`);
        $boredom.text(`Boredom: ${newTamagotchi.boredom}/10`);
        $age.text(`Age: ${newTamagotchi.age}`);

        //Change stages/form
        if (newTamagotchi.age === 1) {
          newTamagotchi.stage = "marutchi";
        } else if (newTamagotchi.age === 2) {
          newTamagotchi.stage = "tamatchi";
        } else if (newTamagotchi.age === 1) {
          newTamagotchi.stage = "mametchi";
        }
    },
    feed() {
        newTamagotchi.hunger -= 2;
    },
    play() {
        newTamagotchi.boredom -= 2;
    },
    lights () {
        newTamagotchi.sleepiness = 0;
    },
    displayStats() {
        if ($('#metrics').css('visibility') === 'visible') {
            
        } else if ($("#metrics").css("visibility") === 'hidden') {
            $("#metrics").css("visibility", "visible");
        }    
    }
}

const getRandomBetween = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min)
};


/*----- event listeners -----*/
// $("#tamagotchi-screen").html(
//   `<img src="${babytchi.img}" alt="Babytchi" title="Babytchi" id="sprite">`
// );
// $('#icons').on('click', function (evt) {
//     console.log(evt.target);
//     if ($(evt.target) === )
// });

$('#start-btn').on('click', game.init);

$status.on('click', game.displayStats);
$food.on('click', game.feed);
$play.on('click', game.play);
$lights.on('click', game.lights);






