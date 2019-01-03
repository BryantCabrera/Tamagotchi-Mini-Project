/*----- constants -----*/ 
class Tamagotchi {
  constructor(name) {
    this.name = name;
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
            threshold: 30
        }
    }
  }
}

const renderLookup = {
    'babytchi': 'resources/imgs/babytchi.gif',
    'marutchi': 'resources/imgs/marutchi.gif',
    'tamatchi': 'resources/imgs/tamatchi.gif',
    'mametchi': 'resources/imgs/mametchi.gif',
    'dead': 'resources/imgs/dead3.png'
};

let newTamagotchi, interval;


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
const game = {
    init () {
        const newName = prompt('What would you like to name your Tamagotchi?');
        newTamagotchi = new Tamagotchi(newName);
        console.log(newTamagotchi);

        clearInterval(interval);
        time = 0;

        game.timer();
        game.render();
    },
    timer () {
        interval = window.setInterval(function () {
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
        //Change stages/form
        if (newTamagotchi.age === 1) {
            newTamagotchi.stage = "marutchi";
        } else if (newTamagotchi.age === 2) {
            newTamagotchi.stage = "tamatchi";
        } else if (newTamagotchi.age === 3) {
            newTamagotchi.stage = "mametchi";
        } else if (newTamagotchi.age === 4) {
            game.death();
        }

        $name.text(`${newTamagotchi.name}'s Stats`);
        $hunger.text(`Hunger: ${newTamagotchi.hunger}/10`);
        $sleepiness.text(`Sleepiness: ${newTamagotchi.sleepiness}/10`);
        $boredom.text(`Boredom: ${newTamagotchi.boredom}/10`);
        $age.text(`Age: ${newTamagotchi.age}`);

        //checks death
        for (let trait in newTamagotchi.tickChart) {
          if (newTamagotchi[trait] >= 10) {
            game.death();
          }
        }

        $("#tamagotchi-screen").html(`<img src="${renderLookup[newTamagotchi.stage]}" alt="${newTamagotchi.stage} image" title="${newTamagotchi.stage} image">`);
    },
    feed () {
        if (newTamagotchi.hunger >= 2) {
            newTamagotchi.hunger -= 2;
        } else {
            newTamagotchi.hunger = 0;
        }
    },
    play () {
        if (newTamagotchi.boredom >= 3) {
            newTamagotchi.boredom -= 3;
        } else {
            newTamagotchi.boredom = 0;
        }  
    },
    lights () {
        newTamagotchi.sleepiness = 0;
    },
    displayStats () {
        if ($('#metrics').css('visibility') === 'visible') {
            $("#metrics").css("visibility", "hidden");
        } else if ($("#metrics").css("visibility") === 'hidden') {
            $("#metrics").css("visibility", "visible");
        }    
    },
    death () {
        clearInterval(interval);
        newTamagotchi.stage = "dead";
        $age.text(`YOUR TAMAGOTCHI HAS DIED!`);
    }
}

const getRandomBetween = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min)
};


/*----- event listeners -----*/
$('#start-btn').on('click', game.init);

$status.on('click', game.displayStats);
$food.on('click', game.feed);
$play.on('click', game.play);
$lights.on('click', game.lights);






