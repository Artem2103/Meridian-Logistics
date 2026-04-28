from __future__ import annotations

from collections import defaultdict
from typing import Dict, Iterable, List

from .geo import haversine_km
from .models import Edge, PortNode
from .pricing_engine import PricingEngine
from .risk_engine import RiskEngine

# curated lanes (conceptually from observed corridors in WPI + carrier schedules)
CORE_LANES = [
    ("SGSIN", "CNSHA"), ("SGSIN", "INNSA"), ("SGSIN", "AEDXB"), ("SGSIN", "EGSUZ"),
    ("EGSUZ", "NLRTM"), ("EGSUZ", "ESALG"), ("ESALG", "NLRTM"), ("NLRTM", "USNYC"),
    ("USNYC", "USSAV"), ("USLAX", "USLGB"), ("CNSHA", "USLAX"), ("CNSHA", "KRPUS"),
    ("KRPUS", "JPYOK"), ("MAPTM", "ESALG"), ("MAPTM", "NLRTM"), ("BRSSZ", "USNYC"),
    ("BRSSZ", "MXVER"), ("PAONX", "USNYC"), ("PAONX", "USLAX"), ("AUSYD", "SGSIN"),
    ("AUSYD", "AUMEL"), ("AUMEL", "NZAKL"), ("THLCH", "VNSGN"), ("MYPKG", "SGSIN"),
    ("HKHKG", "SGSIN"), ("CNNGB", "CNSHA"), ("ZADUR", "EGSUZ"), ("ZADUR", "SGSIN"),
]


class GraphBuilder:
    def __init__(self, pricing_engine: PricingEngine, risk_engine: RiskEngine):
        self.pricing_engine = pricing_engine
        self.risk_engine = risk_engine

    def build(self, ports: Iterable[PortNode]) -> Dict[str, List[Edge]]:
        port_map = {p.code: p for p in ports}
        graph: Dict[str, List[Edge]] = defaultdict(list)

        for a_code, b_code in CORE_LANES:
            if a_code not in port_map or b_code not in port_map:
                continue

            a = port_map[a_code]
            b = port_map[b_code]
            distance = haversine_km(a.lat, a.lon, b.lat, b.lon)
            transit_days = distance / 700.0 + 1.2
            risk = self.risk_engine.edge_risk(a, b)
            price = self.pricing_engine.estimate_container_price(distance, a, b, risk)

            edge_ab = Edge(a.code, b.code, round(distance, 1), round(transit_days, 1), price, round(risk.total, 3))
            edge_ba = Edge(b.code, a.code, round(distance, 1), round(transit_days, 1), price, round(risk.total, 3))
            graph[a.code].append(edge_ab)
            graph[b.code].append(edge_ba)

        return graph
