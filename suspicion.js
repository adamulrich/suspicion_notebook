
// global vars
var playerCount = 0;
var playerColorElimination = {};
var orange_count = 0;
var red_count = 0;
var green_count = 0;
// inform in case of accidental refresh
window.onbeforeunload = function() {
  return "Data will be lost if you leave the page, are you sure?";
};

// // prevent numeric input by keyboard
// const counters = document.getElementsByClassName("counter");
// [...counters].forEach((item) => {
//   item.addEventListener("keydown", e => e.preventDefault()) })

function changecount(color, value) {
  if  (!(window[color+"_count"]== 0 && value==-1))  {
    window[color+"_count"] += value
    var colorScore = document.getElementById(color+"_count")
    colorScore.innerText = window[color+"_count"]
  }

  calculateScore();
}


//resize
visualViewport.onresize = () => {
  var scale = visualViewport.scale;

  // set all cards to scale when pinch zooming
  const cardClasses = document.querySelectorAll('input[type=text]');
  var new_width = 100 * scale *1;
  new_width = new_width.toString() + "px"
  cardClasses.forEach(element => {
    element.style.width =  new_width;
  });

  // set all global checkboxes to scale when pinch zooming
  const checkboxes = document.querySelectorAll('.card-checkbox-global');
  var new_width = 65 * scale *1;
  new_width = new_width.toString() + "px"
  checkboxes.forEach(element => {
    element.style.width =  new_width;
  });

};

function calculateScore() {

  //score gems
  var score = 0;
  var orange_temp = orange_count;
  var red_temp = red_count;
  var green_temp = green_count;

  // remove groups of 3 for 6 points
  while (orange_temp > 0 && red_temp > 0 && green_temp >0 ) {
    score +=6;
    orange_temp -= 1;
    red_temp -= 1;
    green_temp -= 1;
  }

  // add the rest of the gems
  score += orange_temp + red_temp + green_temp;

  // for each player that is marked correct, add 7
  const correct_checkboxes = document.querySelectorAll("input:checked.correct-checkbox");
  score += (correct_checkboxes.length * 7)

  //update score
  document.getElementById("score").innerText = score.toString()
}

