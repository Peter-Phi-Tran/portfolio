import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Carousel = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const planesRef = useRef<THREE.Mesh[]>([]);
  const timeRef = useRef(0);
  const mouseYRef = useRef(0);

  const carouselItems = [
    { id: 1, title: 'Photography', color: '#667eea' },
    { id: 2, title: 'Development', color: '#f093fb' },
    { id: 3, title: 'Design', color: '#4facfe' },
    { id: 4, title: 'Art', color: '#43e97b' },
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const options = {
      speed: 30,
      gap: 95,
      curve: 2.5,
      direction: -1
    };

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      20
    );
    camera.position.z = 2;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Helper function
    const getWidth = (gap: number) => 1 + gap / 100;

    const getPlaneWidth = (el: HTMLElement, cam: THREE.PerspectiveCamera) => {
      const vFov = (cam.fov * Math.PI) / 180;
      const height = 2 * Math.tan(vFov / 2) * cam.position.z;
      const aspect = el.clientWidth / el.clientHeight;
      const width = height * aspect;
      return el.clientWidth / width;
    };

    // Geometry
    const geometry = new THREE.PlaneGeometry(1.6, 0.9, 20, 20); // 16:9 aspect ratio, smaller panels
    const planeSpace = getPlaneWidth(container, camera) * getWidth(options.gap);
    const totalImages = Math.ceil(container.clientWidth / planeSpace) + 1 + carouselItems.length;
    const initialOffset = Math.ceil(container.clientWidth / (2 * planeSpace) - 0.5);

    const allItems = [...carouselItems];
    for (let i = carouselItems.length; i < totalImages; i++) {
      allItems.push(carouselItems[i % carouselItems.length]);
    }

    // Create planes with curved shader
    allItems.forEach((item, i) => {
      const canvas = document.createElement('canvas');
      canvas.width = 1920; // 16:9 resolution
      canvas.height = 1080;
      const ctx = canvas.getContext('2d')!;
      
      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, 1920, 1080);
      gradient.addColorStop(0, item.color);
      gradient.addColorStop(1, item.color + '88');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 1920, 1080);
      
      // Add text
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 120px Work Sans';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(item.title, 960, 540);

      const texture = new THREE.CanvasTexture(canvas);

      const material = new THREE.ShaderMaterial({
        uniforms: {
          tex: { value: texture },
          curve: { value: options.curve }
        },
        vertexShader: `
          uniform float curve;
          varying vec2 vertexUV;
          void main(){
            vertexUV = uv;
            vec3 newPosition = position;
            float distanceFromCenter = abs((modelMatrix * vec4(position, 1.0)).x);
            newPosition.y *= 1.0 + (curve / 100.0) * pow(distanceFromCenter, 2.0);
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
          }
        `,
        fragmentShader: `
          uniform sampler2D tex;
          varying vec2 vertexUV;
          void main(){
            gl_FragColor = texture2D(tex, vertexUV);
          }
        `
      });

      const plane = new THREE.Mesh(geometry, material);
      plane.position.x = -1 * options.direction * (i - initialOffset) * getWidth(options.gap);
      scene.add(plane);
      planesRef.current.push(plane);
    });

    // Animation loop
    let previousTime = 0;
    const animate = (currentTime: number) => {
      const timePassed = currentTime - previousTime;

      if (Math.abs(scene.position.x) >= getWidth(options.gap) * carouselItems.length) {
        timeRef.current = 0;
      }
      timeRef.current += options.direction * timePassed * 0.00001;
      scene.position.x = timeRef.current * options.speed;

      // Apply mouse Y rotation to scene
      scene.rotation.x = mouseYRef.current * 0.15;

      renderer.render(scene, camera);
      previousTime = currentTime;
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      const centerY = window.innerHeight / 2;
      const mouseYRelative = (e.clientY - centerY) / window.innerHeight;
      mouseYRef.current = -mouseYRelative;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Resize handler
    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      planesRef.current.forEach(plane => {
        plane.geometry.dispose();
        if (plane.material instanceof THREE.Material) {
          plane.material.dispose();
        }
      });
    };
  }, []);

  return <div ref={containerRef} className="carousel-viewport" style={{ width: '100%', height: '100%' }} />;
};

export default Carousel;