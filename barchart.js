var barwidth = 500;
var barheight = 100;

// set the ranges
var barx = d3.scaleBand().range(0,barwidth);
var bary = d3.scale.linear().range([0,barheight]);

var xAxis = d3.svg.axis()
    .scale(barx)
    .orient("bottom")


var yAxis = d3.svg.axis()
    .scale(bary)
    .orient("left")
    .ticks(10);

//Create SVG element
var barsvg = d3.select("body")
  .append("svg")
  .attr("width", barwidth)
  .attr("height", barheight);

// load the data
d3.json("https://drive.google.com/file/d/0B2a8vZkPUfslNXF4Y1YycHNoZlU/view?usp=sharing", function(error, data) {
    data.forEach(function(d) {
        d.Name = d.Name;
        d.Overall = +d.Overall;
    });

    // scale the range of the data
    barx.domain(data.map(function(d) {
        return d.Name;
    }));
    bary.domain([0, d3.max(data, function(d) {
        return d.Overall;
    })]);

    // add axis
    barsvg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + barheight + ")")
      .call(xAxis)
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-90)");

    barsvg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 5)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Overall");

    // Add bar chart
    barsvg.selectAll("bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) {
          return x(d.Name);
      })
      .attr("width", x.rangeBand())
      .attr("y", function(d) {
          return y(d.Overall);
      })
      .attr("height", function(d) {
          return height - y(d.Overall);
      });
});