import React, { Component } from "react";
import I18n from "../../I18n";
import {
  Container,
  Content,
  Button,
  Text,

} from "native-base";
import {
  View,
  Dimensions,
  ImageBackground,
  Image,
  TouchableOpacity,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  Platform,
  ScrollView,
  TextInput,
} from "react-native";
import LoginForm from "../Forms/LoginForm/LoginForm";
import {
  saveAuthCache,
  getAuthCache,
  setAutoLogin,
  getAutoLogin,
  getObjectToken,
  clearAuthCache
} from "../../utilities/Helper";
import { normalize } from "../../utilities/ThemeUtils";
import { Images } from "../../assets";
import { AppColors } from "../../utilities/Constants";
import { CheckBox } from 'react-native-elements'
import { aesEncrypt, aesDecrypt } from "../../utilities/CryptoFuntion";
var qs = require("qs");
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Config } from "../../utilities/Config";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default class LoginComponent extends Component {
  /**
   * Constructor
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      messageError: "",
      managed_url: "",
      user: "",
      password: "",
      isRemember: true
    }
  }

  componentDidMount() {
    this.props.stopLoading();
    this.getCache();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.authorData && nextProps.authorData != this.props.authorData) {
      const { authorData } = nextProps;
      if (authorData.ReturnValue === false) {
        this.setState({ messageError: authorData.ReturnMsg });
      }
    }
  }

  cacheMyLogin = async (form, isRemember) => {
    if (Boolean(isRemember)) {
      setAutoLogin(true);
      saveAuthCache({ ...form });
    } else {
      setAutoLogin(false);
      clearAuthCache();
    }
  };

  getCache = async () => {
    const { getTokenRequest, verifyRequest, authorizeRequest, changeLoginForm } = this.props;
    const isAutoLogin = await getAutoLogin();
    if (isAutoLogin == 'true') {
      const authCache = await getAuthCache();
      Config.userName = authCache.user;
      if (authCache) {
        this.setState({"managed_url": authCache.managed_url});
        this.setState({"user": authCache.user});
        this.setState({"password": ""});
        this.setState({"isRemember": true});
        if (await getObjectToken() != null)
          verifyRequest({
            Par: qs.stringify(authCache)
          })
      }
    } else {
      const authCache = await getAuthCache();
      this.setState({"managed_url": authCache.managed_url});
      this.setState({"user": authCache.user});
      this.setState({"password": ""});
      this.setState({"isRemember": false});
    }
  };

  onSubmitForm = () => {
    const { authorizeRequest, getTokenRequest, changeLoginForm } = this.props;
    // var text = aesEncrypt("cmd=GET_LIST_AS_REQUEST", "XCKD3C1C2Z6B8VCCUFBSW8UPA9AR8VL7")
    // console.log("__haha__", text)
    // var text2 = aesDecrypt("WpfNQNZqwuD3LPonzqYFXIZ8C4/IQMFeOZGg6zogDH6tA38u+D6BagZtWKsEZGPgmu4MrZGM6b41aiXi/FHfqUovQKsACB8OWK3eAh0UyFmd82Y83qqfsSaNANX1W/m2n2reWCEsRGuQJIhm/6oS5PO28S7vVuth5U8p4WTY3kIBw8dO7xJuqnGost+a1T86hPDEPNlP6dolIOxWzNrsLwMJKLs+xKD0nAGI4Z3AF8dC5Vhh0ueY2STavb04o0pl8NiBkBj4SEbxHimBtJIVJhd+A3TQmfN5wiwAXGD8jb5pw+xGxvU4a/HFupCevPVBLkVKypGnwzvHUVDm7zcY3OyeNqTIfQsONN2s4GquJA5m81s4aAwaUDMxm3/ByDJF9xHG+pLDk2CsX1uBcRjO1YBo9EzDY0Lt/VOpNjDcCloLXYW8N2g0GM/INS6jnJRejyVxvJk+nVnmU6WW9j6x5oxn7DklzUk3vc4G5lVxny4Oy5zhewGjt8c/T8MZ41zFB1NwwAy9A8DA9HkcZjHZrsd/bcRSDwpRlUffKV9AV7Y=", "XCKD3C1C2Z6B8VCCUFBSW8UPA9AR8VL7")
    // console.log("__haha__", text2)

    var form ={
      managed_url: this.state.managed_url,
      user: this.state.user,
      password: this.state.password,
      isRemember: this.state.isRemember
    }

    var isError = false;
    if (form.managed_url === "" || form.managed_url === undefined) {
      this.setState({ messageError: I18n.t('loginEmptyUrl') })
      isError = true;
    }
    else
      if (form.user === "" || form.user === undefined) {
        this.setState({ messageError: I18n.t('loginEmptyUser') })
        isError = true;
      }
      else
        if (form.password === "" || form.password === undefined) {
          this.setState({ messageError: I18n.t('loginEmptyPassword') })
          isError = true;
        }
    if (!isError) {
      let isRemember = form.isRemember;
      Config.userName = { ...form }.user;
      this.cacheMyLogin({ ...form }, isRemember);
      //this.getCache();
      getTokenRequest({ ...form });
      if (!isRemember) {
        this.setState({"managed_url": ""});
        this.setState({"user": ""});
      }
      this.setState({"password": ""});
    }
  };

  /**
   * Render views
   */
  render() {
    const {
      setAutoLoginTrue,
      setAutoLoginFalse,
      isAutoLogin,
      submitLoginForm,
    } = this.props;
    return (
      <ScrollView style={styles.container} keyboardShouldPersistTaps={'handled'}>

      <Container>
        <StatusBar backgroundColor={AppColors.primaryColor} />
        <ImageBackground resizeMode='stretch' source={Images.bg_login_top} style={{ width: '100%', justifyContent: 'center', height: screenHeight / 2 }}>
          <Image resizeMode='contain' source={Images.didim365_logo} style={{ tintColor: 'white', height: normalize(37), alignSelf: 'center' }} />
          <Text style={{ alignSelf: 'center', color: 'white', fontSize: normalize(15), marginTop: 10 }}>{I18n.t('appDiscription')}</Text>
          <Image resizeMode='contain' source={Images.group_logo_login} style={{ height: normalize(65), alignSelf: 'center' }} />
        </ImageBackground>
        <View style={{ backgroundColor: '#f4f6f9', flex: 1 }} />
        <View style={styles.form}>
          <View style={styles.formChild}>
            <View style={{}}>
                <TextInput
                    onChangeText={managed_url => this.setState({managed_url: managed_url})}
                    value={this.state.managed_url}
                    name={'managed_url'}
                    placeholder={I18n.t('loginUrl')}
                    keyboardType='default'
                    autoCapitalize='none'
                    returnKeyType={"next"}
                    style={styles.textInput}
                    ref={(input) => { this.secondTextInput = input; }}
                    onSubmitEditing={() => { this.secondTextInput.focus(); }}
                    blurOnSubmit={false}
                />

                <View style={{height:10}} />
                
                <TextInput
                    onChangeText={user => this.setState({user: user})}
                    value={this.state.user}
                    name={'user'}
                    placeholder={I18n.t('loginUser')}
                    keyboardType='default'
                    autoCapitalize='none'
                    returnKeyType={"next"}
                    style={styles.textInput}
                    ref={(input) => { this.secondTextInput = input; }}
                    onSubmitEditing={() => { this.thirdTextInput.focus(); }}
                    blurOnSubmit={false}
                />

                <View style={{height:10}} />

                <TextInput
                    onChangeText={password => this.setState({password: password})}
                    value={this.state.password}
                    name={'password'}
                    placeholder={I18n.t('loginPassword')}
                    keyboardType='default'
                    secureTextEntry={true}
                    autoCapitalize='none'
                    returnKeyType={"done"}
                    style={styles.textInput}
                    ref={(input) => { this.thirdTextInput = input; }}
                />

                <View style={{height:10}} />

                <CheckBox
                    title={I18n.t('loginRemember')}
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    containerStyle={{ borderWidth: 0, backgroundColor: 'transparent', marginLeft: 0, marginTop: 0, padding: 0 }}
                    onPress={() => this.setState({isRemember: !this.state.isRemember})}
                    checked={this.state.isRemember}
                    checkedColor='red'
                /> 
            </View>
            <Button onPress={()=> this.onSubmitForm()} style={{ width: '100%', borderRadius: 5, marginTop: 10, alignSelf: 'center', justifyContent: 'center', backgroundColor: AppColors.primaryColor }}>
              <Text style={{ color: 'white', fontSize: 20 }}>{I18n.t('login')}</Text>
            </Button>
            {this.state.messageError.length != "" &&
              <View style={{ backgroundColor: '#f2f2f4', width: '100%', paddingVertical: 10, marginTop: 10, borderRadius: 10, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10 }}>
                <FontAwesome size={30} name='comment-o' color='#ff3b3b' />
                <Text style={{ color: '#696969', marginLeft: 10, marginRight: 25 }}>{this.state.messageError}</Text>
              </View>
            }
          </View>
          <Text style={{ alignSelf: 'center', marginTop: normalize(30) }}>{I18n.t('appFooter')}</Text>
        </View>
      </Container>
      </ScrollView>

    );
  }
}

const styles = StyleSheet.create({
  form: {
    height: "100%",
    width: "100%",
    position: "absolute",
    left: 0,
    top: 0
  },
  formChild: {
    marginLeft: "5.6%",
    marginRight: "5.6%",
    padding: 30,
    backgroundColor: "#ffffff",
    marginTop: screenHeight / 2.8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  }, 
  textInput: {
    borderColor: '#e2e6ea',
    borderRadius: 10,
    borderWidth: 1, 
    paddingHorizontal: 10,
    fontSize: normalize(15)
  }
});