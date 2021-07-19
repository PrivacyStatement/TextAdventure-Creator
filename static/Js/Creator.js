
var treeData = [
  {
    "name": "Top Level",
    "story": "dsjoigjfdoigjfoiofigoifjiohj",
    "children": [
      {
        "name": "Level 2: A",
        "story": "dsjoigjfdoigjfoiofigoifjiohj",
        "children": [
          {
            "name": "Son of A",
            "story": "dsjoigjfdoigjfoiofigoifjiohj",
          },
          {
            "name": "Daughter of A",
            "story": "dsjoigjfdoigjfoiofigoifjiohj",
          }
        ]
      },
      {
        "name": "Level 2: B",
        "story": "dsjoigjfdoigjfoiofigoifjiohj",
      }
    ]
  }
];


// ************** Generate the tree diagram	 *****************
var margin = {top: 20, right: 120, bottom: 20, left: 120},
	width = 500 - margin.right - margin.left;
	height = 500 - margin.top - margin.bottom;
	
var i = 0,
	duration = 750,
	root;

var tree = d3.layout.tree()
	.size([height, width]);

var diagonal = d3.svg.diagonal()
    .source(function(d) { return {"x":d.source.x, "y":(d.source.y)}; }) 
    .target(function(d) { return {"x":(d.target.x), "y":d.target.y - 200}; })
	.projection(function(d) { return [d.y + 200, d.x]; })

var elem = document.getElementById("para1");

console.log(elem)

var svg = div.append("svg")
	.attr("width", "100%")
	.attr("height", "calc(100% - 56px)")
    .append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")")

root = treeData[0];
root.x0 = height / 2;
root.y0 = 0;
  

update(root);

function update(source) {

  // Compute the new tree layout.
  var nodes = tree.nodes(root).reverse(),
	  links = tree.links(nodes);

  // Normalize for fixed-depth.
  nodes.forEach(function(d) { d.y = d.depth * 380; });

  // Update the nodes…
  var node = svg.selectAll("g.node")
	  .data(nodes, function(d) { return d.id || (d.id = ++i); });

  // Enter any new nodes at the parent's previous position.
  var nodeEnter = node.enter().append("g")
	  .attr("class", "node")
	  .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
	  .on("click", click);

  nodeEnter.append("rect")
	  .attr("width", 10)
      .attr("height", 100)
      .attr("transform", "translate(0,-50)")
      .attr("class", "rect_node")
      .style("fill", "#fff")
      .style("stroke", "#7B61FF")

   nodeEnter.append("text")
	  .attr("dy", ".35em")
      .attr("width", 160)
      .attr("height", 60)
      .attr("transform", " translate(20,0)")
	  .text(function(d) { return d.name + d.story; })
	  .style("fill-opacity", 1e-6);
      


  // Transition nodes to their new position.
  var nodeUpdate = node.transition()
	  .duration(duration)
	  .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

  nodeUpdate.select("rect")
    .attr("width", 200)
    .attr("height", 100)
    .attr("transform", "translate(0,-50)")
    .attr("class", "rect_node")
    .style("fill", "#fff")
    .style("stroke", "#7B61FF");

  nodeUpdate.select("text")
    .style("fill-opacity", 1);

  // Transition exiting nodes to the parent's new position.
  var nodeExit = node.exit().transition()
	  .duration(duration)
	  .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
	  .remove();

  nodeExit.select("rect")
       .style("fill-opacity", 1);

  nodeExit.select("text")
	  .style("fill-opacity", 1e-6);

  // Update the links…
  var link = svg.selectAll("path.link")
	  .data(links, function(d) { return d.target.id; });

  // Enter any new links at the parent's previous position.
  link.enter().insert("path", "g")
	  .attr("class", "link")
	  .attr("d", function(d) {
		var o = {x: source.x0 , y: source.y0};
		return diagonal({source: o, target: o});
	  });

  // Transition links to their new position.
  link.transition()
	  .duration(duration)
	  .attr("d", diagonal);

  // Transition exiting nodes to the parent's new position.
  link.exit().transition()
	  .duration(duration)
	  .attr("d", function(d) {
		var o = {x: source.x, y: source.y};
		return diagonal({source: o, target: o});
	  })
	  .remove();

  // Stash the old positions for transition.
  nodes.forEach(function(d) {
	d.x0 = d.x;
	d.y0 = d.y;
  });
}

// Toggle children on click.
function click(d) {
  if (d.children) {
	d._children = d.children;
	d.children = null;
  } else {
	d.children = d._children;
	d._children = null;
  }
  update(d);
}