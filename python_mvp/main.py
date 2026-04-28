from __future__ import annotations

from pathlib import Path

from logistics_intel.data_loader import PortDataLoader
from logistics_intel.graph_builder import GraphBuilder
from logistics_intel.pricing_engine import PricingEngine
from logistics_intel.risk_engine import RiskEngine
from logistics_intel.routing_engine import RoutingEngine


def build_mvp():
    root = Path(__file__).resolve().parent
    loader = PortDataLoader(root / "data" / "ports_sample.csv")
    ports = loader.load_ports()

    graph = GraphBuilder(PricingEngine(base_rate_per_km=0.11), RiskEngine()).build(ports)
    router = RoutingEngine(graph)

    route, price = router.shortest_path("CNSHA", "NLRTM", weight="estimated_price_usd")
    _, transit_days = router.shortest_path("CNSHA", "NLRTM", weight="transit_days")
    _, route_risk = router.shortest_path("CNSHA", "NLRTM", weight="risk_score")

    return {
        "route": route,
        "estimated_price_usd": price,
        "estimated_transit_days": transit_days,
        "aggregate_risk_score": route_risk,
    }


if __name__ == "__main__":
    print(build_mvp())
