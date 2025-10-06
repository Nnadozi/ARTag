  import FirstScene from '@/scenes/FirstScene'
import { ViroARSceneNavigator } from '@reactvision/react-viro'
import React, { useState } from 'react'
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exitARButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'red',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
