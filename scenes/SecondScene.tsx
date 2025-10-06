import { ViroARScene, ViroImage, ViroText } from "@reactvision/react-viro";

export default function SecondScene(props: any) {
  function handleClick() {
    props.sceneNavigator.pop()
  }
  return (
    <ViroARScene>
      <ViroText text={`SECOND SCENE ${props.sceneNavigator.viroAppProps.name} and ${props.name}`} position={[0, 0, -2]} color="red"  />
      <ViroImage source={require('@/assets/images/icon.png')} position={[-1, -1, -5]} onClick={handleClick} />
    </ViroARScene>
  )
}