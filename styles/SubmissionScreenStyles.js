import { StyleSheet, Dimensions } from 'react-native';
const baseTextStyle = {
    fontFamily: 'Pretendard', 
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
      paddingTop: 40,
    },
    avoidingView: {
      flex: 1,
    },
    scrollContainer: {
      flexGrow: 1,
      paddingVertical: 16,
      paddingHorizontal: 20,
      paddingBottom: 100,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
      paddingHorizontal: 20,
      backgroundColor: '#000',
      zIndex: 10,
    },
    coinContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 8,
    },
    coinIcon: {
      width: 24,
      height: 24,
      marginRight: 4,
    },
    coinText: {
      ...baseTextStyle,
      fontSize: 20,
      fontWeight: '500',
      color: 'white',
      marginLeft: 3,
      lineHeight: 22,
      textAlign: 'center',
    },
    imagePicker: {
      width: '100%',
      height: 300,
      backgroundColor: '#333',
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'flex-start',
      marginBottom: 30, 
    },
    image: {
      width: '100%',
      height: '100%',
      borderRadius: 12,
    },
    input: {
      borderColor: '#FCDC2A',
      borderWidth: 2,
      borderRadius: 8,
      paddingHorizontal: 16,
      color: '#CCC',
      backgroundColor: '#000',
      ...baseTextStyle,
      fontSize: 16, 
      fontWeight: '500',
      lineHeight: 20, 
      marginBottom: 10,
    },
    inputError: {
      borderColor: 'red',
    },
    textArea: {
      height: 300,
      color: '#CCC',
      backgroundColor: '#000',
      paddingVertical: 15,
      paddingHorizontal: 15,
      ...baseTextStyle,
      fontSize: 16, 
      fontWeight: '500',
      lineHeight: 20, 
      alignSelf: 'stretch',
      textAlignVertical: 'top',
    },
    button: {
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
      width: '100%', 
      position: 'absolute',
      bottom: 0,
      zIndex: 100, 
    },
    buttonText: {
      ...baseTextStyle,
      color: '#333',
      fontSize: 32,
      fontWeight: '600',
      textAlign: 'center',
      lineHeight: 40,
    },
    errorText: {
      color: 'red',
      fontSize: 12,
      marginBottom: 10,
    },
  });
  
export default styles;
