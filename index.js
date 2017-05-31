d3.json("http://api.tvmaze.com/search/shows?q=mars", function(data) {
    var filteredData = [];
    data.forEach(function(item) {
        if (item.show.rating.average) {
            filteredData.push({name: item.show.name, rating: item.show.rating.average} )
        }
    })

    var canvas = d3.select("body").append("svg")
        .attr("width", 500)
        .attr("height", 500)
        .attr("class", "bars")

    canvas.selectAll("rect")
        .data(filteredData)
        .enter()
        .append("rect")
        .attr("width", function(d) {return d.rating * 35})
        .attr("height", 47)
        .attr("y", function(d, i) {return i * 50})
        .attr("fill", "blue");


    canvas.selectAll("text")
        .data(filteredData)
        .enter()
        .append("text")
        .attr("y", function(d, i) {return i * 50 + 26})
        .attr("fill", "white")
        .text(function(d) {return d.name + ' - ' + d.rating});


    var canvasArc = d3.select("body").append("svg")
        .attr("class", "donut")
        .attr("width", 1000)
        .attr("height", 1000);

    var group = canvasArc.append("g")
        .attr("transform", "translate(450, 450)");

    var r = 350;
    var p = Math.PI * 2;

    var color = d3.scale.ordinal()
        .range(["red", "lightblue", "orange", "yellow", "green", "violet"]);

    var arc = d3.svg.arc()
        .innerRadius(r - 160)
        .outerRadius(r);

    var pie = d3.layout.pie()
        .value(function (d) {return d.rating;});

    var arcs = group.selectAll(".arc")
        .data(pie(filteredData))
        .enter()
        .append("g")
        .attr("class", "arc")

    arcs.append("path")
        .attr("d", arc)
        .attr("fill", function (d) {return color(d.data.rating);});

    arcs.append("text")
        .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")" ;})
        .attr("text-anchor" , "middle")
        .attr("class", "shadow")
        .text(function (d) { return d.data.name + ' - ' + d.data.rating ;})



})
