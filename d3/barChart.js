/**
 * Created by Charls on 03-06-2016.
 */


var outerWidth = 200	;
var outerHeight = 100;
var margin = { left: 90, top: 30, right: 30, bottom: 30 };
var barPadding = 0.2;
var xColumn = "partyname";
var yColumn = "count";
var innerWidth  = outerWidth  - margin.left - margin.right;
var innerHeight = outerHeight - margin.top  - margin.bottom;
var svg = d3.select("body").append("svg")
    .attr("width",  outerWidth)
    .attr("height", outerHeight);
var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
var xAxisG = g.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + innerHeight + ")");
var yAxisG = g.append("g")
    .attr("class", "y axis");
var xScale = d3.scale.ordinal().rangeRoundBands([0, innerWidth], barPadding );
var yScale = d3.scale.linear().range([innerHeight, 0]);
var xAxis = d3.svg.axis().scale(xScale).orient("bottom")

var yAxis = d3.svg.axis().scale(yScale).orient("left")

function render(data){
   

	data.forEach(function(d) { 
	   d.partyname = d.partyname;
	   d.count = +d.count; 
   		});
	
	data.sort( function (a, b) {
	  return b.yColumn - a.yColumn;
         } ); 

    xScale.domain(       data.map( function (d){ return d[xColumn]; }));
    yScale.domain([0, d3.max(data, function (d){ return d[yColumn]; })]);
    xAxisG.call(xAxis);
    yAxisG.call(yAxis);
    var bars = g.selectAll("rect").data(data);
    bars.enter().append("rect")
        .attr("x",      function (d){ return               xScale(d[xColumn]); })
        .attr("y",      function (d){ return               yScale(d[yColumn]); })
        .attr("width", xScale.rangeBand())
        .attr("height", function (d){ return innerHeight - yScale(d[yColumn]); })
	.style("fill"," #9f6d63 ");

   svg.selectAll('text')
  	.data(data)
 	.enter()
	.append('text')
	.text(function(d) { return d[yColumn];})
	.attr('x', function(d) { return xScale(d[xColumn]) + xScale.rangeBand()/2; })
	.attr('y', function(d) { return yScale(d[yColumn]) + 12;})
	 .style("fill","white")
	.style("text-anchor" ,"middle");

    bars.exit().remove();
}

d3.json('http://localhost:8081/fetch', render);






