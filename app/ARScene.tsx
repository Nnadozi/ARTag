import { ViroARImageMarker, ViroARScene, ViroARTrackingTargets, ViroBox, ViroText } from '@reactvision/react-viro';
import React from 'react';

export default function ARScene() {
    const handleImageRecognized = () => {
        console.log('Image marker detected!')
    }
    const handleImageUpdated = () => {
        console.log('Image marker updated!')
    }

    return (
      <ViroARScene>
        <ViroText color="green" position={[0, 0, -2]} text="First Scene" />
        <ViroARImageMarker 
          target={"targetOne"}
          onAnchorFound={handleImageRecognized}
          onAnchorUpdated={handleImageUpdated}
        >
          <ViroBox rotation={[-90, 0, 0]} position={[0, 0, 0]} scale={[.25, .25, .25]} />
        </ViroARImageMarker>
      </ViroARScene>
    )
}

//Very basic logic detection
ViroARTrackingTargets.createTargets({
  "targetOne": {
    source: require('../assets/logo.jpg'),
    orientation: "Up",
    physicalWidth: 0.45
  },
});
