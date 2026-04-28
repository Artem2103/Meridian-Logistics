from __future__ import annotations

from dataclasses import dataclass, asdict
from typing import Dict


@dataclass(slots=True)
class PortNode:
    code: str
    name: str
    country: str
    lat: float
    lon: float
    port_type: str
    congestion: float
    handling_fee: float
    region: str

    def to_dict(self) -> Dict[str, object]:
        return asdict(self)


@dataclass(slots=True)
class Edge:
    origin: str
    destination: str
    distance_km: float
    transit_days: float
    estimated_price_usd: float
    risk_score: float
    lane_type: str = "ocean"

    def to_dict(self) -> Dict[str, object]:
        return asdict(self)
