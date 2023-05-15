import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import { AuthContext } from '../context/AppContext';
import { colors } from '../global/styles';
import { Picker } from '@react-native-picker/picker';
const { width } = Dimensions.get('window');
import Toast from 'react-native-toast-message';

const EditProfile = ({ navigation }) => {
  const { userDetails, updateDetails } = useContext(AuthContext);
  const [gender, setGender] = useState('Male');
  const [profilePic, setProfilePic] = useState('');
  const [age, setAge] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  const showToast = (type, text1, text2) => {
    Toast.show({
      type,
      text1,
      text2,
      autoHide: true,
    });
  };

  const updateHandler = () => {
    const data = {
      profilePic,
      age,
      gender,
      bloodGroup,
      height,
      weight,
    };

    console.log(data);

    updateDetails(profilePic, age, gender, bloodGroup, height, weight);
    userDetails['avtar'] = profilePic
    userDetails['age'] = age
    userDetails['weight'] = weight
    userDetails['height'] = height
    userDetails['bloodGroup'] = bloodGroup
    userDetails['gender'] = gender
    showToast(
      'success',
      'Profile Updated',
      'Now you can go to your profile screen'
    );
  };

  useEffect(() => {
    setGender(userDetails?.gender);
    setProfilePic(userDetails.avtar);
    setBloodGroup(userDetails.bloodGroup);
    setWeight(String(userDetails.weight));
    setHeight(String(userDetails.height));
    setAge(String(userDetails.age));
    console.log(userDetails.height);
  }, []);

  const genderList = ['Male', 'Female', 'Others'];
  return (
    <>
      <Header
        userDetails={userDetails}
        title={'Edit Profile'}
        navigation={navigation}
        icon={require('../images/back.png')}
      />

      <SafeAreaView style={styles.container}>
        <ScrollView style={{ width: '100%' }}>
          <View style={{ paddingHorizontal: 20 }}>
            <Text style={styles.heading}>Edit Profile</Text>

            <Text
              style={{ fontSize: 20, fontWeight: '500', textAlign: 'center' }}
            >
              {userDetails.name}
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: 'gray',
                textAlign: 'center',
                marginBottom: 20,
              }}
            >
              {userDetails.email}
            </Text>

            <View style={styles.dropdownContainer}>
              <Text style={styles.dropdownLabel}>Profiel Picture</Text>
              <TextInput
                placeholderTextColor={'gray'}
                style={styles.input}
                placeholder="https://example.com/example.png"
                onChangeText={(text) => setProfilePic(text)}
                value={profilePic}
              />
            </View>

            <View style={styles.dropdownContainer}>
              <Text style={styles.dropdownLabel}>age</Text>
              <TextInput
                placeholderTextColor={'gray'}
                style={styles.input}
                placeholder="ex:10"
                onChangeText={(text) => setAge(text)}
                value={age}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.dropdownContainer}>
              <Text style={styles.dropdownLabel}>Gender</Text>
              <Picker
                selectedValue={gender}
                onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
                style={[
                  styles.dropdown,
                  { backgroundColor: 'lightgray', borderWidth: 1 },
                ]}
              >
                <Picker.Item label="Select Gender" value={''} />
                {genderList?.map((item, i) => (
                  <Picker.Item key={i} label={item} value={item} />
                ))}
              </Picker>
            </View>

            <View style={styles.dropdownContainer}>
              <Text style={styles.dropdownLabel}>Blood Group</Text>
              <TextInput
                placeholderTextColor={'gray'}
                style={styles.input}
                placeholder="ex: B+"
                onChangeText={(text) => setBloodGroup(text)}
                value={bloodGroup}
              />
            </View>

            <View style={styles.dropdownContainer}>
              <Text style={styles.dropdownLabel}>Height</Text>
              <TextInput
                placeholderTextColor={'gray'}
                style={styles.input}
                placeholder="ex: 170cm"
                onChangeText={(text) => setHeight(text)}
                value={height}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.dropdownContainer}>
              <Text style={styles.dropdownLabel}>Weight</Text>
              <TextInput
                placeholderTextColor={'gray'}
                style={styles.input}
                placeholder="ex: 70kg"
                onChangeText={(text) => setWeight(text)}
                value={weight}
                keyboardType="numeric"
              />
            </View>
          </View>

          <TouchableOpacity onPress={updateHandler} style={styles.btnout}>
            <Text style={styles.btn}>Update</Text>
          </TouchableOpacity>

          {/* Status bar */}
          <StatusBar
            barStyle="light-content"
            hidden={false}
            backgroundColor="#00BCD4"
          />
        </ScrollView>
        <Toast />
      </SafeAreaView>
    </>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  heading: {
    fontSize: 30,
    textAlign: 'center',
    marginVertical: 10,
    color: colors.primary,
  },

  dropdownContainer: {
    width: '100%',
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  dropdownLabel: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    fontSize: 16,
  },

  btnout: {
    width: width - 40,
    backgroundColor: colors.primary,
    borderRadius: 10,
    alignItems: 'center',
    height: 50,
    justifyContent: 'center',
    elevation: 5,
    marginVertical: 20,
    alignSelf: 'center',
  },

  btn: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
