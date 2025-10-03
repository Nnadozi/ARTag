import { GLView } from "expo-gl";
import { Renderer } from "expo-three";
import React, { useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { PanGestureHandler, PinchGestureHandler, State } from "react-native-gesture-handler";
import * as THREE from "three";

export default function Feed() {
  const cubeMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const backgroundColorRef = useRef<string>('green');
  const [currentColorIndex, setCurrentColorIndex] = useState(0);

  // Rotation state
  const rotation = useRef({ x: 0, y: 0 });
  const lastRotation = useRef({ x: 0, y: 0 });

  // Scale state
  const scale = useRef(1);
  const lastScale = useRef(1);

  const colors = ['blue', 'red', 'green', 'yellow', 'purple', 'orange', 'pink'];

  const changeColor = () => {
    const nextIndex = (currentColorIndex + 1) % colors.length;
    setCurrentColorIndex(nextIndex);

    // Update the cube material color
    if (cubeMaterialRef.current) {
      cubeMaterialRef.current.color.set(colors[nextIndex]);
      backgroundColorRef.current = colors[Math.floor(Math.random() * colors.length)];
    }
  };

  // Pan gesture handler for rotation
  const onGestureEvent = (event: any) => {
    const { translationX, translationY, state } = event.nativeEvent;
    // Only update rotation while gesture is active
    if (state === State.ACTIVE) {
      rotation.current.y = lastRotation.current.y + translationX * 0.01;
      rotation.current.x = lastRotation.current.x + translationY * 0.01;
    }
    // When gesture ends, save last rotation
    if (state === State.END || state === State.CANCELLED || state === State.FAILED) {
      lastRotation.current.x = rotation.current.x;
      lastRotation.current.y = rotation.current.y;
    }
  };

  // Pinch gesture handler for scaling
  const onPinchEvent = (event: any) => {
    const { scale: gestureScale, state } = event.nativeEvent;
    // Update scale while pinching
    if (state === State.ACTIVE) {
      scale.current = lastScale.current * gestureScale;
    }
    // When pinch ends, save last scale
    if (state === State.END || state === State.CANCELLED || state === State.FAILED) {
      lastScale.current = scale.current;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <PinchGestureHandler onGestureEvent={onPinchEvent} onHandlerStateChange={onPinchEvent}>
        <PanGestureHandler onGestureEvent={onGestureEvent} onHandlerStateChange={onGestureEvent}>
          <View style={{ flex: 1 }}>
            {/* 3D GLView */}
            <GLView
            style={[StyleSheet.absoluteFillObject, { backgroundColor: backgroundColorRef.current }]}
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
              const cubeEdgeLength = 0.5;
              const geometry = new THREE.BoxGeometry(cubeEdgeLength, cubeEdgeLength, cubeEdgeLength);
              const material = new THREE.MeshStandardMaterial({ color: colors[0] });
              const cube = new THREE.Mesh(geometry, material);
              scene.add(cube);

              // Store material reference for color changes
              cubeMaterialRef.current = material;

              // Animate
              const render = () => {
                requestAnimationFrame(render);
                // Use rotation from gesture
                cube.rotation.x = rotation.current.x;
                cube.rotation.y = rotation.current.y;
                // Use scale from pinch gesture
                cube.scale.set(scale.current, scale.current, scale.current);
                renderer.render(scene, camera);
                gl.endFrameEXP();
              };
              render();
            }}
          />
          </View>
        </PanGestureHandler>
      </PinchGestureHandler>

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