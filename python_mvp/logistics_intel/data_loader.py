from __future__ import annotations

import csv
from pathlib import Path
from typing import List

from .models import PortNode


class PortDataLoader:
    """Offline-first loader prepared for UN/LOCODE + World Port Index enriched tables."""

    def __init__(self, csv_path: str | Path):
        self.csv_path = Path(csv_path)

    def load_ports(self) -> List[PortNode]:
        ports: List[PortNode] = []
        with self.csv_path.open("r", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            for row in reader:
                ports.append(
                    PortNode(
                        code=row["code"],
                        name=row["name"],
                        country=row["country"],
                        lat=float(row["lat"]),
                        lon=float(row["lon"]),
                        port_type=row["port_type"],
                        congestion=float(row["congestion"]),
                        handling_fee=float(row["handling_fee"]),
                        region=row["region"],
                    )
                )
        return ports
