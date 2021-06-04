import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {userInfo} from 'os';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ImageComponent,
  ActivityIndicator,
} from 'react-native';
import {RootStackParamList} from '../../../RootStackParams';
import {windowWidth} from '../../utils/dimension';
import FormInput from '../custom-fields/form-input';
import auth from '@react-native-firebase/auth';
import FormButton from '../custom-fields/form-button';
import SocialButton from '../custom-fields/social-button';
import {GoogleSignin} from '@react-native-community/google-signin';
// import {GoogleSignin} from '@react-native-community/google-signin';

type screenProp = StackNavigationProp<RootStackParamList, 'Login'>;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showLoading, setShowLoading] = useState(false);
  const navigation = useNavigation<screenProp>();

  useEffect(() => {
    // initialize the Google SDK
    GoogleSignin.configure({
      webClientId:
        '836984052706-gh8e6g34t6kco9h216pt4028l4clgbl0.apps.googleusercontent.com',
    });
  }, []);

  const googleLogin = async () => {
    //Get the users ID token
    const {idToken} = await GoogleSignin.signIn();
    //Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    //Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  };

  const loginUser = async (email: any, password: any) => {
    setShowLoading(true);
    try {
      let response = await auth().signInWithEmailAndPassword(email, password);
      console.log(response);
      if (response && response.user) {
        setShowLoading(false);
        console.log('Success ✅', 'User sign in successfully');
        navigation.navigate('Dashboard');
      }
    } catch (e) {
      setShowLoading(false);
      console.error(e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://cdn.dribbble.com/users/1889528/screenshots/7239609/0aba6579301149.5cbf290c5a8dd.jpg',
        }}
        style={styles.logo}
      />

      <FormInput
        labelValue={email}
        onChangeText={(userEmail: string) => setEmail(userEmail)}
        placeholderText="Email"
        iconType="user"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <FormInput
        labelValue={password}
        onChangeText={(userPassword: string) => setPassword(userPassword)}
        placeholderText="Password"
        iconType="lock"
        secureTextEntry={true}
      />

      <FormButton
        buttonTitle="Login"
        onPress={() => {
          loginUser(email, password);
        }}
      />

      <SocialButton
        buttonTitle="Sign In with Facebook"
        btnType="facebook"
        color="#4867aa"
        backgroundColor="#e6eaf4"
        onPress={() => {}}
      />

      <SocialButton
        buttonTitle="Sign In with Google"
        btnType="google"
        color="#de4d41"
        backgroundColor="#f5e7ea"
        onPress={() => {
          googleLogin();
        }}
      />

      <TouchableOpacity
        style={styles.forgotButton}
        onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.navButtonText}>
          Don't have an acount? Create here
        </Text>
      </TouchableOpacity>

      {showLoading && (
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafd',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    height: 150,
    width: windowWidth,
    resizeMode: 'cover',
  },
  text: {
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 35,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',
    fontFamily: 'Lato-Regular',
  },
  activity: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
