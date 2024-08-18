import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 40,
    },
    backButton: {
      position: 'absolute',
      top: 100,
      left: 20,
    },
    titleContainer: {
      position: 'absolute',
      top: 140, 
      left: 20,
      alignItems: 'flex-start', 
    },
    title: {
      color: '#FFF',
      fontFamily: 'Pretendard',
      fontSize: 20, 
      fontWeight: '700',
      textAlign: 'left', 
    },
    imageContainer: {
      position: 'relative',
      marginBottom: 20,
      marginTop: 180, 
      alignItems: 'center',
    },
    profileImage: {
      width: 135,
      height: 135,
      borderRadius: 75,
      backgroundColor: '#444',
    },
    cameraIconContainer: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: 40,
      height: 40,
      borderRadius: 25,
      backgroundColor: '#424242',
      alignItems: 'center',
      justifyContent: 'center',
    },
    pageIndicatorContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      bottom: 100,
    },
    circle: {
      width: 12,
      height: 12,
      borderRadius: 6,
      backgroundColor: '#444',
      marginHorizontal: 4,
    },
    activeCircle: {
      backgroundColor: '#FCDC2A',
    },
    nextButton: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: '#FFD700',
      height: 70,
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
      alignItems: 'center',
      justifyContent: 'center',
      borderTopColor: '#000',
      borderLeftColor: '#000',
      borderRightColor: '#000',
      borderTopWidth: 2,
      borderLeftWidth: 2,
      borderRightWidth: 2,
    },
    nextButtonText: {
      color: '#333',
      fontSize: 32,
      fontWeight: '600',
      textAlign: 'center',
      lineHeight: 40,
    },
  });
  

export default styles;
