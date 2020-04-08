// below code renders bar graph properly without loading data from csv
document.addEventListener("DOMContentLoaded", () => {
    //set params m/h/w
    const margin = 50
    const height = window.innerHeight - margin * 3;
    const width = window.innerWidth - margin * 9;


    d3.csv("/src/data/data3.csv", function (d) {
        return {
            region: d.region,
            marketshare: d.marketshare
        };
    }).then(function (data) {
        console.log(data[0]); 

        // y axis elements
        const yAxis = d3.scaleLinear().range([height, 0]).domain([0, 100]);

        // x axis elements
        const xAxis = d3.scaleBand()
            .range([0, width])
            .domain(data.map((d) => d.region))
            .padding(0.3);

        // draws tick lines throughout graph from y axis 
        const yLines = () => d3.axisLeft().scale(yAxis)

        //select svg by classname
        const myBar = d3.select("#marketshareGraph")
            .append('g')
            .attr('transform', `translate(${margin}, ${margin})`)

        // draws y axis elements
        myBar.append('g')
            .call(d3.axisLeft(yAxis));

        //draws x axis elements
        myBar.append('g')
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(xAxis));

        //draws m on axis
        myBar.append('g')
            .attr('class', 'myBar-lines')
            .call(yLines()
                .tickSize(-width)
                .tickFormat('')
            )
        //draws bars
        myBar.selectAll()
            .data(data)
            .enter()
            .append('g')
            .append("rect")
            .attr("class", "bar")
            .attr("x", g => xAxis(g.region))
            .attr("y", g => yAxis(g.marketshare))
            .attr("height", g => height - yAxis(g.marketshare))
            .attr("width", xAxis.bandwidth())

        // draws number of each graph above bar
        myBar.selectAll()
            .data(data)
            .enter()
            .append('g')
            .append("text")
            .attr("class", "myBar-val")
            .attr("x", g => xAxis(g.region) + xAxis.bandwidth() / 2)
            .attr("y", g => yAxis(g.marketshare) + 20)
            .attr("text-anchor", "middle")
            .style("font-weight", "bold")
            .style("fill", "black")
            .style("text-decoration", "underline")
            .text(g => `${g.marketshare}%`);

        // draws titles and lables for axes and graph
        d3.select("#marketshareGraph")
            .append("text")
            .attr("class", "region-title")
            .attr("x", width / 2 + margin)
            .attr("y", 22)
            .attr("text-anchor", "middle")
            // .attr("stroke", "darkblue")
            .style("fill", "black")
            .style("font-size", "25px")
            // .style("text-decoration", "underline")
            .text("Marketshare By Region In 2019");

        d3.select("#marketshareGraph")
            .append("text")
            .attr("class", "region-source")
            .attr("x", width / 2 + margin)
            .attr("y", 40)
            .attr("text-anchor", "middle")
            .style("fill", "black")
            .text("Source: https://www.statista.com/");

        d3.select("#marketshareGraph")
            .append("text")
            .attr("class", "region-label")
            .attr("x", width / 2 + margin)
            .attr("y", height + margin * 1.7)
            .attr("text-anchor", "middle")
            // .attr("stroke", "darkblue")
            .style("font-size", "12px")
            .style("fill", "black")
            .style("text-decoration", "underline")
            .text("Regions");

        d3.select("#marketshareGraph")
            .append("text")
            .attr("class", "region-label")
            .attr("x", -(height / 2))
            .attr("y", margin / 4.5)
            .attr("transform", "rotate(-90)")
            .attr("text-anchor", "middle")
            // .attr("stroke", "darkblue")
            .style("font-size", "14px")
            .style("fill", "black")
            .style("text-decoration", "underline")
            .text("Marketshare Percentage");
    });
});