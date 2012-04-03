//Jacek Dzido 2012 - jdzido@gmail.com
//rysowanie gwiazdy - pentagramu
var star = d3.select("body").
  append("svg:svg").
  attr("width", 640).
  attr("height", 640);

  
star.append("svg:polygon").
  attr("points","156,80 18,124 103,7 103,152 18,35"). //współrzędne punktów
  attr('transform', "translate(50,50), scale(3,3)"). //przesunięcie, skalowanie
  attr("style","fill:red;stroke:blue;stroke-width:5;fill-rule:evenodd;"). //kolory
  attr("height", 1). //wartości obojętne
  attr("width", 1);

