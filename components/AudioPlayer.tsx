import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, PanResponder } from 'react-native';
import { Audio } from 'expo-av';

const VoiceRecorder = () => {
  const [recording, setRecording] = useState(null);
  const [recordingUri, setRecordingUri] = useState(null);
  const [sound, setSound] = useState(null);
  const [playbackStatus, setPlaybackStatus] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [seekPosition, setSeekPosition] = useState(0);

  // 🎙️ Start Recording
  const startRecording = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') return;

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  // ⏹️ Stop Recording
  const stopRecording = async () => {
    if (!recording) return;
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    setRecordingUri(uri);
    setRecording(null);
  };

  // ▶️ Play or Resume Audio
  const playRecording = async () => {
    if (!recordingUri) return;

    if (sound && isPaused) {
      await sound.playAsync();
      setIsPaused(false);
      return;
    }

    const { sound: newSound } = await Audio.Sound.createAsync(
      { uri: recordingUri },
      { shouldPlay: true },
      onPlaybackStatusUpdate
    );

    setSound(newSound);
    setIsPlaying(true);
    setIsPaused(false);
  };

  // ⏸ Pause Audio
  const pauseRecording = async () => {
    if (sound) {
      await sound.pauseAsync();
      setIsPaused(true);
    }
  };

  // ⏹️ Stop Audio
  const stopAudio = async () => {
    if (sound) {
      await sound.stopAsync();
      setIsPlaying(false);
      setPlaybackStatus(null);
    }
  };

  // 🎛 Handle Playback Progress Updates
  const onPlaybackStatusUpdate = (status) => {
    if (status.didJustFinish) {
      setIsPlaying(false);
      setSound(null);
    } else {
      setPlaybackStatus(status);
      setSeekPosition((status.positionMillis / status.durationMillis) * 100);
    }
  };

  // ⏩ Seek Audio to Position
  const seekAudio = async (positionPercent) => {
    if (sound && playbackStatus) {
      const seekMillis = (positionPercent / 100) * playbackStatus.durationMillis;
      await sound.setPositionAsync(seekMillis);
    }
  };

  // 🎚 Make Progress Bar Draggable
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      const newPosition = Math.max(0, Math.min(100, seekPosition + gestureState.dx / 2));
      setSeekPosition(newPosition);
    },
    onPanResponderRelease: () => {
      seekAudio(seekPosition);
    },
  });

  // Format Time (mm:ss)
  const formatTime = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = ((milliseconds % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.recordButton}
        onPressIn={startRecording}
        onPressOut={stopRecording}
      >
        <Text style={styles.recordText}>🎙️ Hold to Record</Text>
      </TouchableOpacity>

      {recordingUri && (
        <View style={styles.audioControls}>
          <TouchableOpacity onPress={playRecording} style={styles.playButton}>
            <Text style={{ color: 'white' }}>{isPlaying ? '▶️ Resume' : '▶️ Play'}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={pauseRecording} style={styles.pauseButton}>
            <Text style={{ color: 'white' }}>⏸ Pause</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={stopAudio} style={styles.stopButton}>
            <Text style={{ color: 'white' }}>⏹ Stop</Text>
          </TouchableOpacity>

          {playbackStatus && (
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View
                  style={{
                    width: `${seekPosition}%`,
                    height: '100%',
                    backgroundColor: 'green',
                  }}
                />
              </View>

              <View
                style={[
                  styles.progressThumb,
                  { left: `${seekPosition}%` },
                ]}
                {...panResponder.panHandlers}
              />
            </View>
          )}

          {playbackStatus && (
            <Text style={styles.timeText}>
              {formatTime(playbackStatus.positionMillis)} / {formatTime(playbackStatus.durationMillis)}
            </Text>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordButton: {
    backgroundColor: 'red',
    padding: 20,
    borderRadius: 50,
    marginTop: 20,
  },
  playButton: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 50,
    marginTop: 10,
    marginHorizontal: 5,
  },
  pauseButton: {
    backgroundColor: 'orange',
    padding: 15,
    borderRadius: 50,
    marginTop: 10,
    marginHorizontal: 5,
  },
  stopButton: {
    backgroundColor: 'gray',
    padding: 15,
    borderRadius: 50,
    marginTop: 10,
    marginHorizontal: 5,
  },
  progressContainer: {
    marginTop: 15,
    width: 250,
    height: 30,
    justifyContent: 'center',
  },
  progressBar: {
    width: '100%',
    height: 5,
    backgroundColor: '#ccc',
    position: 'absolute',
    borderRadius: 5,
  },
  progressThumb: {
    width: 15,
    height: 15,
    backgroundColor: 'blue',
    borderRadius: 10,
    position: 'absolute',
    top: -5,
  },
  recordText: {
    color: 'white',
    fontWeight: 'bold',
  },
  timeText: {
    marginTop: 5,
    color: 'black',
  },
  audioControls: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export default VoiceRecorder;
