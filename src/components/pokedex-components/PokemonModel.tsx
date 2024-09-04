import React, { useRef, useEffect, useState, useCallback } from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

interface PokemonModelProps {
  jsonUrl: string
}

interface MinecraftGeometry {
  format_version: string
  minecraft_geometry: [{
    description: {
      identifier: string
      texture_width: number
      texture_height: number
      visible_bounds_width: number
      visible_bounds_height: number
      visible_bounds_offset: [number, number, number]
    }
    bones: MinecraftBone[]
  }]
}

interface MinecraftBone {
  name: string
  pivot: [number, number, number]
  rotation?: [number, number, number]
  cubes?: MinecraftCube[]
  parent?: string
}

interface MinecraftCube {
  origin: [number, number, number]
  size: [number, number, number]
  uv: [number, number]
  inflate?: number
  pivot?: [number, number, number]
  rotation?: [number, number, number]
  mirror?: boolean
}

function MinecraftModel({ jsonUrl }: PokemonModelProps) {
  const { scene, camera, gl } = useThree()
  const groupRef = useRef<THREE.Group>(new THREE.Group())
  const [modelLoaded, setModelLoaded] = useState(false)

  const loadModel = useCallback(() => {
    console.log("Attempting to load:", jsonUrl);
    const loader = new THREE.FileLoader();
    loader.load(
      jsonUrl,
      (data) => {
        console.log("File loaded successfully");
        let jsonData: MinecraftGeometry;
        try {
          jsonData = JSON.parse(data as string) as MinecraftGeometry;
          console.log("Parsed JSON data:", jsonData);
        } catch (error) {
          console.error("Error parsing JSON:", error);
          return;
        }

        if (!jsonData || !jsonData.minecraft_geometry || !Array.isArray(jsonData.minecraft_geometry) || jsonData.minecraft_geometry.length) {
          console.error("Invalid JSON structure", jsonData);
          return;
        }

        const geometry = jsonData.minecraft_geometry[0]
        console.log("Geometry data:", geometry);

        const material = new THREE.MeshStandardMaterial({ 
          color: 0x00ff00, 
          flatShading: true,
          side: THREE.DoubleSide
        })

        const boneMap = new Map<string, THREE.Group>()

        geometry.bones.forEach((bone: MinecraftBone) => {
          console.log("Processing bone:", bone);
          const boneGroup = new THREE.Group()
          boneGroup.position.set(...bone.pivot)
          if (bone.rotation) {
            boneGroup.rotation.set(
              THREE.MathUtils.degToRad(bone.rotation[0]),
              THREE.MathUtils.degToRad(bone.rotation[1]),
              THREE.MathUtils.degToRad(bone.rotation[2])
            )
          }
          boneMap.set(bone.name, boneGroup)

          if (bone.parent) {
            const parentBone = boneMap.get(bone.parent)
            if (parentBone) {
              parentBone.add(boneGroup)
            } else {
              console.warn(`Parent bone ${bone.parent} not found for ${bone.name}`)
            }
          } else {
            groupRef.current.add(boneGroup)
          }

          if (bone.cubes) {
            bone.cubes.forEach((cube: MinecraftCube) => {
              console.log("Creating cube:", cube);
              const [x, y, z] = cube.origin
              const [width, height, depth] = cube.size
              const boxGeometry = new THREE.BoxGeometry(width, height, depth)
              
              if (cube.pivot) {
                const [px, py, pz] = cube.pivot
                boxGeometry.translate(px - x - width/2, py - y - height/2, pz - z - depth/2)
              } else {
                boxGeometry.translate(width/2, height/2, depth/2)
              }

              if (cube.rotation) {
                const [rx, ry, rz] = cube.rotation
                boxGeometry.rotateX(THREE.MathUtils.degToRad(rx))
                boxGeometry.rotateY(THREE.MathUtils.degToRad(ry))
                boxGeometry.rotateZ(THREE.MathUtils.degToRad(rz))
              }

              const mesh = new THREE.Mesh(boxGeometry, material)
              mesh.position.set(x, y, z)

              if (cube.inflate) {
                mesh.scale.addScalar(cube.inflate)
              }

              boneGroup.add(mesh)
            })
          }
        })

        scene.add(groupRef.current)
        setModelLoaded(true)

        // Center and scale the model
        const box = new THREE.Box3().setFromObject(groupRef.current)
        const center = box.getCenter(new THREE.Vector3())
        const size = box.getSize(new THREE.Vector3())
        const maxDim = Math.max(size.x, size.y, size.z)
        const scale = 2 / maxDim
        groupRef.current.scale.setScalar(scale)
        groupRef.current.position.sub(center.multiplyScalar(scale))

        // Adjust camera position
        camera.position.set(0, 0, 5)
        camera.lookAt(0, 0, 0)
      },
      undefined,
      (error) => {
        console.error("Error loading JSON file:", error);
      }
    );
  }, [jsonUrl, scene, camera]);

  useEffect(() => {
    loadModel();

    const handleContextLost = (event: WebGLContextEvent) => {
      event.preventDefault();
      console.log("WebGL context lost. Trying to restore...");
      setModelLoaded(false);
    };

    const handleContextRestored = () => {
      console.log("WebGL context restored. Reloading model...");
      loadModel();
    };

    gl.domElement.addEventListener('webglcontextlost', handleContextLost as EventListener, false);
    gl.domElement.addEventListener('webglcontextrestored', handleContextRestored, false);

    return () => {
      scene.remove(groupRef.current);
      gl.domElement.removeEventListener('webglcontextlost', handleContextLost as EventListener);
      gl.domElement.removeEventListener('webglcontextrestored', handleContextRestored);
    };
  }, [loadModel, scene, gl.domElement]);

  useFrame(() => {
    if (groupRef.current && modelLoaded) {
      groupRef.current.rotation.y += 0.01
    }
  })

  return null
}

export function PokemonModel({ jsonUrl }: PokemonModelProps) {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <MinecraftModel jsonUrl={jsonUrl} />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  )
}