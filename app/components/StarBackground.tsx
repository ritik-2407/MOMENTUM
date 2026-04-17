"use client";

import Silk from "@/components/Silk";

export default function StarBackground() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Silk
        speed={5}
        scale={0.9}
        color="#232324ff"
        noiseIntensity={1.4}
        rotation={0.3}
      />
    </div>
  );
}