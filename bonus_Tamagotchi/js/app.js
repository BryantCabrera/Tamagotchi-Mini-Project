/*----- cached element references -----*/
const $time = $('#time');


/*----- constants -----*/ 
let newTamagotchi, interval;

const renderLookup = {
    'babytchi': 'resources/imgs/babytchi.gif',
    'marutchi': 'resources/imgs/marutchi.gif',
    'tamatchi': 'resources/imgs/tamatchi.gif',
    'mametchi': 'resources/imgs/mametchi.gif',
    'dead': 'resources/imgs/dead3.png'
};

class Tamagotchi {
    constructor(name) {
        this.name = name;
        this.id = 0;
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

    feed() {
        (this.hunger >= 2 && this.stage !== "dead") ? this.hunger -= 2 : console.log(`${this.name} is not hungry enough yet.`);
    }

    play() {
        this.boredom >= 3 && this.stage !== "dead" ? (this.boredom -= 3) : console.log(`${this.name} is not hungry enough yet.`);
    }

    lights() {
        this.sleepiness = 0;

        $(`#${this.id} .tamagotchi-screen`).toggleClass("lights--on");
        $(`#${this.id} .tamagotchi-screen`).toggleClass("lights--off");
    }

    displayStats() {
        if ($(`#${this.id} .metrics`).css("visibility") === "visible") {
            $(`#${this.id} .metrics`).css("visibility", "hidden");
            $(`#${this.id} .tamagotchi-screen img`).css("opacity", ".6");
        } else if ($(`#${this.id} .metrics`).css("visibility") === "hidden") {
            $(`#${this.id} .metrics`).css("visibility", "visible");
            $(`#${this.id} .tamagotchi-screen img`).css("opacity", ".2");
        }
    }

    death() {
        // clearInterval(interval);
        this.stage = "dead";
        $(`#${this.id} .metrics .age`).html('Your Tamagotchi<br>has died!');
    }

    render() {
        $("main").append(`<section id="${this.id}" class="tamagotchi-device">
            <div class= "tamagotchi-screen lights--on"></div>

            <section class="metrics">
                <div class="hunger"></div>
                <div class="sleepiness"></div>
                <div class="boredom"></div>
                <div class="age"></div>
            </section>

            <div class="icons">
                <a href="#" alt="Show/Hide Status" title="Show/Hide Status" ><ion-icon name="speedometer" class="status" data-id="${this.id}" data-action="displayStats"></ion-icon></a>
                <a href="#" alt="Feed" title="Feed"><ion-icon name="pizza" class="food" data-id="${this.id}" data-action="feed"></ion-icon></a>
                <a href="#" alt="Play" title="Play"><ion-icon name="logo-game-controller-b" class="play" data-id="${this.id}" data-action="play"></ion-icon></a>
                <a href="#" alt="Toggle Lights" title="Toggle Lights"><ion-icon name="bulb" class="lights" data-id="${this.id}" data-action="lights"></ion-icon></a>
                <!-- <a href="#" alt="Have Baby" title="Have Baby"><ion-icon name="egg" class="baby" data-id="${this.id}" data-action="baby"></ion-icon></a> -->
            </div>

            <div class="start">
                <h3 class="name"></h3>
            </div>
        </section >`);
    }

    baby () {
        const newName = prompt("Your tamagotchi just had a baby! What would you like to name it?");
        newTamagotchi = new BabyTamagotchi(newName);
        newTamagotchi.id = game.tamagotchies.length;
        newTamagotchi.render();

        game.tamagotchies.push(newTamagotchi);
        console.log(newTamagotchi);

        //establishes new event listeners when a new tamagotchi is instantiated
        for (let i = 0; i < game.tamagotchies.length; i++) {
          $(`#${i} .icons`).off();
          $(`#${i} .icons`).on("click", function(e) {
            let id = parseInt($(e.target).attr("data-id"));
            let action = $(e.target).attr("data-action");

            game.tamagotchies[id][action]();
          });
        }

        //resets interval and starts it again
        clearInterval(interval);
        game.timer();
    }
}

class BabyTamagotchi extends Tamagotchi {
    constructor(name) {
        super(name);
    }

