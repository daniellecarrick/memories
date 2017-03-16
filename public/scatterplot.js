var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scaleLinear()
    .range([0, width]);

var y = d3.scaleLinear()
    .range([height, 0]);

/* Domain of possible values is 0 to 10. Range needs to be between 0 and 1 for d3.interpolate*/
var colors = d3.scaleLinear().domain([1,10]).range([1,0]);

var xAxis = d3.select(".axis")
    .call(d3.axisBottom(x));

var yAxis = d3.select(".axis")
    .call(d3.axisLeft(y));


var svg = d3.select(".chart-container").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var tooltip = d3.select(".d3").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

// get the data! from a database! how cool!
d3.json('/memoriesdb', function (err, data) {
  console.log('your array of memories!', data);

  // ensures data are numbers
  data.forEach(function(d) {
    d.posNeg = +d.posNeg;
    d.age = +d.age;
  });

  // sets the min and max for each axis
  var xscale = x.domain(d3.extent(data, function(d) { return d.age; })).nice();
  // yscale contains the posNegs values which are always between 1 and 10.
  var yscale = y.domain([1, 10]);

  // x-axis rendering and labels
 svg.append("g")
     .attr("class", "x axis")
     .attr("transform", "translate(0," + height/2 + ")")
     .call(d3.axisBottom(x));

  svg.append("text")
     .attr("class", "label x-axis-label")
     .attr("x", width)
     .attr("y", -6)
     .style("text-anchor", "middle") //axis label not showing up
     .text("age");

  // y-axis rendering and labels
  svg.append("g")
      .attr("class", "y axis")
      .call(d3.axisLeft(y))
/*    .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "middle") //axis label not showing up
      .text("sentiment")*/

  svg.append("text")
     .attr("class", "label y-axis-label")
     .attr("transform", "rotate(-90)")
     .attr("x", width)
     .attr("y", 6)
     .attr("dy", ".71em")
     .style("text-anchor", "middle") //axis label not showing up
     .text("sentiment");

  var dots = svg.selectAll(".dot");
  // data markers
  dots.data(data)
    .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 10)
      .attr("cx", function(d) { return x(d.age); })
      .attr("cy", function(d) { return y(d.posNeg); })
      // using a color scale to fill dots based on rating
      //.style("fill", function(d) { return d3.interpolatePuOr(colors(d.posNeg)); })
      .style("fill", "white")
      .style("fill-opacity", 0.2)
      .style("stroke", "white")
      .style("stroke-opacity", .8)
      .on("mouseover", function(d) {
       tooltip.transition()
         .duration(200)
         .style("opacity", 1);
         // make the bubble a little bigger
        d3.select(this).transition()
          .attr("r", 15);
       tooltip.html(d.body)
         .style("left", (d3.mouse(this)[0]) + "px") // finds x coordinate of mouse position
         .style("top", (d3.mouse(this)[1]) + "px"); //finds y coordinate of mouse position
       })
      .on("mouseout", function(d) {
        tooltip.transition()
        .duration(200)
        .style("opacity", 0);
      d3.select(this).transition()
          .attr("r", 10);
      })

 /* var legend = svg.selectAll(".legend")
      .data(color.domain())
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);

  legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d; });*/

});