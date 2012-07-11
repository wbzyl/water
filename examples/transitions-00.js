// dodajemy element SVG do elementu BODY

var svg = d3.select("body").append("svg")
 .attr("width", 600)
 .attr("height", 400);

var square = svg.append("rect")
  .attr("x",60).attr("y",60)
  .attr("width",60).attr("height",60)
  .style("fill", "limegreen");

square
  .transition()
  .attr("x", 520)
  .style("fill", "tomato");
