import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingTop: 80, 
    },
    logo: {
      width: 150,
      height: 150,
      marginBottom: 20,
    },
    inputContainer: {
      width: '100%',
      marginBottom: 20,
    },
    label: {
      color: 'white',
      marginBottom: 10,
    },
    input: {
      backgroundColor: 'transparent',
      borderWidth: 2,
      borderColor: 'rgba(233, 234, 236, 0.80)',
      color: 'white',
      padding: 10,
      borderRadius: 8,
      height: 40, 
    },
    signUpContainer: {
      width: '100%', 
      alignItems: 'flex-end', 
      marginBottom: 20, 
      },
    signUpText: {
      color: 'white',
      fontSize:12,
    },
    loginButton: {
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
      zIndex: 20,
    },
    
    loginButtonText: {
      color: '#333',
      fontSize: 32,
      fontWeight: '600',
      textAlign: 'center',
      lineHeight: 40,
    },
  });
  
export default styles;