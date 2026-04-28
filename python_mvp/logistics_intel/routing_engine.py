from __future__ import annotations

import heapq
from typing import Dict, List, Tuple

from .models import Edge


class RoutingEngine:
    def __init__(self, graph: Dict[str, List[Edge]]):
        self.graph = graph

    def shortest_path(self, origin_code: str, destination_code: str, weight: str = "estimated_price_usd") -> Tuple[List[str], float]:
        queue: List[Tuple[float, str, List[str]]] = [(0.0, origin_code, [origin_code])]
        visited: Dict[str, float] = {}

        while queue:
            cost, node, path = heapq.heappop(queue)

            if node == destination_code:
                return path, round(cost, 2)
            if node in visited and visited[node] <= cost:
                continue

            visited[node] = cost

            for edge in self.graph.get(node, []):
                edge_cost = getattr(edge, weight)
                heapq.heappush(queue, (cost + edge_cost, edge.destination, [*path, edge.destination]))

        return [], float("inf")
