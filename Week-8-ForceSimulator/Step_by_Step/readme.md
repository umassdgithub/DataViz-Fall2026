# Step-by-step force simulations

Start a local HTTP server from `Week-8-ForceSimulator` as described in the
[parent guide](../README.md), then open the examples below.

1. [How ticks work](01_HowTickWorks/index.html): Stop the automatic timer,
   advance the simulation by 100 ticks, and call the rendering function explicitly.
   No forces are registered here; D3 initializes the node positions, and the
   rendering function separates the two colors visually.
2. [Collision](02_HowForceCollideWorks/index.html): Apply a collision force to
   keep node centers apart. This example uses a weak strength of 0.01, so overlaps
   can persist while the simulation runs. Display coordinates are scaled by two.
3. [Centering](03_HowForceCenterWorks/index.html): Center two independent
   simulations at different locations. A centering force translates positions
   to move their mean; it does not pull every node to one point.
4. [X and Y positioning](04_HowForceX_Y/index.html): Apply `forceY` to the blue
   nodes and `forceX` to the red nodes. Display coordinates are scaled by two.
5. [Many-body force](05_HowForceManyBody/index.html): Use a negative strength
   to repel nodes, together with a collision force. Positive strength attracts.
6. [Links](06_HowLinkWorks/index.html): Sample link endpoints from an exponential
   distribution, size nodes by incoming link count, and draw curved links.
   This sampling does not guarantee a power-law degree distribution.
7. [Force controls](07_Force_UI/index.html): Adjust charge strength, its minimum
   and maximum interaction distances, link distance, and collision radius.
   Controls reheat and restart the simulation. Distance bounds are clamped to
   keep the minimum at or below the maximum. Pan and zoom transform the graph
   inside its fixed SVG viewport.
8. [Random network generator](distributions/index.html): Generate JSON for nodes
   and links. Node groups use a binomial distribution; targets are sampled
   uniformly. The generator permits self-links and repeated links, and does not
   guarantee connectivity.

The animated examples update marks from automatic tick events. Several use
transitions to smooth the display; those transitions interpolate rendered
positions independently of the simulation's internal state.
