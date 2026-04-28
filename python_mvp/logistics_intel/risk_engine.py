from __future__ import annotations

from dataclasses import dataclass

from .models import PortNode


@dataclass(slots=True)
class RiskBreakdown:
    congestion: float
    geopolitical: float
    weather: float

    @property
    def total(self) -> float:
        return min(1.0, self.congestion + self.geopolitical + self.weather)


RED_SEA_PORT_CODES = {"EGSUZ", "SADMM"}
HIGH_RISK_REGIONS = {"Middle East"}


class RiskEngine:
    def edge_risk(self, origin: PortNode, destination: PortNode) -> RiskBreakdown:
        avg_congestion = max(0.0, ((origin.congestion + destination.congestion) / 2) - 1.0)
        congestion_risk = min(0.25, avg_congestion)

        geopolitical = 0.05
        if origin.code in RED_SEA_PORT_CODES or destination.code in RED_SEA_PORT_CODES:
            geopolitical += 0.20
        if origin.region in HIGH_RISK_REGIONS or destination.region in HIGH_RISK_REGIONS:
            geopolitical += 0.06

        weather = 0.04  # placeholder to be replaced with seasonal weather APIs
        return RiskBreakdown(congestion=congestion_risk, geopolitical=geopolitical, weather=weather)
