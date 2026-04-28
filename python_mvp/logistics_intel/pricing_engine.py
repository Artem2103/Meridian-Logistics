from __future__ import annotations

from .models import PortNode
from .risk_engine import RiskBreakdown


class PricingEngine:
    """
    Calibrated 40ft-container ocean pricing model.

    Formula:
    base_rate_per_km * distance_km + origin/destination handling + multipliers
    """

    def __init__(self, base_rate_per_km: float = 0.11):
        self.base_rate_per_km = base_rate_per_km

    def estimate_container_price(
        self,
        distance_km: float,
        origin: PortNode,
        destination: PortNode,
        risk: RiskBreakdown,
    ) -> float:
        base_freight = self.base_rate_per_km * distance_km
        fixed_fees = origin.handling_fee + destination.handling_fee

        congestion_multiplier = 1.0 + min(0.35, ((origin.congestion + destination.congestion) / 2) - 1.0)
        geopolitical_multiplier = 1.0 + min(0.25, risk.geopolitical)

        price = (base_freight + fixed_fees) * congestion_multiplier * geopolitical_multiplier

        # guardrails to keep MVP outputs realistic and avoid absurd spikes
        floor = 450.0
        ceiling = 12000.0 if distance_km < 18000 else 14500.0
        return round(max(floor, min(price, ceiling)), 2)
