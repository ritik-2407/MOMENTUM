"use client";

import LightRays from "@/components/LightRays";
import Silk from "@/components/Silk";

export default function StarBackground() {
  return (

<div style={{ width: '100%', height: '100%', position: 'absolute', zIndex: -1 }}>

<Silk
  speed={5}
  scale={0.9}
  color="#232324ff"
  noiseIntensity={1.5}
  rotation={0.3}
/>
</div>
  );
}