import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

export function CursorFollower() {
    const sphereRef = useRef();

    useFrame(({ pointer, viewport }) => {
        if (sphereRef.current) {
            // Map pointer coordinates (range -1 to 1) to viewport coordinates
            const targetX = (pointer.x * viewport.width) / 2;
            const targetY = (pointer.y * viewport.height) / 2;

            // Interpolate for smooth trailing effect
            sphereRef.current.position.x = THREE.MathUtils.lerp(sphereRef.current.position.x, targetX, 0.1);
            sphereRef.current.position.y = THREE.MathUtils.lerp(sphereRef.current.position.y, targetY, 0.1);

            // Gentle rotation continuously
            sphereRef.current.rotation.x += 0.01;
            sphereRef.current.rotation.y += 0.005;
        }
    });

    return (
        <Sphere ref={sphereRef} args={[0.4, 64, 64]} position={[0, 0, -2]}>
            <MeshDistortMaterial
                color="#0ea5e9" /* Tailwind sky-500 */
                envMapIntensity={2}
                clearcoat={1}
                clearcoatRoughness={0.1}
                metalness={0.9}
                roughness={0.1}
                distort={0.5}
                speed={3}
            />
        </Sphere>
    );
}
