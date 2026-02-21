import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function CursorCompanion() {
    const lightRef = useRef();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useFrame(({ pointer, viewport }) => {
        if (isMobile || !lightRef.current) return;
        const targetX = (pointer.x * viewport.width) / 2;
        const targetY = (pointer.y * viewport.height) / 2;
        lightRef.current.position.x = THREE.MathUtils.lerp(lightRef.current.position.x, targetX, 0.4);
        lightRef.current.position.y = THREE.MathUtils.lerp(lightRef.current.position.y, targetY, 0.4);
    });

    if (isMobile) return null;

    return (
        <group ref={lightRef} position={[0, 0, 1]}>
            <spotLight distance={10} intensity={6} color="#a855f7" decay={2} angle={1.5} penumbra={1} position={[0, 0, 5]} />
            <pointLight distance={4} intensity={1.5} color="#818cf8" decay={2} />
        </group>
    );
}
