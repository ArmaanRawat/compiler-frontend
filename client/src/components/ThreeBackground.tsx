import { useEffect, useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';

// Dynamically import Three.js to reduce initial bundle size
const loadThree = () => import('three');

export default function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<any>(null);
  const rendererRef = useRef<any>(null);
  const animationRef = useRef<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const initThreeScene = async () => {
      try {
        if (!mountRef.current) return;

        // Dynamically load Three.js
        const THREE = await loadThree();
        
        if (!isMounted) return;

        // Scene setup
        const scene = new THREE.Scene();
        sceneRef.current = scene;
        
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        rendererRef.current = renderer;
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0);
        mountRef.current.appendChild(renderer.domElement);

        // Create floating particles
        const particlesGeometry = new THREE.BufferGeometry();
        const particleCount = 2000;
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount * 3; i += 3) {
          // Positions
          positions[i] = (Math.random() - 0.5) * 20;
          positions[i + 1] = (Math.random() - 0.5) * 20;
          positions[i + 2] = (Math.random() - 0.5) * 20;

          // Colors - gradient from blue to purple
          const color = new THREE.Color();
          color.setHSL(0.6 + Math.random() * 0.2, 0.8, 0.5 + Math.random() * 0.3);
          colors[i] = color.r;
          colors[i + 1] = color.g;
          colors[i + 2] = color.b;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const particlesMaterial = new THREE.PointsMaterial({
          size: 0.02,
          vertexColors: true,
          transparent: true,
          opacity: 0.8,
          blending: THREE.AdditiveBlending
        });

        const particles = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particles);

        // Create geometric shapes
        const shapes: any[] = [];
        const geometries = [
          new THREE.OctahedronGeometry(0.3),
          new THREE.TetrahedronGeometry(0.4),
          new THREE.IcosahedronGeometry(0.35),
        ];

        for (let i = 0; i < 15; i++) {
          const geometry = geometries[Math.floor(Math.random() * geometries.length)];
          const material = new THREE.MeshBasicMaterial({
            color: new THREE.Color().setHSL(0.6 + Math.random() * 0.2, 0.7, 0.6),
            wireframe: true,
            transparent: true,
            opacity: 0.3
          });

          const shape = new THREE.Mesh(geometry, material);
          shape.position.set(
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10
          );
          
          // Random rotation
          shape.rotation.set(
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
          );
          
          shapes.push(shape);
          scene.add(shape);
        }

        camera.position.z = 5;

        // Animation loop
        const animate = () => {
          if (!isMounted) return;
          
          animationRef.current = requestAnimationFrame(animate);

          // Rotate particles
          particles.rotation.x += 0.001;
          particles.rotation.y += 0.002;

          // Animate shapes
          shapes.forEach((shape, index) => {
            shape.rotation.x += 0.01 + index * 0.001;
            shape.rotation.y += 0.01 + index * 0.001;
            
            // Floating motion
            shape.position.y += Math.sin(Date.now() * 0.001 + index) * 0.001;
          });

          // Mouse parallax effect
          const mouseX = (window.innerWidth / 2) * 0.001;
          const mouseY = (window.innerHeight / 2) * 0.001;
          
          camera.position.x += (mouseX - camera.position.x) * 0.05;
          camera.position.y += (-mouseY - camera.position.y) * 0.05;
          camera.lookAt(scene.position);

          renderer.render(scene, camera);
        };

        animate();

        // Handle resize
        const handleResize = () => {
          if (!renderer || !camera) return;
          
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);
        setIsLoading(false);

        // Cleanup function
        return () => {
          window.removeEventListener('resize', handleResize);
          if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
          }
          if (renderer && mountRef.current && renderer.domElement) {
            mountRef.current.removeChild(renderer.domElement);
            renderer.dispose();
          }
          // Clean up geometries and materials
          shapes.forEach(shape => {
            if (shape.geometry) shape.geometry.dispose();
            if (shape.material) shape.material.dispose();
          });
          if (particlesGeometry) particlesGeometry.dispose();
          if (particlesMaterial) particlesMaterial.dispose();
        };

      } catch (err) {
        console.error('Failed to load Three.js:', err);
        setError('Failed to load 3D background');
        setIsLoading(false);
      }
    };

    const cleanup = initThreeScene();

    return () => {
      isMounted = false;
      if (cleanup instanceof Promise) {
        cleanup.then(cleanupFn => cleanupFn && cleanupFn());
      }
    };
  }, []);

  if (error) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 -z-10">
        <div className="absolute inset-0 bg-black/20" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 -z-10">
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
          <div className="flex items-center space-x-2 text-white/60">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Loading 3D background...</span>
          </div>
        </div>
      )}
      <div 
        ref={mountRef} 
        className="w-full h-full"
        style={{ 
          background: isLoading ? 'transparent' : 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' 
        }}
      />
    </div>
  );
}