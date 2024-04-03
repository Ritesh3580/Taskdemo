import { View, Text, SafeAreaView, StyleSheet, Image, ScrollView, TextInput, KeyboardAvoidingView, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { useRoute } from '@react-navigation/native';
import ImageRatio from '../components/ImageComp/ImageRatio';
import AppIcon, { Icons } from '../components/AppIcon';
import AppColor from '../Assets/AppColor';
import AppButton from '../components/Button/AppButton';
import { SaveUserData } from '../network/apiRequest';
import Toast from 'react-native-simple-toast';

const SubmitData = () => {
  const route = useRoute();
  const data = route?.params?.data;
  const [btnLoading, setBtnLoding] = useState(false);
  const [aspectRatio, setAspectRatio] = useState(1);

  const [userdata, setuserdata] = useState(
    {
      name: '',
      lastname: '',
      emailAddress: '',
      phoneNo: '',
      error: 'none',
    }
  );
  const [userDataError, setuserDataError] = useState(
    {
      nameErr: false,
      lastnameErr: false,
      emailErr: false,
      phoneErr: false
    }
  );

  Image.getSize(data.xt_image, (width, height) => {
    setAspectRatio(width / height);
});



  // Function to validate user input fields.
  function validateUserInput() {
    let isValidated = true;
    let errorObj = {};
    if (userdata.name.trim().length < 3) {
      errorObj.nameErr = "Name should have at least three characters.";
      setuserDataError({ ...userDataError, "emailErr": true });
      isValidated = false;
    } else if (!(/^[a-zA-Z]+$/).test(userdata.name)) {
      errorObj.nameErr = "Only alphabets are allowed in the Name field.";
      isValidated = false;
      setuserDataError({ ...userDataError, "emailErr": true });
    }

    if (userdata.lastname.trim().length === 0) {
      errorObj.lastnameErr = "Last name cannot be empty.";
      setuserDataError({ ...userDataError, "lastnameErr": true });
      isValidated = false;
    } else if ((userdata.lastname.trim().length > 0) && !(/^[a-zA-Z]+$/.test(userdata.lastname))) {
      errorObj.lastnameErr = "Only alphabets with spaces are allowed in Last name field.";
      setuserDataError({ ...userDataError, "lastnameErr": true });
      isValidated = false;
    }
    if (userdata.emailAddress.trim().length === 0) {
      errorObj.emailErr = "Email address cannot be empty.";
      setuserDataError({ ...userDataError, "emailErr": true })
      isValidated = false;
    } else {
      var res = userdata.emailAddress.match(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/);
      if (!res) {
        errorObj.emailErr = "Invalid Email Address!";
        setuserDataError({ ...userDataError, "emailErr": true });
        isValidated = false;
      }

    }

    if ((!userdata.phoneNo)) {
      errorObj.numberErr = "Phone number contains invalid characters.";
      setuserDataError({ ...userDataError, "numberErr": true });
      isValidated = false;
    } else if ((parseInt(userdata.phoneNo)).toString().length != 10) {
      errorObj.numberErr = "Phone number should contain exactly 10 digits.";
      setuserDataError({ ...userDataError, "numberErr": true });
      isValidated = false;
    }
    userdata.error = errorObj;
    return isValidated;
  }


  const handleSubmit = async () => {
    let isFormValid = validateUserInput();
    setBtnLoding(true);
    if (isFormValid) {
      const formData = new FormData();
      formData.append("first_name", userdata?.name);
      formData.append("last_name", userdata?.lastname);
      formData.append("email", userdata?.emailAddress);
      formData.append("phone", userdata?.phoneNo);
      if (data?.xt_image) {
        formData.append('user_image', {
          uri: data?.xt_image,
          name: 'image.jpg',
          type: 'image/jpeg',
        });
      }

      const response = await SaveUserData(formData);
      if (response.data.status == "success") {
        setBtnLoding(false)
        setuserdata({
          ...userdata,
          name: '',
          lastname: '',
          emailAddress: '',
          phoneNo: '',
          error: 'none',
        });
        Toast.show(response.data.message, Toast.BOTTOM);



      }
      else {
      }
    }
    else{
      setBtnLoding(false);

    }

  }


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{paddingBottom: 10}} showsVerticalScrollIndicator={false} >
        <View style={{ aspectRatio: aspectRatio }}>
        <Image style={{aspectRatio: aspectRatio, resizeMode:'contain', }} source={{ uri: data?.xt_image }} />

        </View>

          <View style={[styles.InputContainer]}>
            <View style={styles.innerView}>
              <AppIcon
                type={Icons.AntDesign}
                name="user"
                size={20}
                color={'black'}
                style={{ right: 2 }}

              />
              <Text style={styles.textStyle}>First name</Text>
            </View>
            <View style={styles.ErrorView}>
              <TextInput
                style={[styles.btnStyle]}
                placeholder='Enter your first name'
                onChangeText={(val) => setuserdata({ ...userdata, "name": val })}
                value={userdata?.name}
              />

              {userdata?.error?.nameErr && <Text style={styles.errorMsg}>{userdata?.error?.nameErr}</Text>}

            </View>


          </View>



          <View style={styles.InputContainer}>
            <View style={styles.innerView}>
              <AppIcon
                type={Icons.AntDesign}
                name="user"
                size={20}
                color={'black'}
                style={{ right: 2 }}

              />
              <Text style={styles.textStyle}>Last name</Text>
            </View>

            <View style={styles.ErrorView}>
              <TextInput
                style={styles.btnStyle}
                placeholder='Enter your first name'
                onChangeText={(val) => setuserdata({ ...userdata, "lastname": val })}
                value={userdata?.lastname}
              />
              {userdata?.error?.lastnameErr && <Text style={styles.errorMsg}>{userdata?.error?.lastnameErr}</Text>}

            </View>

          </View>

          <View style={styles.InputContainer}>
            <View style={styles.innerView}>
              <AppIcon
                type={Icons.Entypo}
                name="email"
                size={19}
                color={'black'}
                style={{ right: 2 }}
              />
              <Text style={styles.textStyle}>Email</Text>
            </View>
            <View style={[styles.ErrorView, { marginLeft: 35 }]}>
              <TextInput
                style={styles.btnStyle}
                placeholder='Email.....'
                onChangeText={(val) => setuserdata({ ...userdata, "emailAddress": val })}
                value={userdata?.emailAddress}
                keyboardType='email-address'
              />
              {userdata?.error?.emailErr && <Text style={styles.errorMsg}>{userdata?.error?.emailErr}</Text>}

            </View>
          </View>


          <View style={styles.InputContainer}>
            <View style={styles.innerView}>
              <AppIcon
                type={Icons.AntDesign}
                name="phone"
                size={18}
                color={'black'}
                style={{ right: 2 }}
              />
              <Text style={styles.textStyle}>Phone no.</Text>
            </View>
            <View style={styles.ErrorView}>
              <TextInput
                style={styles.btnStyle}
                placeholder='.....'
                onChangeText={(val) => setuserdata({ ...userdata, "phoneNo": val })}
                value={userdata?.phoneNo}
                keyboardType='number-pad'
                maxLength={10}
              />
              {userdata?.error?.numberErr && <Text style={styles.errorMsg}>{userdata?.error?.numberErr}</Text>}

            </View>
          </View>

        <AppButton
          loaderColor={AppColor.WHITE}
          backgroundColor={AppColor.DARK_BLUE}
          title={'Submit'}
          textStyle={{ color: AppColor.WHITE, fontSize: 17 }}
          Indicator={btnLoading}
          onPress={() => handleSubmit()}
          ContainerStyle={{ height: 50, width: '80%', marginTop: 30, alignSelf: 'center' }}
        >

        </AppButton>
      </ScrollView>


    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  InputContainer: {
    height: 50,
    width: '90%',
    marginTop: 15,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',

  },
  innerView: {
    flexDirection: 'row',
    right: 10,
    alignItems: 'center'
  },
  ErrorView: {
    flexDirection: 'column',
    width: '100%',
  },
  textStyle: {
    color: 'black',
    fontSize: 15,
    fontWeight: '500'
  },
  btnStyle: {
    borderWidth: 1,
    borderColor: AppColor.BLACK,
    width: '75%',
    height: 38,
    paddingLeft: 10,
    color: 'black'
  },
  errorMsg: {
    position: "absolute",
    bottom: -20,
    color: AppColor.RED,
    fontSize: 11,
  }
})

export default SubmitData;