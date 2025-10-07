Get this to work: https://github.com/viromedia/viro/blob/master/code-samples/js/ARCarDemo/ARCarDemo.js
[TypeError: Cannot read property 'getAssetByID' of undefined] 

export default function Index() {
  const [showAR, setShowAR] = useState(false)

  if (showAR) {
    return (
      <View style={{flex: 1}}>
        <ViroARSceneNavigator
          autofocus={true}
          initialScene={{scene: FirstScene}}//Only fix is to rename file to .jsx :(
          viroAppProps={{name: 'Global props'}}
          style={{flex: 1}}
        />
        <TouchableOpacity style={styles.exitARButton} onPress={() => setShowAR(false)}>
          <Text>Exit AR</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Button title="Go to first scene" onPress={() => setShowAR(true)} />
    </View>
  )
}

function handleClick() {
    props.sceneNavigator.jump("SecondScene",{ 
        scene: SecondScene,
        passProps: {
            name: 'Local props'
        }
    })
}

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


import { ViroARScene, ViroARSceneNavigator, ViroText } from '@reactvision/react-viro'
import React, { useState } from 'react'
import { View } from 'react-native'

export default function Index() {
  const [showAR, setShowAR] = useState(false)

  const firstScene = () => {
    return (
      <ViroARScene>
        <ViroText position={[0, 0, -2]} text="First Scene" />
      </ViroARScene>
    )
  }

    return (
      <View style={{flex: 1}}>
        <ViroARSceneNavigator
          autofocus={true}
          initialScene={{scene: firstScene}}//Only fix is to rename file to .jsx :(
          viroAppProps={{name: 'Global props'}}
          style={{flex: 1}}
        />
      </View>
    )
  

}

