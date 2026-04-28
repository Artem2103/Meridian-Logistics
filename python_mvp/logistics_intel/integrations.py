from __future__ import annotations


class FutureIntegrations:
    """Placeholders for optional data feeds. Keep adapter contract stable for MVP."""

    def marinetraffic_events(self, vessel_imo: str) -> dict:
        return {"enabled": False, "provider": "MarineTraffic", "vessel_imo": vessel_imo}

    def freightos_spot_index(self, lane_code: str) -> dict:
        return {"enabled": False, "provider": "Freightos", "lane": lane_code}

    def drewry_wci(self, route_name: str) -> dict:
        return {"enabled": False, "provider": "Drewry", "route": route_name}
