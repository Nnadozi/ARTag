import { ViroARSceneNavigator } from '@reactvision/react-viro'
import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import ARCarDemoScene from './ARCarDemoScene'

export default function Index() {
  const [showAR, setShowAR] = useState(false)

  if (showAR) {
    return (
      <View style={{ flex: 1 }}>
        <ViroARSceneNavigator
          autofocus={true}
          initialScene={{ scene: ARCarDemoScene }}
          style={{ flex: 1 }}
        />
        <TouchableOpacity style={styles.exitButton} onPress={() => setShowAR(false)}>
          <Text style={{ color: 'white' }}>Exit AR</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.enterButton} onPress={() => setShowAR(true)}>
        <Text style={{ color: 'white' }}>Start AR Car Demo</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  enterButton: { backgroundColor: '#007AFF', padding: 16, borderRadius: 8 },
  exitButton: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
})
