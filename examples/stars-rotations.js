/* Michał Dudziński */

var svg = d3.select("body").
  append("svg").
  attr("width", 600).
  attr("height", 480);

var starsData = [
    {"x": 30, "y": 60, "size": 16, "fill": "#05ff05"},
    {"x": 95, "y": 25, "size": 76, "fill": "#eac"},
    {"x": 155, "y": 295, "size": 146, "fill": "hsl(178, 60%, 55%)"}
];


function getStars(data){
    var angle1 = 0;
    var angle2 = 45;

    return {
        drawStars: function(){
            var stars = svg.selectAll("rect").data(data);

            stars.enter().append("rect")
            .attr("x", function(star) { return star.x; })
            .attr("y", function(star) { return star.y; })
            .attr("height", function(star) { return star.size; })
            .attr("width", function(star) { return star.size; })
            .attr('fill', function(star) { return star.fill; })
            .attr("cx", function(star) {return star.x + star.size/2; })
            .attr("cy", function(star) {return star.y + star.size/2; })
            .attr("angleType", "angle1");

            stars.enter().append("rect")
            .attr("x", function(star) { return star.x; })
            .attr("y", function(star) { return star.y; })
            .attr("height", function(star) { return star.size; })
            .attr("width", function(star) { return star.size; })
            .attr('fill', function(star) { return star.fill; })
            .attr("cx", function(star) {return star.x + star.size/2; })
            .attr("cy", function(star) {return star.y + star.size/2; })
            .attr("angleType", "angle2")
            .attr("transform", function(){
                var cx = d3.select(this).attr("cx");
                var cy = d3.select(this).attr("cy");
                return "rotate("+angle2+","+cx+","+cy+")";
            });
        },
        animateStars : function (){
            var closure = this.Bind(this.animateStars);
            var stars = svg.selectAll("rect");
            var timer;

            if (angle1 >= 360){
                angle1=0;
            }

            if (angle2 >= 360){
                angle2=0;
            }

            stars.attr("transform", function(){
                var cx = d3.select(this).attr("cx");
                var cy = d3.select(this).attr("cy");
                var angle = d3.select(this).attr("angleType") === "angle1" ? angle1 : angle2;
                return "rotate("+angle+", "+cx+", "+cy+")";
            });

            angle1++;
            angle2++;

            timer = setTimeout(closure, 25);
        },
        Bind: function( Method ){
            var _this = this;

            return(
                 function(){
                    return( Method.apply( _this, arguments ) );
                 }
            );
        }
    };
}

var stars = getStars(starsData);
stars.drawStars();
stars.animateStars();

