import { Viro3DObject, ViroARScene, ViroImage, ViroText } from '@reactvision/react-viro'
import SecondScene from './SecondScene'

export default function FirstScene(props: any) {
  function handleClick() {
    props.sceneNavigator.jump("SecondScene",{ 
        scene: SecondScene,
        passProps: {
            name: 'Local props'
        }
    })
  }
  return (
    <ViroARScene>
      <ViroText text="FIRST SCENE" position={[0, 0, -2]}  color="blue" />
      <ViroImage source={require('@/assets/images/icon.png')} position={[-1, -1, -5]} onClick={handleClick} />
      <Viro3DObject
        source={require('@/assets/cube.obj')}
        position={[2,2,-5]}
        scale={[0.25,0.25,0.25]}
        type="OBJ" />
    </ViroARScene>
  )
}