/*----- cached element references -----*/
const $name = $('.name');
const $hunger = $('.hunger');
const $sleepiness = $('.sleepiness');
const $boredom = $('.boredom');
const $age = $('.age');
const $status = $('.status');
const $food = $('.food');
const $play = $('.play');
const $lights = $('.lights');
const $time = $('#time');

/*----- constants -----*/ 
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
        if (this.hunger >= 2) {
            this.hunger -= 2;
        } else {
            this.hunger = 0;
        }
    }

    play() {
        if (this.boredom >= 3) {
            this.boredom -= 3;
        } else {
            this.boredom = 0;
        }
    }

    lights() {
        this.sleepiness = 0;

        $(`#${this.id} .tamagotchi-screen`).toggleClass("lights--on");
        $(`#${this.id} .tamagotchi-screen`).toggleClass("lights--off");
    }

    displayStats() {
        if ($(`#${this.id} .metrics`).css("visibility") === "visible") {
            $(`#${this.id} .metrics`).css("visibility", "hidden");
          // $('.tamagotchi-screen img').css('visibility', 'visible');
        } else if ($(`#${this.id} .metrics`).css("visibility") === "hidden") {
            $(`#${this.id} .metrics`).css("visibility", "visible");
          // $('.tamagotchi-screen img').css('visibility', 'hidden');
        }
    }

    death() {
        clearInterval(interval);
        this.stage = "dead";
        $age.html('Your Tamagotchi<br>has died!');
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


/*----- functions -----*/
const game = {
    tamagotchies: [],
    init () {
        const newName = prompt('What would you like to name your Tamagotchi?');
        newTamagotchi = new Tamagotchi(newName);
        newTamagotchi.id = game.tamagotchies.length;
        newTamagotchi.render();

        // //create Event Listeners
        // //status button even listener
        // $(`${game.tamagotchies.length} .icons .status`).on('click', game.displayStats);
        // //food button even listener
        // $(`${game.tamagotchies.length} .icons .food}`).on('click', game.feed);
        // //play button even listener
        // $(`${game.tamagotchies.length} .icons .play}`).on('click', game.play);
        // //lights button even listener
        // $(`${game.tamagotchies.length} .icons .lights}`).on('click', game.lights);

        // createOneTimeListener($(`${game.tamagotchies.length} .icons .status`), "click", listener);
        // createOneTimeListener($(`${game.tamagotchies.length} .icons .food}`), "click", listener);
        // createOneTimeListener($(`${game.tamagotchies.length} .icons .play`), "click", listener);
        // createOneTimeListener($(`${game.tamagotchies.length} .icons .lights`), "click", listener);

        game.tamagotchies.push(newTamagotchi);
        console.log(newTamagotchi);

        for (let i = 0; i < game.tamagotchies.length; i++) {
            $(`#${i} .icons`).off();
            $(`#${i} .icons`).on("click", function (e) {
                console.log(e.target);
                let id = parseInt($(e.target).attr("data-id"));
                let action = $(e.target).attr("data-action");

                console.log(id);
                console.log(action);
                game.tamagotchies[id][action]();
            });
        }
        

        clearInterval(interval);
        time = 0;

        game.timer();
        game.render();
    },
    timer () {
        interval = window.setInterval(function () {
            time += 1;
            $time.text(`Time Elapsed: ${time} seconds`);

            for (let i = 0; i < game.tamagotchies.length; i++) {
                for (let trait in game.tamagotchies[i].tickChart) {
                    if (time % game.tamagotchies[i].tickChart[trait]['threshold'] === 0) {
                        // newTamagotchi[trait][curCount] += 1;
                        game.tamagotchies[i][trait] += 1;
                    }
                }
                game.render();
            }
        }, 1000);
    },
    render() {
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

            $(`#${i} .tamagotchi-screen`).html(`<img src="${renderLookup[game.tamagotchies[i].stage]}" alt="${game.tamagotchies[i].stage} image" title="${game.tamagotchies[i].stage} image">`);
        }
    },
}

const getRandomBetween = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min)
};


/*----- event listeners -----*/
$('.start-btn').on('click', game.init);




// function createOneTimeListener(element, event, listener) {
//     // first we call addEventListener on element with event name
//     // then inside the callback function, we first un-register the listener
//     // and return the original listener passed to attach it with the event
//     element.on(event, function () {
//         element.off(event, arguments.callee);
//         return listener();
//     });
// }