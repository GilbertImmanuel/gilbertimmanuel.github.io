// Constellation data + graph helpers, ported from the mockup.
// Colors: gold = 201,168,106 ; ice = 158,198,232. alpha encodes distance (fainter = farther).

// Hero ambient constellations — 8 varied figures that dwell-fade in and out.
export const HERO_CONSTELLATIONS = [
  // Orion — large, near, lower-left
  { color: '201,168,106', w: 300, vbw: 130, vbh: 170, top: '44%', left: '2%', dur: 42, delay: -3, alpha: 0.5, sw: 1.0, dotR: 2.2,
    pts: [[30,28],[92,34],[58,82],[68,87],[78,92],[42,148],[104,142],[70,108]],
    edges: [[0,1],[0,2],[1,4],[2,3],[3,4],[2,5],[4,6],[3,7]] },
  // Big Dipper — medium, upper-right
  { color: '158,198,232', w: 250, vbw: 140, vbh: 80, top: '9%', left: '66%', dur: 49, delay: -17, alpha: 0.42, sw: 0.9, dotR: 1.9,
    pts: [[8,42],[40,48],[70,50],[98,44],[100,18],[128,14],[126,40]],
    edges: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,3]] },
  // Cassiopeia W — small, distant, upper-mid
  { color: '201,168,106', w: 132, vbw: 122, vbh: 56, top: '13%', left: '24%', dur: 53, delay: -31, alpha: 0.3, sw: 0.7, dotR: 1.3,
    pts: [[8,40],[35,12],[62,40],[90,14],[114,42]],
    edges: [[0,1],[1,2],[2,3],[3,4]] },
  // Summer Triangle — medium, mid-right
  { color: '158,198,232', w: 188, vbw: 100, vbh: 100, top: '55%', left: '75%', dur: 46, delay: -39, alpha: 0.38, sw: 0.85, dotR: 1.7,
    pts: [[12,20],[88,40],[46,92]],
    edges: [[0,1],[1,2],[2,0]] },
  // Cygnus cross — small, lower-left
  { color: '201,168,106', w: 120, vbw: 100, vbh: 120, top: '63%', left: '31%', dur: 51, delay: -45, alpha: 0.3, sw: 0.7, dotR: 1.3,
    pts: [[50,8],[50,112],[12,52],[88,48],[50,62]],
    edges: [[0,4],[4,1],[2,4],[4,3]] },
  // Lyra diamond — tiny, distant, upper-center
  { color: '158,198,232', w: 92, vbw: 70, vbh: 92, top: '30%', left: '47%', dur: 57, delay: -52, alpha: 0.24, sw: 0.6, dotR: 1.0,
    pts: [[35,8],[10,46],[35,84],[60,46]],
    edges: [[0,1],[1,2],[2,3],[3,0]] },
  // Pleiades cluster — tiny, distant, top-left corner (sparse)
  { color: '201,168,106', w: 96, vbw: 82, vbh: 62, top: '8%', left: '6%', dur: 61, delay: -12, alpha: 0.26, sw: 0.55, dotR: 1.1,
    pts: [[14,30],[34,16],[52,34],[68,20],[42,48],[60,52]],
    edges: [[1,2],[2,4]] },
]

// Projects navigator constellation. The first projects.length nodes are the project stars
// (6 today); the rest fill the figure. Nodes 0-5 are all edge-connected, so bfs() can always
// route a tracer between any two projects. Adding a 10th project needs new nodes + edges.
export const PROJECT_NODES = [
  [90, 118], [240, 150], [165, 330], [345, 275], [412, 398],
  [150, 222], [312, 116], [268, 392], [425, 192],
]
export const PROJECT_EDGES = [
  [0, 1], [0, 5], [5, 2], [1, 5], [1, 6], [6, 8], [1, 3],
  [3, 8], [2, 3], [2, 7], [3, 4], [7, 4], [3, 7],
]

// Shortest path between two nodes (drives the animated tracer between projects).
export function bfs(start, goal) {
  if (start === goal) return [start]
  const adj = Array.from({ length: PROJECT_NODES.length }, () => [])
  PROJECT_EDGES.forEach(([a, b]) => {
    adj[a].push(b)
    adj[b].push(a)
  })
  const queue = [start]
  const prev = { [start]: -1 }
  const seen = { [start]: true }
  while (queue.length) {
    const u = queue.shift()
    for (const v of adj[u]) {
      if (seen[v]) continue
      seen[v] = true
      prev[v] = u
      if (v === goal) {
        const path = [v]
        let c = u
        while (c !== -1) {
          path.unshift(c)
          c = prev[c]
        }
        return path
      }
      queue.push(v)
    }
  }
  return [start]
}
