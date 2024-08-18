import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.9;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000000',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      paddingTop: 40,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      paddingHorizontal: 20,
      paddingVertical: 10,
      backgroundColor: '#000000',
      marginBottom: 20,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#333',
      borderRadius: 8,
      paddingHorizontal: 10,
      flex: 1,
      marginHorizontal: 10,
    },
    searchInput: {
      color: 'white',
      fontSize: 16,
      flex: 1,
      paddingVertical: 8,
    },
    list: {
      alignSelf: 'center',
      width: '100%',
    },
    contentContainer: {
      paddingHorizontal: 20,
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
    favoriteIconContainer: {
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
      marginTop: 8,
    },
    dateContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    calendarIcon: {
      marginRight: 4,
    },
    date: {
      color: '#FCFCFC',
      fontSize: 16,
    },
    priceContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    coinImageSmall: {
      width: 20,
      height: 20,
      marginRight: 4,
    },
    price: {
      color: '#ffffff',
      fontSize: 14,
    },
    flexSpacer: {
      flex: 1,
    },
    profileImageContainer: {
      width: 64,
      height: 94.933,
      borderRadius: 8,
    },
    profileImage: {
      width: 70,
      height: 70,
      borderRadius: 8,
      resizeMode: 'cover',
      marginRight: 12,
    },
  });

export default styles;
