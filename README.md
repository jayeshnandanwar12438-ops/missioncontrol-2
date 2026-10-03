<<<<<<< HEAD
# Mission Control: Build. Launch. Survive.

Design an Earth-observation satellite, choose a launch vehicle and orbit, then survive 12 months of mission events.

## Run it
1. Install Node.js 16 or newer from https://nodejs.org
2. In this folder run: `npm start`  (or `node server.js`)
3. Open http://localhost:3000

No `npm install` is needed: the backend has zero dependencies.

## Structure
- `public/index.html`: frontend (spherical Earth with real continents and cloud layer, real ground stations, ISS and Moon, radio link budget with band and modulation choices, live I/Q constellation and carrier waveform, budget finalization and spacecraft styling, launch animation, meteoroid defense mini-game, simulation engine)
- `server.js`: backend (serves the frontend, `GET /api/leaderboard`, `POST /api/results`)
- `data/results.json`: leaderboard storage (created automatically)

## Share it
- Play alone or on a local network: run `npm start` and share `http://<your-ip>:3000`.
- Host online: deploy this folder to Render, Railway or Fly.io with start command `npm start` (the port is read from `PORT`).
- Frontend and backend separately: the frontend calls the backend at the same address it was loaded from. If you open `public/index.html` directly as a file, it talks to `http://localhost:3000`, so run `npm start` first. To point it at another server, add `?api=http://your-server:3000` to the page address. The backend allows cross-origin requests, so the two can live on different hosts.

## What's new
- 7 launch vehicles (Micro-L to Colossus-X) with different payload, cost and reliability.
- Spacecraft vehicle choice: Micro-sat, Standard bus, Heavy bus.
- Fuel tank choice in the build GUI: the propellant slider maximum grows with the tank (150 to 800 kg).

## Next steps
Moon/Mars missions, a 3D orbit view (React Three Fiber), accounts (Supabase), an AI mission advisor.
=======
# missioncontrol-2
Mission Control: Build. Launch. Survive.  Design an Earth-observation satellite, choose a launch vehicle and orbit, then survive 12 months of mission events.  ## Run it 1. Install Node.js 16 or newer from https://nodejs.org 2. In this folder run: `npm start`  (or `node server.js`) 3. Open http://localhost:3000  
>>>>>>> 74b3ea4ddcfcfe4ba8309250922f7112b15ea70a