    exercise () {
        console.log(this);
        //makes the hunger and sleepiness meters take longer to tick up
        this.tickChart.hunger.threshold += 2;
        this.tickChart.sleepiness.threshold += 2;
    }
}

/*----- app's state (variables) -----*/
let time = 0; 


/*----- functions -----*/
const game = {
    tamagotchies: [],
    init () {
        //creates new Tamagotchi data
        const newName = prompt('What would you like to name your Tamagotchi?');
        newTamagotchi = new Tamagotchi(newName);
        newTamagotchi.id = game.tamagotchies.length;
        //creates new Tamagotchi DOM element
        newTamagotchi.render();

        game.tamagotchies.push(newTamagotchi);
        console.log(newTamagotchi);

        //establishes new event listeners when a new tamagotchi is instantiated
        for (let i = 0; i < game.tamagotchies.length; i++) {
            $(`#${i} .icons`).off();
            $(`#${i} .icons`).on("click", function (e) {
                let id = parseInt($(e.target).attr("data-id"));
                let action = $(e.target).attr("data-action");

                game.tamagotchies[id][action]();
            });
        }
        
        //resets time interval then restarts it
        clearInterval(interval);
        game.timer();

        game.render();
    },
    timer () {
        interval = window.setInterval(function () {
            time += 1;
            $time.text(`Time Elapsed: ${time} seconds`);

            //for every tamagotchi in existence, updates their metrics
            for (let i = 0; i < game.tamagotchies.length; i++) {
                for (let trait in game.tamagotchies[i].tickChart) {
                    if (time % game.tamagotchies[i].tickChart[trait]['threshold'] === 0 && game.tamagotchies[i].stage !== 'dead') {
                        // newTamagotchi[trait][curCount] += 1;
                        game.tamagotchies[i][trait] += 1;
                    }
                }
                game.render();
            }
        }, 1000);
    },
    render() {
        //for every Tamagotchi in existence, updates the DOM with their stats
        for (let i = 0; i < game.tamagotchies.length; i++) {
            $(`#${i} .start .name`).text(`${game.tamagotchies[i].name}`);
            $(`#${i} .metrics .hunger`).text(`Hunger: ${game.tamagotchies[i].hunger}/10`);
            $(`#${i} .metrics .sleepiness`).text(`Sleepiness: ${game.tamagotchies[i].sleepiness}/10`);
            $(`#${i} .metrics .boredom`).text(`Boredom: ${game.tamagotchies[i].boredom}/10`);
            $(`#${i} .metrics .age`).text(`Age: ${game.tamagotchies[i].age}`);

            //Change stages/form
            if (game.tamagotchies[i].age === 1) {
                game.tamagotchies[i].stage = "marutchi";
            } else if (game.tamagotchies[i].age === 2) {
                game.tamagotchies[i].stage = "tamatchi";
            } else if (game.tamagotchies[i].age === 3) {
                game.tamagotchies[i].stage = "mametchi";
            } else if (game.tamagotchies[i].age === 4) {
                game.tamagotchies[i].death();
            }

            //checks death
            for (let trait in game.tamagotchies[i].tickChart) {
                if (game.tamagotchies[i][trait] >= 10) {
                    game.tamagotchies[i].death();
                }
            }

            //updates sprite displayed on the DOM
            $(`#${i} .tamagotchi-screen`).html(`<img src="${renderLookup[game.tamagotchies[i].stage]}" alt="${game.tamagotchies[i].stage} image" title="${game.tamagotchies[i].stage} image">`);
        }
    },
}

//calculates a number for the threshold of the "personality" traits in Tamagotchi.tickChart
const getRandomBetween = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min)
};


/*----- event listeners -----*/
$('.start-btn').on('click', function () {
    //if 1st time clicking, makes new Tamagotchi, otherwise calls .baby() on original Tamagotchi to make new super-powered Tamagotchi
    time === 0 ? game.init() : (game.tamagotchies[0].stage !== 'dead' ? game.tamagotchies[0].baby() : console.log('Sorry, your tamagotchi is dead and can no longer reproduce.'));
    
});