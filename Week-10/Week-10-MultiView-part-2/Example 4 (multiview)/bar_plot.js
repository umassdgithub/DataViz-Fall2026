// same padding as scatter_plot, so the histograms line up with its axes
function data_axis_pad(data,pad=.05){
    return [data[0]-pad*data[0], data[1]+pad*data[1] ]
}

function bar_plot(Values, //column values to make histogram of
                  bins_count=10, // number of the bins desired
                  axis_key, // id of the svg
                  title="", // title of the figure
                  xLabel="", // xlabel
                  yLabel="",  //ylabel
                  margin = 80
)
{
    // assign which SVG element should be the host for the figure
    let axis = d3.select(`#${axis_key}`)
    let height= parseInt(axis.attr("height"));
    let width= parseInt(axis.attr("width"))-margin;

    // make a linear scale for the X Axis
    // we will use this for making bins and placing them
    let xScale= d3.scaleLinear()
        .domain(data_axis_pad(d3.extent(Values)))
        .range([margin,width]);


    // histogram function makes bins and the values for each bin
    // use xScale and number bins to calculate the bins location and value
    let histogram = d3.histogram()
        .value(function(d) { return d })
        .domain(xScale.domain())
        .thresholds(xScale.ticks(bins_count+1));


    let bins = histogram(Values);


    // y will represent number of elements inside each bin!
    let yScale= d3.scaleLinear()
        .domain([0,d3.max(bins,function(d) { return d.length; })])
        .range([height,0]);



    // pass the bins and plot them
    axis.selectAll('.bars')
        .data(bins)  // array of arrays (each array inside it is the values inside one bin)
        .enter()
        .append("g")
        .attr("class","bars")
        .attr("transform",
            function(d) {
                return `translate(${xScale(d.x0)} ,${yScale(d.length)} )`;
            })
        .append('rect')
        .attr("width",
            function(d) {
                // the bin spans from x0 to x1 on the x scale
                return Math.max(0, xScale(d.x1) - xScale(d.x0) - 1);
            })
        .attr("height", function(d) { return height - yScale(d.length); })
        .style("fill", "#509ec8")

}


function h_bar_plot(Values, //column values to make histogram of
                  bins_count=10, // number of the bins desired
                  axis_key, // id of the svg
                  title="", // title of the figure
                  xLabel="", // xlabel
                  yLabel="",  //ylabel
                  margin = 80
)
{
    // assign which SVG element should be the host for the figure
    let axis = d3.select(`#${axis_key}`)
    let height= parseInt(axis.attr("height"))-margin;
    let width= parseInt(axis.attr("width"));

    // in horizontal histogram chart, width is the number of elements in the bin
    // height is the bin number
    // Step 1 make y scale to use its ticks for the histogram
    let yScale= d3.scaleLinear()
        .domain(data_axis_pad(d3.extent(Values)))
        .range([height,margin])

    // step 2 get the histogram data
    let histogram = d3.histogram()
        .value(function(d) { return d })
        .domain(yScale.domain())
        .thresholds(yScale.ticks(bins_count+1));

    // step 3 use the data to calculate histogram bin values
    let bins = histogram(Values);
    // step 4, now that we have the  bins and their numbers we can make the xscale
    let xScale = d3.scaleLinear()
        .domain([0,d3.max(bins,function (d){return d.length})])
        .range([0,width])

    // now that we have the scales let us add the bars to the svg
    axis.selectAll('.bars')
        .data(bins)  // array of arrays (each array inside it is the values inside one bin)
        .enter()
        .append("g")        // add one group per bar, shift it to position of bar
        .attr("class","bars")
        .attr("transform",
            function(d,i) {
                return `translate(${0} ,${yScale(d.x1)} )`;
            })
        .append('rect') // width of the bar is equal to the length of elements in the bin
        .attr("width",
            function(d) {
                return xScale(d.length);
            })
        .attr("height", function(d) {
            // the bin spans from x0 to x1 on the y scale
            return Math.max(0, yScale(d.x0) - yScale(d.x1) - 1); })
        .style("fill", "#509ec8")

}