function drawScatterplot(elem) {
  // get rid of jQuery selection to access raw HTML node of <dc-scatterplot>
  var rootNode = elem[0];

  var root = d3.select(rootNode).select('.chart-container');

  // console.log(d3.select());
/*  var margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;*/

  var margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = parseInt(d3.select('.chart-container').style('width'), 10),
      width = width - margin.left - margin.right,
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


  var svg = root.append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var tooltip = root.append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

  // get the data! from a database! how cool!
  d3.json('/memoriesdb', function (err, data) {
   // console.log('your array of memories!', data);

    // ensures data are numbers
    data.forEach(function(d) {
      d.posNeg = +d.posNeg;
      d.age = +d.age;
    });

    // sets the min and max for each axis
    //var xscale = x.domain(d3.extent(data, function(d) { return d.age; })).nice();
    var xscale = x.domain([0,d3.max(data, function(d) { return d.age; })]);
    // yscale contains the posNegs values which are always between 1 and 10.
    var yscale = y.domain([1, 10]);

    // x-axis rendering and labels
   svg.append("g")
       .attr("class", "x axis")
       .attr("transform", "translate(0," + height/2 + ")")
       .call(d3.axisBottom(x));

    // x-axis label
    svg.append("text")
       .attr("class", "label x-axis-label")
       .attr("x", width/2)
       .attr("y", height/2 + 20)
       .style("text-anchor", "middle") //axis label not showing up
       .text("age");

    // y-axis rendering
    svg.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(y))

    //y-axis labels
    svg.append("text")
       .attr("class", "label y-axis-label")
       .attr("transform", "rotate(-90)")
       .attr("y", -30)
       .attr("x", -height/2)
       //.attr("dy", ".71em")
       .style("text-anchor", "middle")
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
            .style("left", ((d3.mouse(this)[0]) - 10) + "px") // finds x coordinate of mouse position
            .style("top", ((d3.mouse(this)[1]) + 50) + "px"); //finds y coordinate of mouse position
         })
        .on("mouseout", function(d) {
            tooltip.transition()
            .duration(200)
            .style("opacity", 0);
        d3.select(this).transition()
            .attr("r", 10);
        })

  });
}

/* A custom directive for the scatterplot chart */
app.directive("dcScatterplot", function() {
  return {
    restrict: 'E', // only use this directive as a tag
    template: '<div class="chart-container"></div>',
    link: function (scope, elem, attrs) {
      drawScatterplot(elem);
    }
  };
});