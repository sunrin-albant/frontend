import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
    },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center', 
      width: '100%',
      paddingVertical: 10,
      paddingHorizontal: 20,
      zIndex: 10,
      position: 'absolute',
      top: 40,
      left: 0,
      right: 0,
    },
    backButton: {
      position: 'absolute',
      left: 20,
    },
    titleContainer: {
      alignItems: 'center',
    },
    title: {
      color: '#FFF',
      fontFamily: 'Pretendard-Bold',
      fontSize: 20,
      fontWeight: '700',
      textAlign: 'center',
    },
    tabsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 160,
      borderBottomWidth: 1,
      borderBottomColor: '#333',
    },
    tab: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 10,
    },
    tabText: {
      color: '#666',
      fontFamily: 'Pretendard-Regular',
      fontSize: 16,
      fontWeight: '500',
    },
    activeTabText: {
      color: '#FFF',
      fontFamily: 'Pretendard-Bold',
      fontWeight: '700',
    },
    activeTabIndicator: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: 2,
      backgroundColor: '#FFF',
    },
    list: {
      marginTop: 10,
    },
    notificationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
    },
    icon: {
      width: 40,
      height: 40,
      borderRadius: 20, 
      backgroundColor: '#CCC', 
      marginRight: 12,
    },
    squareIcon: {
      borderRadius: 8,
    },
    textContainer: {
      flex: 1,
    },
    notificationText: {
      color: '#FFF',
      fontFamily: 'Pretendard-Regular',
    },
    timeText: {
      color: '#AAA',
      fontFamily: 'Pretendard-Regular',
      fontSize: 12,
      marginTop: 4, 
      alignSelf: 'flex-start', 
    },
  });  

export default styles;
