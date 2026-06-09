// base index page
var tick_counter = 0;
var movement_skill = 0.00;
var physical_stat  = 0.00;
var movement_skill_pity = 0.00;
var physical_stat_pity = 0.00;

setInterval(() => {
    tick_counter += 1;
    tickchange();
    console.log("finished tick");
}, 250);

function move() {
    // check if the skill succeeds
    // NOTE: uses the same check roll for all of these, possible that is wrong but it will save processing
    var skillcheck = Math.floor(Math.random() * 100) + 1;
    if (skillcheck < (movement_skill + (physical_stat * .1))) {
        console.log("movement success");
    } else {
        console.log("movement failed");
    }
    // check for skill growth
    if ((skillcheck < (100.00 + movement_skill_pity) - movement_skill )) {
        console.log("movement skill growth");
        movement_skill_pity = 0.00;
        movement_skill += ((101.00 - movement_skill) / 100.00) * ((101.00 - physical_stat) / 100.00) + ((Math.random() * 5) / 10.0);
    } else {
        movement_skill_pity += 1.00;
    }
    // check for stat growth
    // the 50 halves growth, and the *4 makes it have a harsher curve than the skills
    if ((physical_stat < (50.00 + physical_stat_pity) - physical_stat * 4)) {
        console.log("movement skill growth");
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
    
    console.log("end of tickchange")
}