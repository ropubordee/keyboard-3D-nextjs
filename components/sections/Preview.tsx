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

        if(modelRef.current){
          scene.remove(modelRef.current)
        }

        const model = gltf.scene;
        model.scale.set(1, 1, 1);
        model.position.set(0, 0, -2);
        scene.add(model);

        modelRef.current = model

      });
    };

    loadModel(selectedProduct.modelSrc)

    camera.position.z = 5;

    renderer.setAnimationLoop(animate);
    renderer.render(scene, camera);

    function animate() {
      requestAnimationFrame(animate)
      renderer.render(scene, camera);
    }

    return ()=>{
      if(mount){
        mount.removeChild(renderer.domElement)
      }
    }


  },[selectedProduct]);
  return (
    <div
      ref={mountRef}
      className="w-full h-[400px] md:h-[800px] pt-8 md:pt-0"
    />
  );
};

export default Preview;
