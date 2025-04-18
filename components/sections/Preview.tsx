import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { ProducType } from "./Catalog";

interface PreviewProps {
  selectedProduct: ProducType;
}

const Preview = ({ selectedProduct }: PreviewProps) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const modelRef = useRef<THREE.Object3D | null>(null);

  const isMouseDownRef = useRef<boolean>(false);
  const isTouchDownRef = useRef<boolean>(false);
  const touchStartXref = useRef<number>(0);
  const touchStarRotationRef = useRef<number>(0);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || !selectedProduct) return;

    const loader = new GLTFLoader();

    const scene = new THREE.Scene();
    const containerWidth = mount.clientWidth;
    const sceneWidth = containerWidth <= 1536 ? containerWidth : 1536;
    const scenHeight =
      window.innerWidth <= window.innerHeight
        ? window.innerWidth
        : window.innerHeight;

    scene.rotation.x = THREE.MathUtils.degToRad(60);

    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(sceneWidth, scenHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(
      75,
      sceneWidth / scenHeight,
      0.1,
      1000
    );

    const ambientight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientight);

    const directionalLigtTop = new THREE.DirectionalLight(0xffffff, 1);
    directionalLigtTop.position.set(5, 10, 7.5);
    scene.add(directionalLigtTop);

    const directionalLigtLeft = new THREE.DirectionalLight(0xffffff, 1);
    directionalLigtLeft.position.set(-10, 5, 0);
    scene.add(directionalLigtLeft);

    const directionalLigtRight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLigtRight.position.set(10, 5, 0);
    scene.add(directionalLigtRight);

    const loadModel = (modelSrc: string) => {
      loader.load(modelSrc, (gltf) => {
        if (modelRef.current) {
          scene.remove(modelRef.current);
        }

        const model = gltf.scene;
        model.scale.set(1, 1, 1);
        model.position.set(0, 12, -2);
        scene.add(model);

        modelRef.current = model;
      });
    };

    loadModel(selectedProduct.modelSrc);

    camera.position.z = 5;

    const gravity = 0.002;
    const bouncefactor = 0.3;
    const groundY = 0;
    let velocityY = 0;
    let isBouncing = false;

    renderer.setAnimationLoop(animate);
    renderer.render(scene, camera);

    function animate() {
      requestAnimationFrame(animate);

      if (modelRef.current) {
        velocityY -= gravity;
        modelRef.current.position.y += velocityY;

        if (modelRef.current.position.y <= gravity) {
          modelRef.current.position.y = groundY;
          velocityY *= -bouncefactor;
          isBouncing = true;
        } else {
          isBouncing = false;
        }
        if (Math.abs(velocityY) < 0.01 && isBouncing) {
          velocityY = 0;
        }
      }

      renderer.render(scene, camera);
    }
    animate();

    const handleMouseMove = (event: MouseEvent) => {
      if (modelRef.current && isMouseDownRef.current) {
        const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        modelRef.current.rotation.y = mouseX * Math.PI;
      }
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (modelRef.current && isTouchDownRef.current) {
        const touchX = event.touches[0].clientX;
        const deltaX = touchX - touchStartXref.current;
        modelRef.current.rotation.y =
          touchStarRotationRef.current + deltaX * 0.01;
      }
    };

    const handleTouchStart = (event: TouchEvent) => {
      if (modelRef.current) {
        isTouchDownRef.current = true;
        touchStartXref.current = event.touches[0].clientX;
        touchStarRotationRef.current = modelRef.current.rotation.y;
      }
    };

    const handleTouchEnd = () => {
      isTouchDownRef.current = false;
    };

    const handleMouseDown = () => {
      isMouseDownRef.current = true;
    };

    const handleInteractionEnd = () => {
      isMouseDownRef.current = false;
      const animateRotationBack = () => {
        if (modelRef.current) {
          const modelRotation = modelRef.current.rotation.y;
          if (Math.abs(modelRotation) > 0.01) {
            modelRef.current.rotation.y -= modelRotation * 0.01;
            requestAnimationFrame(animateRotationBack);
          } else {
            modelRef.current.rotation.y = 0;
          }
        }
      };

      animateRotationBack();
    };

    mount.addEventListener("mousemove", handleMouseMove);
    mount.addEventListener("mousedown", handleMouseDown);
    mount.addEventListener("mouseup", handleInteractionEnd);
    mount.addEventListener("mouseleave", handleInteractionEnd);

    mount.addEventListener("touchstart", handleTouchStart);
    mount.addEventListener("touchmove", handleTouchMove);
    mount.addEventListener("touchend", handleTouchEnd);

    return () => {
      if (mount) {
        mount.removeChild(renderer.domElement);
      }
      mount.removeEventListener("mousemove", handleMouseMove);
      mount.removeEventListener("mousedown", handleMouseDown);
      mount.removeEventListener("mouseup", handleInteractionEnd);
      mount.removeEventListener("mouseleave", handleInteractionEnd);

      mount.removeEventListener("touchstart", handleTouchStart);
      mount.removeEventListener("touchmove", handleTouchMove);
      mount.removeEventListener("touchend", handleTouchEnd);
    };
  }, [selectedProduct]);
  return (
    <div
      ref={mountRef}
      className="w-full h-[400px] md:h-[800px] pt-8 md:pt-0"
    />
  );
};

export default Preview;
