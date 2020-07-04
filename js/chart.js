function createChart(){

    var padding = {top:5, right:40, bottom:0, left:0};
    let width = 600 - padding.right;
    let height = 600 ;
    let radius = Math.min(width, height)/2;
    let rotation = 0;
    let oldrotation = 0;
    
    let chartWidth = d3.select('#chart').node().getBoundingClientRect().width; 
    let chartHeigth = chartWidth < 400 ? chartWidth : 600;
           
    document.getElementById('chart').innerHTML = ""
        var data = app.countries;
        var svg = d3.select('#chart')
                    .append("svg")
                    .data([data])
                    .attr("width", chartWidth)
                    .attr("height", chartHeigth)
                    .attr("viewBox", `0 0 600 600`);

        var container = svg.append("g")
                           .attr("class", "chartholder")
                           .attr("transform", "translate(" + (width/2) + "," + (height/2) + ")");
        
        var vis = container.append("g");
            
        var pie = d3.layout.pie().sort(null).value(function(d){return 1;});
        // declare an arc generator function
        var arc = d3.svg.arc().outerRadius(radius);
        // select paths, use arc generator to draw
        var arcs = vis.selectAll("g.slice")
                      .data(pie)
                      .enter()
                      .append("g")
                      .attr("class", "slice container");

        let color = d3.scale.category20();            
        arcs.append("path")
            .attr("fill", function(d, i){ return color(i); })
            .attr("d", function (d) { return arc(d); });
        // add the text
        arcs.append("text").attr("transform", function(d){
                d.innerRadius = 0;
                d.outerRadius = radius;
                d.angle = (d.startAngle + d.endAngle)/2;
                return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")translate(" + (d.outerRadius -10) +")";
            }).attr("text-anchor", "end")
              .text( function(d, i) {
              return data[i].label;
            });


        //make arrow
        svg.append("g")
            .attr("transform", "translate(" + (width + padding.right) + "," + ((height/2)+padding.top) + ")")
            .append("path")
            .attr("d", "M-" + (radius*.15) + ",0L0," + (radius*.05) + "L0,-" + (radius*.05) + "Z")
            .style({"fill":"black"});
        //draw spin circle
        container.append("circle")
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("r", 50)
            .style({"fill":"white","cursor":"pointer"});
        //spin text
        var texto = "GIRAR";
        container.append("text")
            .attr("x", 0)
            .attr("y", 15)
            .attr("text-anchor", "middle")
            .text(texto)
            .style({"font-weight":"bold", "font-size":"30"});

        container.on("click", spin);
        
        //Function SPIN
        function spin(d){
            container.on("click", null);

            var ps = 360/data.length;
            var rng = Math.floor((Math.random() * 1440) + 360);
                
            rotation = (Math.round(rng / ps) * ps);
            picked = Math.round(data.length - (rotation % 360)/ps);

            rotation += 90 - Math.round(ps/2);

            
            vis.transition()
                .duration(2000)
                .attrTween("transform", rotTween)
                .each("end", function(){
                    //populate question
                    //d3.select("#question h1").text(data[picked].question);
                    //document.getElementById('escolha').innerHTML = data[picked].label;
                    /* Comment the below line for restrict spin to sngle time */
                    container.on("click", spin);
                });
        }

        function rotTween(to) {
          var i = d3.interpolate(oldrotation % 360, rotation);
          return function(t) {
            return "rotate(" + i(t) + ")";
        };    
    } 
}