// import * from 'd3';

// loads data from the csv file and addes axes to SVG
// d3.csv("././data1.csv", function (error, data) {
//     if (error) {
//         throw error;
//     }

//     xScale.domain(data.map(function (d) { return d.year }))
//     yScale.domain([0, d3.max(data, function (d) { return d.revenue })])

//     g.append('g')
//         .attr("transform", "translate(0," + height + ")")
//         .call(d3.axisBottom(xScale))

//     g.append('g')
//         .call(d3.axisLeft(yScale).tickFormat(function (d) {
//             return "$" + d;
//         }).ticks(10))
//             .append('text')
//             .attr('y', 6)
//             .attr('dy', '0.71em')
//             .attr("text-anchor", "end")
//             .text("Revenue in Millions U.S. Dollars");
//     });

document.addEventListener("DOMContentLoaded", () => {
    const dataset = [
        { year: "2012", revenue: 130},
        { year: "2014", revenue: 194},
        { year: "2015", revenue: 325},
        { year: "2016", revenue: 493},
        { year: "2017", revenue: 655},
        { year: "2018", revenue: 865},
        { year: "2019", revenue: 1096}
    ]

    const data = dataset.sort (function(a, b) {
        return d3.ascending(a.revenue,b.revenue)
    })
    
    const margin = 50
    const width = window.innerWidth - margin * 6.7;
    const height = window.innerHeight - margin * 3;

    const svg = d3.select("#yearGraph");
    // const svgContainer = d3.select("#container");

    const chart = svg.append('g')
        .attr('transform', `translate(${margin}, ${margin})`)

    const yScale = d3.scaleLinear()
        .range([height, 0])
        .domain([0, 1200]);


    const xScale = d3.scaleBand()
        .range([0, width])
        .domain(data.map((d) => d.year))
        .padding(0.4);

    const makeYLines = () => d3.axisLeft()
        .scale(yScale)

    chart.append('g')
        .call(d3.axisLeft(yScale));

    chart.append('g')
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(xScale));

    chart.append('g')
        .attr('class', 'grid')
        .call(makeYLines()
            .tickSize(-width, 1, 0)
            .tickFormat('')
        )

    const barGroups = chart.selectAll()
        .data(data)
        .enter()
        .append('g')

    chart.selectAll()
        .data(data)
        .enter()
        .append('g')
        .append("rect")
        .attr("class", "bar")
        .attr("x", g => xScale(g.year))
        .attr("y", g => yScale(g.revenue))
        .attr("height", g => height - yScale(g.revenue))
        .attr("width", xScale.bandwidth())
       
    barGroups.append("text")
        .attr("class", "value")
        .attr("x", g => xScale(g.year) + xScale.bandwidth() / 2)
        .attr("y", g => yScale(g.revenue) - 3 )
        .attr("text-anchor", "middle")
        .text(g => `${g.revenue}`);

    svg.append("text")
        .attr("class", "title")
        .attr("x", width / 2 + margin)
        .attr("y", 25)
        .attr("text-anchor", "middle")
        .attr("stroke", "grey")
        .attr("font-size", "12px")
        .text("Esports Market Revenue");

    svg.append("text")
        .attr("class", "source")
        .attr("x", width / 2 + margin)
        .attr("y", 40)
        .attr("text-anchor", "middle")
        .text("Source: https://www.statista.com/");

    d3.select("#yearGraph")
        .append("text")
        .attr("class", "label")
        .attr("x", -(height / 2))
        .attr("y", margin / 4.5)
        .attr("transform", "rotate(-90)")
        .attr("text-anchor", "middle")
        .attr("stroke", "black")
        .attr("font-size", "12px")
        .text("Revenue in Millions U.S. Dollars");

    svg.append("text")
        .attr("class", "label")
        .attr("x", width / 2 + margin)
        .attr("y", height + margin * 1.7)
        .attr("text-anchor", "middle")
        .attr("stroke", "grey")
        .attr("font-size", "12px")
        .attr("font-family", "op")
        .text("Year");


// drawing a line and making axes
    // svg.append("path")
    //     .data([data])
    //     .attr('class','line')
    //     .attr("d",line)

    // svg.append("g")
    //     .attr("transform", "translate(0," + height + ")")
    //     .call(d3.axisBottom(xScale))

    // svg.append("g")
    //     .data([data])
});


