import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.9;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      paddingVertical: 10,
      paddingHorizontal: 20,
      backgroundColor: '#000',
      marginTop: 40,
    },
    pageTitle: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      flex: 1,
      marginRight: -58,
      fontFamily: 'Pretendard-Bold',
    },
    headerIcons: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    icon: {
      marginLeft: 15, 
    },
    contentContainer: {
      paddingBottom: 100,
      alignItems: 'flex-start',
      paddingHorizontal: 20,
      paddingTop: 54,
    },
    list: {
      flex: 1,
      width: '100%',
    },
    card: {
      borderRadius: 8,
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.09)',
      backgroundColor: 'rgba(255, 255, 255, 0.07)',
      padding: 16,
      marginBottom: 24,
      width: CARD_WIDTH,
      alignSelf: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 4,
    },
    cardContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    textAndImageContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      marginRight: 12,
    },
    textContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    username: {
      color: '#CCC',
      fontFamily: 'Pretendard-Regular',
      fontSize: 14,
      fontStyle: 'normal',
      fontWeight: '500',
      lineHeight: 20,
      letterSpacing: -0.28,
      marginBottom: 4,
    },
    title: {
      color: '#FCFCFC',
      fontFamily: 'Pretendard-Regular',
      fontSize: 16,
      fontWeight: '400',
      lineHeight: 22,
      letterSpacing: -0.64,
      marginBottom: 4,
    },
    tagContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    tag: {
      display: 'flex',
      paddingVertical: 3,
      paddingHorizontal: 12,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
      backgroundColor: 'rgba(252, 220, 42, 0.20)',
      marginRight: 4,
    },
    tagText: {
      color: '#FCDC2A',
      textAlign: 'center',
      fontFamily: 'Pretendard-Regular',
      fontSize: 12,
      fontStyle: 'normal',
      fontWeight: '600',
      lineHeight: 18,
    },
    favoriteContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    favoriteCount: {
      color: '#FFF',
      fontFamily: 'Pretendard-Regular',
      fontSize: 12,
      marginTop: 4,
    },
    footer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 8,
    },
    dateContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    calendarIcon: {
      marginRight: 2,
    },
    date: {
      color: '#FCFCFC',
      fontSize: 14,
      fontFamily: 'Pretendard-Regular',
    },
    priceContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    price: {
      color: '#ffffff',
      fontSize: 14,
      fontFamily: 'Pretendard-Regular',
    },
    profileImage: {
      width: 70,
      height: 70,
      borderRadius: 8,
      resizeMode: 'cover',
      marginRight: 12,
    },
    centeredView: { 
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    noJobsText: {
      flex: 1,
      color: '#fff',
      textAlign: 'center',
      fontSize: 16,
      fontFamily: 'Pretendard-Regular',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center', 
      marginTop: '24%', 
    },
    coinImageSmall: {
      width: 20,
      height: 20,
      marginRight: 4,
    },
  });
  

export default styles;
