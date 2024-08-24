window.onbeforeunload = function() {
    return "Data will be lost if you leave the page, are you sure?";
  };


visualViewport.onresize = () => {
  var scale = visualViewport.scale;
  const cardClasses = document.querySelectorAll('input[type=text]');
  var new_width = 100 * scale *1;
  new_width = new_width.toString() + "px"
  cardClasses.forEach(element => {
    element.style.width =  new_width;
    
  });
};