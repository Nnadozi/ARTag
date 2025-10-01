import { GLView } from "expo-gl";
import { Renderer } from "expo-three";
import React, { useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as THREE from "three";

export default function Index() {
  const cubeMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  
  const colors = ['blue', 'red', 'green', 'yellow', 'purple', 'orange', 'pink'];

  const changeColor = () => {
    const nextIndex = (currentColorIndex + 1) % colors.length;
    setCurrentColorIndex(nextIndex);
    
    // Update the cube material color
    if (cubeMaterialRef.current) {
      cubeMaterialRef.current.color.set(colors[nextIndex]);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* 3D GLView */}
      <GLView
        style={[StyleSheet.absoluteFillObject, { backgroundColor: 'green' }]}
        onContextCreate={async (gl) => {
          const { drawingBufferWidth: width, drawingBufferHeight: height } = gl as any;
          const renderer = new Renderer({ gl, alpha: true }) as any;
          renderer.setSize(width, height);
          // Create 3D scene
          const scene = new THREE.Scene();

          // Add camera
          const camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 1000);
          camera.position.z = 2;

          // Add light
          const light = new THREE.DirectionalLight(0xffffff, 1);
          light.position.set(0, 0, 2).normalize();
          scene.add(light);

          // Add cube
          const cubeEdgeLength = 1;
          const geometry = new THREE.BoxGeometry(cubeEdgeLength, cubeEdgeLength, cubeEdgeLength);
          const material = new THREE.MeshStandardMaterial({ color: colors[0] });
          const cube = new THREE.Mesh(geometry, material);
          scene.add(cube);
          
          // Store material reference for color changes
          cubeMaterialRef.current = material;

          // Animate
          const render = () => {
            const randomAngle = Math.random() * 0.1;
            requestAnimationFrame(render);
            cube.rotation.x += randomAngle;
            cube.rotation.y += randomAngle;
            cube.rotation.z += randomAngle;
            renderer.render(scene, camera);
            gl.endFrameEXP();
          };
          render();
        }}
      />
      
      {/* Color Change Button */}
      <TouchableOpacity style={styles.button} onPress={changeColor}>
        <Text>Change Color ({colors[currentColorIndex]})</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    backgroundColor: '#007AFF',
    padding:20,
    borderRadius:100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});

/* PURPOSE OF EACH PACKAGE 
expo-gl: Creates a raw OpenGL canvas (<GLView>) inside your React Native app — this is where your 3D scene 
will be drawn. Think of it as the “window” into your 3D world. OpenGL is an API for rendering 2D and 3D vector graphics.

three: Provides all the 3D building blocks: scenes, cameras, meshes, lights, geometry, and rendering logic. 
Without this, we would have to write WebGL shaders manually.

expo-three: Bridges three with expo-gl — for example, it creates a Renderer that can talk to the GLView. 
It also simplifies loading textures, 3D models, and lights.

*/