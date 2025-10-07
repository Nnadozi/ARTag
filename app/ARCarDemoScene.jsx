import {
    Viro3DObject,
    ViroAnimations,
    ViroARImageMarker,
    ViroARScene,
    ViroARTrackingTargets,
    ViroLightingEnvironment,
    ViroMaterials,
    ViroNode,
    ViroQuad,
    ViroSphere,
    ViroSpotLight,
} from '@reactvision/react-viro'
import React, { useEffect, useState } from 'react'

const ARCarDemoScene = () => {
  const [texture, setTexture] = useState('white')
  const [animName, setAnimName] = useState('scaleUp')
  const [playAnim, setPlayAnim] = useState(false)
  const [animateCar, setAnimateCar] = useState(false)

  const [tap, setTap] = useState({ white: false, blue: false, grey: false, red: false, yellow: false })

  const resetTaps = () => setTap({ white: false, blue: false, grey: false, red: false, yellow: false })

  const toggleButtons = () => {
    setAnimName(animName === 'scaleUp' ? 'scaleDown' : 'scaleUp')
    setPlayAnim(true)
  }

  // 👇 Register materials/targets/animations only once AFTER mount
  
  useEffect(() => {
    console.log("BaseColor require:", require('../assets/tesla/object_car_main_Base_Color.png'));

    ViroMaterials.createMaterials({
      white: {
        lightingModel: 'PBR',
        diffuseTexture: require('../assets/tesla/object_car_main_Base_Color.png'),
        metalnessTexture: require('../assets/tesla/object_car_main_Metallic.png'),
        roughnessTexture: require('../assets/tesla/object_car_main_Roughness.png'),
      },
      blue: {
        lightingModel: 'PBR',
        diffuseTexture: require('../assets/tesla/object_car_main_Base_Color_blue.png'),
        metalnessTexture: require('../assets/tesla/object_car_main_Metallic.png'),
        roughnessTexture: require('../assets/tesla/object_car_main_Roughness.png'),
      },
      grey: {
        lightingModel: 'PBR',
        diffuseTexture: require('../assets/tesla/object_car_main_Base_Color_grey.png'),
        metalnessTexture: require('../assets/tesla/object_car_main_Metallic.png'),
        roughnessTexture: require('../assets/tesla/object_car_main_Roughness.png'),
      },
      red: {
        lightingModel: 'PBR',
        diffuseTexture: require('../assets/tesla/object_car_main_Base_Color_red.png'),
        metalnessTexture: require('../assets/tesla/object_car_main_Metallic.png'),
        roughnessTexture: require('../assets/tesla/object_car_main_Roughness.png'),
      },
      yellow: {
        lightingModel: 'PBR',
        diffuseTexture: require('../assets/tesla/object_car_main_Base_Color_yellow.png'),
        metalnessTexture: require('../assets/tesla/object_car_main_Metallic.png'),
        roughnessTexture: require('../assets/tesla/object_car_main_Roughness.png'),
      },
      white_sphere: { lightingModel: 'PBR', diffuseColor: 'rgb(231,231,231)' },
      blue_sphere: { lightingModel: 'PBR', diffuseColor: 'rgb(19,42,143)' },
      grey_sphere: { lightingModel: 'PBR', diffuseColor: 'rgb(75,76,79)' },
      red_sphere: { lightingModel: 'PBR', diffuseColor: 'rgb(168,0,0)' },
      yellow_sphere: { lightingModel: 'PBR', diffuseColor: 'rgb(200,142,31)' },
    })

    ViroARTrackingTargets.createTargets({
      logo: {
        source: require('../assets/logo.png'),
        orientation: 'Up',
        physicalWidth: 0.165,
      },
    })

    ViroAnimations.registerAnimations({
      scaleUp: { properties: { scaleX: 1, scaleY: 1, scaleZ: 1 }, duration: 500, easing: 'bounce' },
      scaleDown: { properties: { scaleX: 0, scaleY: 0, scaleZ: 0 }, duration: 200 },
      scaleCar: { properties: { scaleX: 0.09, scaleY: 0.09, scaleZ: 0.09 }, duration: 500, easing: 'bounce' },
      scaleSphereUp: { properties: { scaleX: 0.8, scaleY: 0.8, scaleZ: 0.8 }, duration: 50, easing: 'easeineaseout' },
      scaleSphereDown: { properties: { scaleX: 1, scaleY: 1, scaleZ: 1 }, duration: 50, easing: 'easeineaseout' },
      tapAnimation: [['scaleSphereUp', 'scaleSphereDown']],
    })
  }, [])

  return (
    <ViroARScene>
      <ViroLightingEnvironment source={require('../assets/tesla/garage_1k.hdr')} />

      <ViroARImageMarker target="logo" onAnchorFound={() => setAnimateCar(true)}>
        <ViroNode scale={[0, 0, 0]} transformBehaviors={['billboardY']} animation={{ name: animName, run: playAnim }}>
          {['white', 'blue', 'grey', 'red', 'yellow'].map((color, i) => (
            <ViroSphere
              key={color}
              materials={[`${color}_sphere`]}
              heightSegmentCount={20}
              widthSegmentCount={20}
              radius={0.03}
              position={[-0.2 + i * 0.1, 0.25, 0]}
              onClick={() => {
                setTexture(color)
                setTap((prev) => ({ ...prev, [color]: true }))
              }}
              animation={{ name: 'tapAnimation', run: tap[color], onFinish: resetTaps }}
              shadowCastingBitMask={0}
            />
          ))}
        </ViroNode>

        <Viro3DObject
          scale={[0, 0, 0]}
          source={require('../assets/tesla/object_car.obj')}
          resources={[require('../assets/tesla/object_car.mtl')]}
          type="OBJ"
          materials={[texture]}
          onClick={toggleButtons}
          animation={{ name: 'scaleCar', run: animateCar }}
        />

        <ViroSpotLight
          innerAngle={5}
          outerAngle={25}
          direction={[0, -1, 0]}
          position={[0, 5, 1]}
          color="#ffffff"
          castsShadow={true}
          shadowMapSize={2048}
          shadowNearZ={2}
          shadowFarZ={7}
          shadowOpacity={0.7}
        />

        <ViroQuad
          rotation={[-90, 0, 0]}
          position={[0, -0.001, 0]}
          width={2.5}
          height={2.5}
          arShadowReceiver={true}
        />
      </ViroARImageMarker>
    </ViroARScene>
  )
}

export default ARCarDemoScene
