# Logistics Routing Intelligence MVP (Python)

## Recommended architecture

- `data/ports_sample.csv`: offline starter dataset (UN/LOCODE-like keys, WPI-style attributes, OSM-ready coordinates).
- `logistics_intel/data_loader.py`: loader for port/location master data.
- `logistics_intel/graph_builder.py`: builds shipping-lane graph (nodes=ports, edges=lanes).
- `logistics_intel/pricing_engine.py`: calibrated container price estimation.
- `logistics_intel/risk_engine.py`: congestion + geopolitical + weather placeholder risk.
- `logistics_intel/routing_engine.py`: Dijkstra shortest path by selected objective (price, time, risk).
- `logistics_intel/integrations.py`: future adapters (MarineTraffic, Freightos, Drewry).
- `main.py`: runnable end-to-end example.

## Data strategy (MVP-friendly)

1. Bootstrap with static CSV snapshots from public data exports:
   - UN/LOCODE location codes (port/trade node identity)
   - World Port Index metadata (port classes/characteristics)
   - OpenStreetMap coordinates/enrichment for quality checks
2. Normalize to `PortNode` schema:
   - code, name, country, lat, lon, port_type, congestion, handling_fee
3. Use scheduled batch refreshes (daily/weekly), not expensive real-time APIs.

## Pricing calibration

Model:

`price = (base_rate_per_km * distance_km + handling_origin + handling_destination) * congestion_multiplier * geopolitical_multiplier`

Calibrated defaults in this MVP are chosen to keep typical ranges realistic:
- short regional: usually ~$500–$3,000
- long-haul Asia-Europe: usually ~$1,500–$12,000

Hard ceilings/floors prevent absurd outputs.

## Run

```bash
python3 python_mvp/main.py
```

## Scaling next

- Add lane-specific multipliers by container type (20ft/40ft/reefer/hazardous).
- Replace static weather placeholder with seasonal risk feed.
- Add confidence intervals (P50/P90) instead of single-point estimates.
- Add graph persistence (PostgreSQL + PostGIS + NetworkX or custom service).
