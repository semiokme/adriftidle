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
        movement_skill += (100.00 - movement_skill) * (physical_stat / 100.00) + ((Math.random() * 5) / 10.0);
    }
    // check for stat growth


}

function tickchange() {
    // move towards the goal
    move();
    // update all labels
    const label = document.getElementById("skill_movement_value");
    label.style.display = "block";
    label.textContent = movement_skill.toFixed(2);
    console.log("end of tickchange")
}