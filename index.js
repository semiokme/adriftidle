// base index page
var tick_counter = 0;
var movement_skill = 0.00;
var physical_stat  = 0.00;
var movement_skill_pity = 0.00;
var physical_stat_pity = 0.00;

var current_destination = null;
var distnace_to_destination = null;
var asteroid_distance = 10000.00;

// change course button
var destination_button = document.createElement('button')
destination_button.textContent = "Asteroid";
destination_button.id = "destbutton";
destination_button.onclick = setcourse(destination_button.innerText)

var container = document.getElementById("buttonContainer");
container.appendChild(destination_button);

setInterval(() => {
    tick_counter += 1;
    tickchange();
}, 250);

function move() {
    // check if the skill succeeds
    // NOTE: uses the same check roll for all of these, possible that is wrong but it will save processing
    var skillcheck = Math.floor(Math.random() * 100) + 1;
    if (skillcheck < (movement_skill + (physical_stat * .1))) {
        if(current_destination) {
            distnace_to_destination -= (100.00 - skillcheck) * (movement_skill / 100.00); // i think this is right 
        }
    }
    // check for skill growth
    if ((skillcheck < (100.00 + movement_skill_pity) - movement_skill )) {
        movement_skill_pity = 0.00;
        movement_skill += ((101.00 - movement_skill) / 100.00) * ((101.00 - physical_stat) / 100.00) + ((Math.random() * 5) / 10.0);
    } else {
        movement_skill_pity += 1.00;
    }
    // check for stat growth
    // the 50 halves growth, and the *4 makes it have a harsher curve than the skills
    if ((physical_stat < (50.00 + physical_stat_pity) - physical_stat * 4)) {
        physical_stat_pity = 0.00;
        physical_stat += ((101.00 - physical_stat) / 100.00) * ((101.00 - physical_stat) / 100.00) + ((Math.random() * 5) / 10.0);
    } else {
        physical_stat_pity += 1.00;
    }
}

function tickchange() {
    // move towards the goal
    move();
    // update all labels
    const move_label = document.getElementById("skill_movement_value");
    move_label.style.display = "block";
    move_label.textContent = "Movement Skill: " + movement_skill.toFixed(2);
    const physical_label = document.getElementById("stat_physical_value");
    physical_label.style.display = "block";
    physical_label.textContent = "Physical Stat: " + physical_stat.toFixed(2);
    const bottom_label = document.getElementById("main_text_bottom");
    if(current_destination) {
        bottom_label.textContent = "Bearing: " + current_destination + " Distance: " + distnace_to_destination.toFixed(2);
    }
}

function setcourse(destination_name) {
    if(destination_name != current_destination) {
        current_destination = destination_name;
        if(current_destination == "Asteroid") {
            distnace_to_destination = asteroid_distance;
            destination_button.style.display = 'none';
        }
    }

}