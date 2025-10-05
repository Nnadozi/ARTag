import { ViroARScene, ViroARSceneNavigator, ViroText } from '@reactvision/react-viro'
import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

function HelloWorldSceneAR() {
  const scaleFactor = 0.25
  return (
    <ViroARScene>
      <ViroText
        text="zixon is the best"
        scale={[scaleFactor, scaleFactor, scaleFactor]}
        position={[0, 0, -2]}
        style={{ fontFamily: 'Arial', fontSize: 30, color: '#ffffff' }}
      />
    </ViroARScene>
  )
}

export default function Index() {
  const [showAR, setShowAR] = useState(false)

  if (showAR) {
    return (
      <View style={{flex: 1}}>
        <ViroARSceneNavigator
          autofocus={true}
          initialScene={{
            scene: HelloWorldSceneAR,
          }}
          style={{flex: 1}}
        />
        <TouchableOpacity
          style={styles.exitButton}
          onPress={() => setShowAR(false)}
        >
          <Text style={styles.exitButtonText}>Leave</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎯 ARTag</Text>
      <Text style={styles.subtitle}>AR Development App</Text>

      <View style={styles.statusContainer}>
        <Text style={styles.statusLabel}>Viro React Status:</Text>
        <Text style={[styles.status, styles.success]}>
          ✅ Viro React is working!
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.button, styles.successButton]}
        onPress={() => setShowAR(true)}
      >
        <Text style={styles.buttonText}>Launch AR Scene</Text>
      </TouchableOpacity>

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Getting Started:</Text>
        <Text style={styles.infoText}>
          • Tap "Launch AR Scene" to test{'\n'}
          • Point your camera at a flat surface{'\n'}
          • You should see "Hello Viro AR!" text{'\n'}
          • Make sure you're on a physical device
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  arContainer: {
    flex: 1,
  },
  arView: {
    flex: 1,
  },
  exitButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: '#e74c3c',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  exitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#7f8c8d',
    marginBottom: 40,
    textAlign: 'center',
  },
  statusContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    minWidth: 280,
  },
  statusLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#34495e',
    marginBottom: 8,
  },
  status: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  success: {
    color: '#27ae60',
  },
  button: {
    backgroundColor: '#3498db',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  successButton: {
    backgroundColor: '#27ae60',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  infoContainer: {
    backgroundColor: '#ecf0f1',
    padding: 16,
    borderRadius: 8,
    maxWidth: 320,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#5d6d7e',
    lineHeight: 20,
  },
})
