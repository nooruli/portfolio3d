import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function ParticleGroup({ count, color, size, speedX, speedY }) {
    const pointsRef = useRef();

    const particlesPosition = useMemo(() => {
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 50;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5;
        }
        return positions;
    }, [count]);

    useFrame((state, delta) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y += delta * speedY;
            pointsRef.current.rotation.x += delta * speedX;
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particlesPosition.length / 3}
                    array={particlesPosition}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={size}
                color={color}
                sizeAttenuation={true}
                transparent={true}
                opacity={0.4}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

export function ParticleBackground() {
    return (
        <group>
            {/* Purple Ash */}
            <ParticleGroup count={500} color="#a855f7" size={0.04} speedX={0.02} speedY={0.03} />
            {/* Neon Green Ash */}
            <ParticleGroup count={300} color="#4ade80" size={0.05} speedX={-0.01} speedY={0.04} />
            {/* Indigo Ash */}
            <ParticleGroup count={200} color="#6366f1" size={0.03} speedX={0.01} speedY={-0.02} />
        </group>
    );
}
