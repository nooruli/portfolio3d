import { useEffect, useRef, useState } from 'react';

export function useScrollReveal(options = { threshold: 0.15, rootMargin: '0px' }) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const currentRef = ref.current;
        if (!currentRef) return;

        const observer = new IntersectionObserver(([entry]) => {
            // Once it becomes visible, keep it visible
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(currentRef);
            }
        }, options);

        observer.observe(currentRef);

        return () => {
            if (currentRef) observer.unobserve(currentRef);
        };
    }, [options.threshold, options.rootMargin]);

    return [ref, isVisible];
}
