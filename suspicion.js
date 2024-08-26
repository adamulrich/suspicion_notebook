window.onbeforeunload = function() {
    return "Data will be lost if you leave the page, are you sure?";
  };

var playerCount = 0;

visualViewport.onresize = () => {
  var scale = visualViewport.scale;
  const cardClasses = document.querySelectorAll('input[type=text]');
  var new_width = 100 * scale *1;
  new_width = new_width.toString() + "px"
  cardClasses.forEach(element => {
    element.style.width =  new_width;
  });

  const checkboxes = document.querySelectorAll('.card-checkbox');
  var new_width = 65 * scale *1.5;
  new_width = new_width.toString() + "px"
  checkboxes.forEach(element => {
    element.style.width =  new_width;
  });

  // const scoreheader = document.querySelectorAll('.score-header section');
  // var new_width = 75 * scale *1.2;
  // new_width = new_width.toString() + "px"
  // scoreheader.forEach(element => {
  //   element.style.width =  new_width;
  // });



};

function calculateScore() {

  //score gems
  var score = 0;
  var orange_count = Number(document.getElementById("orange_count").value);
  var red_count = Number(document.getElementById("red_count").value);
  var green_count = Number(document.getElementById("green_count").value);

  // remove groups of 3 for 6 points
  while (orange_count > 0 && red_count > 0 && green_count >0 ) {
    score +=6;
    orange_count -= 1;
    red_count -= 1;
    green_count -= 1;
  }

  // add the rest of the gems
  score += orange_count + red_count + green_count;

  // for each player that is marked correct, add 7
  const correct_checkboxes = document.querySelectorAll("input:checked.correct-checkbox");
  score += (correct_checkboxes.length * 7)

  //update score
  document.getElementById("score").innerText = score.toString()
}

function addPlayer() {
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
      <option default value="unknown" >unknown</option>
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
      <input type="checkbox" name="pink" id="pink<#number#>">
      <label class= "checkbox-label" style="background-color: #f697c8;color: aliceblue;" for="pink<#number#>">pink</label>
  </div>
  <!-- red -->
  <div class="card-checkbox">
      <input type="checkbox" name="red" id="red<#number#>">
      <label class= "checkbox-label" style="background-color: #b90202;color: aliceblue;" for="red<#number#>">red</label>
  </div>
  <!-- brown -->
  <div class="card-checkbox">
      <input type="checkbox" name="brown" id="brown<#number#>">
      <label class= "checkbox-label" style="background-color: #bd5700;color: aliceblue;" for="brown<#number#>">brown</label>
  </div>
  <!-- orange -->
  <div class="card-checkbox">
      <input type="checkbox" name="orange" id="orange<#number#>">
      <label class= "checkbox-label" style="background-color: #e99303;color: aliceblue;" for="orange<#number#>">orange</label>
  </div>
  <!-- yellow -->
  <div class="card-checkbox">
      <input type="checkbox" name="yellow" id="yellow<#number#>">
      <label class= "checkbox-label" style="background-color: #fff703;color: black;" for="yellow<#number#>">yellow</label>
  </div>
  <!-- green -->
  <div class="card-checkbox">
      <input type="checkbox" name="green" id="green<#number#>">
      <label class= "checkbox-label" style="background-color: #b1b801;color: aliceblue;" for="green<#number#>">green</label>
  </div>
  <!-- blue -->
  <div class="card-checkbox">
      <input type="checkbox" name="blue" id="blue<#number#>">
      <label class= "checkbox-label" style="background-color: #0053a5;color: aliceblue;" for="blue<#number#>">blue</label>
  </div>
  <!-- puple -->
  <div class="card-checkbox">
      <input type="checkbox" name="purple" id="purple<#number#>">
      <label  class= "checkbox-label" style="background-color: #5b157c;color: aliceblue;" for="purple<#number#>">purple</label>
  </div>
  <!-- gray -->
  <div class="card-checkbox">
      <input type="checkbox" class="checkbox" name="gray" id="gray<#number#>" >
      <label class="checkbox-label" style="background-color: #bdbab4;color: aliceblue" for="gray<#number#>">gray</label>
  </div>
  <!-- white -->
  <div class="card-checkbox">
      <input type="checkbox" name="white" id="white<#number#>">
      <label class= "checkbox-label" style="background-color: white;color: black;" for="white<#number#>">white</label>
  </div>
  
</div>`

  if (playerCount < 6) {
    var html = html_template.replaceAll("<#number#>",(playerCount+1).toString());
    document.getElementById("card-container").innerHTML += html;
    playerCount +=1
  }
}

function eliminateColor(name) {
  // select all items with name
  const selection = document.getElementsByName(name);
  
  //mark them all as selected
  selection.forEach( (item) => {
    item.checked = document.getElementById(name).checked;
  })
}

function setColor() {
  const player_colors = document.getElementsByClassName("player_color_selection");
  console.log(player_colors.length);
  [...player_colors].forEach( (item) => {
    if (item.value != "unknown") {
      item.style="background-color:"+item.value;
    }
    else
    {  item.style="background-color:#00f2ff";}
  })
}
