var margin = {top: 10, right: 30, bottom: 30, left: 50},
    width = 760 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#chart")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

svg.append("text")
       .attr("transform", "translate(100,0)")
       .attr("x", 90)
       .attr("y", 10)
       .attr("font-size", "16px")
       .text("CS Professors By Rank at Sample of Universities");

var universities = new Map();

//Read the data
d3.csv("./data/cs_profs.csv",
  function(d){
  	if ((d.University.includes("Boston")) || (d.University.includes("Brown")) || (d.University.includes("California Institute")) || (d.University.includes("Carnegie")))  {
	    if (!universities.has(d.University)) {
	      universities.set(d.University, new Map());
	      if (!universities.get(d.University).has(d.Rank)) {
	        universities.get(d.University).set(d.Rank, 1);
	      } else {
	        universities.get(d.University).set(d.Rank, universities.get(d.University).get(d.Rank) + 1);
	      }
	    } else {
	      if (!universities.get(d.University).has(d.Rank)) {
	        universities.get(d.University).set(d.Rank, 1);
	      } else {
	        universities.get(d.University).set(d.Rank, universities.get(d.University).get(d.Rank) + 1);
	      }
	    }
	}
  },

  function(data) {
	var names = Array.from(universities.keys());
	var ranks = Array.from(universities.values());
	var counts = [];
    
    for (let item of ranks) {
    	counts.push(Array.from(item.values()));
    }

    var color = ['#4A7B9D','#54577C','#ED6A5A','#4A7B9D'];

	var top = d3.scaleBand()
    		.rangeRound([0, width])
    		.domain(names);

	var x0 = d3.scaleBand()
    		.rangeRound([0, top.bandwidth()])
    		.domain(Array.from(ranks[0].keys()).sort());
    
    var x1 = d3.scaleBand()
    		.rangeRound([0, top.bandwidth()])
    		.domain(Array.from(ranks[1].keys()).sort());
    
    var x2 = d3.scaleBand()
    		.rangeRound([0, top.bandwidth()])
    		.domain(Array.from(ranks[2].keys()).sort());
    
    var x3 = d3.scaleBand()
    		.rangeRound([0, top.bandwidth()])
    		.domain(Array.from(ranks[3].keys()).sort());

    var y = d3.scaleLinear()
      .domain([0, d3.max(counts[3]) + 3])
      .range([height - 80, 0]);

    svg.append("g")
      .attr("transform", "translate(0," + (height - 520) + ")")
      .call(d3.axisBottom(top))
    svg.append("text")
      .attr("class", "x label")
      .attr("text-anchor", "end")
      .attr("x", width/2 + 30)
      .attr("y", 35)
      .attr("font-size", "12px")
      .text("Universities");

    svg.append("g")
      .attr("transform", "translate(0," + 45 + ")")
      .call(d3.axisLeft(y));
    svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", -36)
    .attr("x", -225)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .attr("font-size", "12px")
    .text("# of Professors");

   	svg.append("g")
      		.attr("transform", "translate(" + 0 + "," + (height - 33) + ")")
      		.call(d3.axisBottom(x0))
    var offset = 0;
    for (let each of ranks[0].values()) {
	   	svg.append("rect")
	    .attr("width", x0.bandwidth() - 5)
	    .attr("x", function(d) { return offset; })
	    .attr("y", function(d) { return y(each) + 45; })
	    .attr("height", function(d) { return height - 78 - y(each); })
	    .style("fill", function(d) { return color[0]; });
	    offset += 60;
	}
  svg.append("text")
      .attr("class", "x label")
      .attr("text-anchor", "end")
      .attr("x", width/2 + 20)
      .attr("y", height)
      .attr("font-size", "12px")
      .text("Ranks");

    svg.append("g")
      		.attr("transform", "translate(" + 170 + "," + (height - 33) + ")")
      		.call(d3.axisBottom(x1))
    svg.append('line')
    		.style("stroke", "black")
    		.style("stroke-width", 1)
    		.attr("x1", 170)
    		.attr("y1", height - 520)
    		.attr("x2", 170)
    		.attr("y2", height-33); 
    offset = 0;
    for (let each of ranks[1].values()) {
	   	svg.append("rect")
	    .attr("width", x1.bandwidth() - 7)
	    .attr("x", function(d) { return offset + 171; })
	    .attr("y", function(d) { return y(each) + 45; })
	    .attr("height", function(d) { return height - 78 - y(each); })
	    .style("fill", function(d) { return color[1]; });
	    offset += 45;
	}

    svg.append("g")
      		.attr("transform", "translate(" + 340 + "," + (height - 33) + ")")
      		.call(d3.axisBottom(x2));
	svg.append('line')
    		.style("stroke", "black")
    		.style("stroke-width", 1)
    		.attr("x1", 340)
    		.attr("y1", height - 520)
    		.attr("x2", 340)
    		.attr("y2", height - 33); 
    offset = 0;
    for (let each of ranks[2].values()) {
	   	svg.append("rect")
	    .attr("width", x2.bandwidth() - 7)
	    .attr("x", function(d) { return offset + 341; })
	    .attr("y", function(d) { return y(each) + 45; })
	    .attr("height", function(d) { return height - 78 - y(each); })
	    .style("fill", function(d) { return color[2]; });
	    offset += 89;
	}

    svg.append("g")
      		.attr("transform", "translate(" + 510 + "," + (height - 33) + ")")
      		.call(d3.axisBottom(x3));
    svg.append('line')
    		.style("stroke", "black")
    		.style("stroke-width", 1)
    		.attr("x1", 510)
    		.attr("y1", height - 520)
    		.attr("x2", 510)
    		.attr("y2", height - 33);
   	offset = 0;
    for (let each of ranks[3].values()) {
	   	svg.append("rect")
	    .attr("width", x3.bandwidth() - 7)
	    .attr("x", function(d) { return offset + 511; })
	    .attr("y", function(d) { return y(each) + 45; })
	    .attr("height", function(d) { return height - 78 - y(each); })
	    .style("fill", function(d) { return color[3]; });
	    offset += 60;
	}
  }
);