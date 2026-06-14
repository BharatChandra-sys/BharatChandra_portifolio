import { BlogPost } from '../components/BlogPost';

export const metadata = {
  title: "How I built CAN-7USAT rocket telemetry with sub-5ms latency — Bharat Chandra",
  description: "Bharat Chandra explains the real-time ground control station built for GARI's IN-SPACe rocketry competition — 46-byte binary telemetry packets, Kalman filter sensor fusion, and WebSocket broadcasting under 5ms.",
  keywords: "Bharat Chandra, CAN-7USAT, rocket telemetry, GARI GITAM, IN-SPACe rocketry, FastAPI WebSocket",
  openGraph: {
    title: "CAN-7USAT Rocket Telemetry — Bharat Chandra",
    description: "How I built a sub-5ms rocket telemetry pipeline for IN-SPACe competition.",
    url: "https://bharatchandra.me/blog/can-7usat-rocket-telemetry",
  },
};

const content = `
I'm Bharat Chandra, and this is the story of building the ground control station for CAN-7USAT — GITAM University's rocket entry in the IN-SPACe Model Rocketry Competition 2026.

## The constraint that drove everything

The rocket would be in the air for under two minutes. The flight computer — a Teensy 4.1 — would transmit 46-byte binary packets over a 900 MHz XBee radio link. We needed the ground station to receive, decode, fuse, and display that data fast enough that if something went wrong during flight, the team would know immediately.

Our original target was 15ms end-to-end. We hit under 5ms. Here's how.

## The packet structure

Each packet was 46 bytes:

- 1 byte sync marker
- 4 bytes timestamp (uint32)
- 1 byte flight state (0–5)
- 4 bytes altitude (float)
- 4 bytes vertical velocity (float)
- 16 bytes quaternion W/X/Y/Z (4 floats)
- 8 bytes GPS lat/long (2 floats)
- 1 byte XOR checksum

The XOR checksum was the first thing I validated. Any corrupted packet got dropped immediately — we had 23/23 tests passing with 0% packet loss.

## The state machine

Six states: PRE-FLIGHT → BOOST → COAST → APOGEE → DESCENT → LANDED.

Each state transition triggered different data visualizations on the dashboard. During BOOST, we prioritized altitude and acceleration. During DESCENT, we switched to GPS tracking. The state machine was the backbone of the whole system.

## Kalman filter for sensor fusion

Raw accelerometer + barometer data is noisy. I implemented a simple 1D Kalman filter to fuse altitude estimates from both sensors. The result was a smooth altitude curve that we could actually trust for decision-making.

The filter ran in under 0.2ms per packet — well within budget.

## WebSocket broadcasting

I used FastAPI with Uvicorn and asyncio to handle the serial port reads and WebSocket broadcasts concurrently. The React dashboard connected over WebSocket and received state updates in under 1ms from the moment the backend processed them.

## The actual numbers

- End-to-end latency: <5ms (target was 15ms)
- Packet decode time: 0.5ms
- WebSocket broadcast: 1ms
- Packet loss: 0% (23/23 tests passing)

## What I'd do differently

The checksum was basic. For a production system I'd use CRC-16. Also, the Kalman filter assumed constant process noise — a more sophisticated model would adapt during BOOST vs COAST.

But for competition day, it worked exactly as needed.

— Bharat Chandra, GITAM University Hyderabad
`;

export default function Page() {
  return (
    <BlogPost
      title="How I built CAN-7USAT rocket telemetry with sub-5ms latency"
      date="June 2026"
      tags={["Rocketry", "FastAPI", "WebSockets", "Kalman Filter", "Python"]}
      github="https://github.com/BharatChandra-sys/CAN-7USAT-Ground-Control-Backend"
      content={content}
    />
  );
}