function addPlayer() {

  // create template
  const html_template = `
  <div class="card">
  <label class="label label-default">Player <#number#> Name</label>
  <input type="text" name="PlayerName">
  <div class="player-correct-checkbox">
      <input type="checkbox" class="checkbox correct-checkbox" name="correct?" id="player<#number#>_correct" onchange="calculateScore()">
      <label class="checkbox-label" style="background-color: #258a1d;color: aliceblue" for="player<#number#>_correct">correct?</label>
  </div>

  <label class="label">Player <#number#> Color</label>
  <select class="player_color_selection" name="player1_color" id="player<#number#>_color" onchange="setColor()" style="background-color:#00f2ff">
      <option default value="unknown" style="background-color:#00f2ff ;color:black;" >unknown</option>
      <option value="pink" style="background-color: #f697c8;color: aliceblue;">pink</option>
      <option value="red" style="background-color: #b90202;color: aliceblue;">red</option>
      <option value="brown" style="background-color: #bd5700;color: aliceblue;">brown</option>
      <option value="orange" style="background-color: #e99303;color: aliceblue;">orange</option>
      <option value="yellow" style="background-color: #fff703;color: black;">yellow</option>
      <option value="green" style="background-color: #b1b801;color: aliceblue;" >green</option>
      <option value="blue" style="background-color: #0053a5;color: aliceblue;">blue</option>
      <option value="purple" style="background-color: #5b157c;color: aliceblue;">purple</option>
      <option value="gray" style="background-color: #bdbab4;color: aliceblue">gray</option>
      <option value="white" style="background-color: white;color: black;">white</option>
      
  </select>
  <!-- pink -->
  <div class="card-checkbox">
      <input type="checkbox" name="player_pink" id="pink<#number#>" onclick="updatePlayerColorElimination(this)">
      <label class= "checkbox-label" style="background-color: #f697c8;color: aliceblue;" for="pink<#number#>">pink</label>
  </div>
  <!-- red -->
  <div class="card-checkbox">
      <input type="checkbox" name="player_red" id="red<#number#>" onclick="updatePlayerColorElimination(this)">
      <label class= "checkbox-label" style="background-color: #b90202;color: aliceblue;" for="red<#number#>">red</label>
  </div>
  <!-- brown -->
  <div class="card-checkbox">
      <input type="checkbox" name="player_brown" id="brown<#number#>" onclick="updatePlayerColorElimination(this)">
      <label class= "checkbox-label" style="background-color: #bd5700;color: aliceblue;" for="brown<#number#>">brown</label>
  </div>
  <!-- orange -->
  <div class="card-checkbox">
      <input type="checkbox" name="player_orange" id="orange<#number#>" onclick="updatePlayerColorElimination(this)">
      <label class= "checkbox-label" style="background-color: #e99303;color: aliceblue;" for="orange<#number#>">orange</label>
  </div>
  <!-- yellow -->
  <div class="card-checkbox">
      <input type="checkbox" name="player_yellow" id="yellow<#number#>" onclick="updatePlayerColorElimination(this)">
      <label class= "checkbox-label" style="background-color: #fff703;color: black;" for="yellow<#number#>">yellow</label>
  </div>
  <!-- green -->
  <div class="card-checkbox">
      <input type="checkbox" name="player_green" id="green<#number#>" onclick="updatePlayerColorElimination(this)">
      <label class= "checkbox-label" style="background-color: #b1b801;color: aliceblue;" for="green<#number#>">green</label>
  </div>
  <!-- blue -->
  <div class="card-checkbox">
      <input type="checkbox" name="player_blue" id="blue<#number#>" onclick="updatePlayerColorElimination(this)">
      <label class= "checkbox-label" style="background-color: #0053a5;color: aliceblue;" for="blue<#number#>">blue</label>
  </div>
  <!-- puple -->
  <div class="card-checkbox">
      <input type="checkbox" name="player_purple" id="purple<#number#>" onclick="updatePlayerColorElimination(this)">
      <label  class= "checkbox-label" style="background-color: #5b157c;color: aliceblue;" for="purple<#number#>">purple</label>
  </div>
  <!-- gray -->
  <div class="card-checkbox">
      <input type="checkbox" name="player_gray" id="gray<#number#>" onclick="updatePlayerColorElimination(this)">
      <label class="checkbox-label" style="background-color: #bdbab4;color: aliceblue" for="gray<#number#>">gray</label>
  </div>
  <!-- white -->
  <div class="card-checkbox">
      <input type="checkbox" name="player_white" id="white<#number#>" onclick="updatePlayerColorElimination(this)">
      <label class= "checkbox-label" style="background-color: white;color: black;" for="white<#number#>">white</label>
  </div>
  
</div>`

  // if there are less than 6 players, than add a new player
  if (playerCount < 6) {
    // replace <#number#> in the template with the new player count
    var html = html_template.replaceAll("<#number#>",(playerCount+1).toString());

    // create a new node and set the innerHTML, then append
    var node = document.createElement("div");
    node.innerHTML = html;
    document.getElementById("card-container").appendChild(node);

    // increment count
    playerCount +=1;
  }
}

function eliminateColor(name) {
  // select all items with name
  const selection = document.getElementsByName("player_"+name);
  const state = document.getElementById(name).checked
  
  //mark them all as selected or unselected
  selection.forEach( (item) => {
    item.checked = state;
  })

  // go through the array for those that have been touched, and update them.
  Object.entries(playerColorElimination).forEach(([key,value]) => {
    // don't reset the value if 
    if (state == false) {
      document.getElementById(key).checked = value;
    }
  })
}

function setColor() {
  // get all the player color selection values
  const player_colors = document.getElementsByClassName("player_color_selection");
  
  // walk the list and set the foreground and background color correctly.
  [...player_colors].forEach( (item) => {
    if (item.value != "unknown") {
      item.style.backgroundColor = item.value;
    }
    else
    {  item.style.backgroundColor = "#00f2ff";}
    if (['yellow','white','unknown'].includes(item.value)) {
      item.style.color = "black";
    } else {
      item.style.color = "white";
    }
  })

}

// set the value of the checkbox in the global array
function updatePlayerColorElimination(element) {
  playerColorElimination[element.id]= element.checked;
}