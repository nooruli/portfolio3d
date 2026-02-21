import React, { useRef } from 'react';
import { useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { CursorFollower } from './CursorFollower';

export default function Scene() {
    const groupRef = useRef();

    return (
        <group ref={groupRef}>
            <ambientLight intensity={0.4} />
            <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
            <pointLight position={[-10, -10, -5]} intensity={0.5} color="#3b82f6" />

            <CursorFollower />
        </group>
    );
}
