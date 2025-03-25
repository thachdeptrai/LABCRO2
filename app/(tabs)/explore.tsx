import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  StyleSheet, 
  Dimensions, 
  ImageBackground
} from 'react-native';
import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';
import { Ionicons } from '@expo/vector-icons';
import { PLAYLIST } from './playlist';

const { width } = Dimensions.get('window');

const MusicPlayer: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0); // (giây)
  const [duration, setDuration] = useState(0); // (giây)
  const soundRef = useRef<Audio.Sound | null>(null);

  useEffect(() => {
    loadTrack(currentIndex);
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  const loadTrack = async (index: number) => {
    try {
      if (soundRef.current) {
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }
      const { sound } = await Audio.Sound.createAsync(
        { uri: PLAYLIST[index].uri },
        { shouldPlay: false }
      );
      soundRef.current = sound;

      const status = await sound.getStatusAsync();
      if (status.isLoaded && status.durationMillis) {
        setDuration(status.durationMillis / 1000);
      } else {
        setDuration(0);
      }

      sound.setOnPlaybackStatusUpdate((playbackStatus) => {
        if (!playbackStatus.isLoaded) return;
        if (playbackStatus.positionMillis) {
          setPosition(playbackStatus.positionMillis / 1000);
        }
        if (playbackStatus.didJustFinish) {
          onNext();
        }
      });

      setIsPlaying(false);
      setPosition(0);
    } catch (error) {
      console.log('Error loading track:', error);
    }
  };

  const onPlayPause = async () => {
    if (!soundRef.current) return;
    const status = await soundRef.current.getStatusAsync();
    if (!status.isLoaded) return;
    if (status.isPlaying) {
      await soundRef.current.pauseAsync();
      setIsPlaying(false);
    } else {
      await soundRef.current.playAsync();
      setIsPlaying(true);
    }
  };

  const onNext = async () => {
    let nextIndex = currentIndex + 1;
    if (nextIndex >= PLAYLIST.length) nextIndex = 0;
    setCurrentIndex(nextIndex);
    await loadTrack(nextIndex);
  };

  const onPrevious = async () => {
    let prevIndex = currentIndex - 1;
    if (prevIndex < 0) prevIndex = PLAYLIST.length - 1;
    setCurrentIndex(prevIndex);
    await loadTrack(prevIndex);
  };

  const onSeek = async (value: number) => {
    if (!soundRef.current) return;
    await soundRef.current.setPositionAsync(value * 1000);
    setPosition(value);
  };

  const formatTime = (sec: number) => {
    const minutes = Math.floor(sec / 60);
    const seconds = Math.floor(sec % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const currentTrack = PLAYLIST[currentIndex];

  return (
    <ImageBackground 
      source={{ uri: currentTrack.artwork }} 
      style={styles.background} 
      blurRadius={20} // Làm mờ ảnh nền
    >
      <View style={styles.container}>
        {/* Ảnh bìa bài hát */}
        <Image source={{ uri: currentTrack.artwork }} style={styles.artwork} />
  
        {/* Tiêu đề & ca sĩ */}
        <Text style={styles.trackTitle}>{currentTrack.title}</Text>
        <Text style={styles.artist}>{currentTrack.artist}</Text>
  
        {/* Thanh tua */}
        <View style={styles.sliderWrapper}>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={duration}
            value={position}
            onValueChange={(value) => setPosition(value)}
            onSlidingComplete={onSeek}
            minimumTrackTintColor="#FFD369"
            maximumTrackTintColor="#393E46"
            thumbTintColor="#FFD369"
          />
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>{formatTime(position)}</Text>
            <Text style={styles.timeText}>{formatTime(duration)}</Text>
          </View>
        </View>
  
        {/* Nút điều khiển */}
        <View style={styles.controls}>
          <TouchableOpacity onPress={onPrevious} style={styles.sideButton}>
            <Ionicons name="play-skip-back" size={20} color="#222831" />
          </TouchableOpacity>
  
          <TouchableOpacity onPress={onPlayPause} style={styles.playButton}>
            <Ionicons name={isPlaying ? 'pause' : 'play'} size={24} color="#222831" />
          </TouchableOpacity>
  
          <TouchableOpacity onPress={onNext} style={styles.sideButton}>
            <Ionicons name="play-skip-forward" size={20} color="#222831" />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

export default MusicPlayer;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0)', // Lớp phủ tối giúp nhìn rõ nội dung
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    width: '100%',
  },
  // container: {
  //   flex: 1,
  //   backgroundColor: '#222831',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   padding: 20,
  // },
  artwork: {
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: 15,
    marginBottom: 25,
  },
  trackTitle: {
    fontSize: 20,
    color: '#EEEEEE',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  artist: {
    fontSize: 16,
    color: '#CCCCCC',
    marginTop: 5,
    marginBottom: 20,
    textAlign: 'center',
  },
  sliderWrapper: {
    width: '100%',
    marginBottom: 20,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeText: {
    color: '#FFF',
    fontSize: 12,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '50%',
    marginTop: 10,
    alignItems: 'center',
  },
  sideButton: {
    backgroundColor: '#FFD369',
    padding: 8,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButton: {
    backgroundColor: '#FFD369',
    padding: 12,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
