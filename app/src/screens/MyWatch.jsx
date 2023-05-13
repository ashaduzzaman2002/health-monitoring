import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import Header from '../components/Header'
import { AuthContext } from '../context/AppContext'
import Footer from '../components/Footer'

const MyWatch = ({navigation}) => {
    const {logout, isLoading, userDetails} = useContext(AuthContext)
  if(isLoading) {
    return <Spinner />
  }

  return (
    <SafeAreaView style={styles.container}>
        <Header userDetails={userDetails} title={'My Watch'} icon={require('../images/back.png')} navigation={navigation} />
      <Text>MyWatch</Text>

      <Footer navigation={navigation} />
    </SafeAreaView>
  )
}

export default MyWatch

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
})