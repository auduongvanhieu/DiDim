import React, { Component } from "react";
import I18n from "../../I18n";
import { 
  Container, 
  Content, 
  Button ,
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
  Platform
} from "react-native";
import LoginForm from "../Forms/LoginForm/LoginForm";
import {
  saveAuthCache,
  getAuthCache,
  setAutoLogin,
  getAutoLogin,
  getObjectToken
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
    this.state={
      isRemember: true,
      messageError: ""
    }
  }

  componentDidMount() {   
    this.getCache();
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.authorData && nextProps.authorData != this.props.authorData){
      const {authorData} = nextProps;
      if(authorData.ReturnValue == false) {
        this.setState({messageError: authorData.ReturnMsg});
      }
    }
  }

  cacheMyLogin = async form => {
    const { isRemember } = this.state;

    if (isRemember) {
      setAutoLogin(true);
      saveAuthCache(form);
    } else {
      setAutoLogin(false);
    }
  };

  getCache = async () => {
    const { getTokenRequest, verifyRequest, authorizeRequest } = this.props;

    const objectToken = await getObjectToken();
    console.log("__token__", JSON.stringify(objectToken))
    if(objectToken) {
      const isAutoLogin = await getAutoLogin();       
      if(isAutoLogin == 'true'){
        const authCache = await getAuthCache();
        Config.userName = authCache.user;
        if(authCache) {
          verifyRequest({
            Par: qs.stringify(authCache)
          })
        }
      } else {
        this.setState({isRemember: false});
      }
    }
  };

  handleClickRemember = () => {
    this.setState({isRemember: !this.state.isRemember})
  }

  onSubmitForm = form => {
    const { authorizeRequest, getTokenRequest } = this.props;
    // var text = aesEncrypt("cmd=GET_LIST_AS_REQUEST", "XCKD3C1C2Z6B8VCCUFBSW8UPA9AR8VL7")
    // console.log("__haha__", text)
    // var text2 = aesDecrypt("WpfNQNZqwuD3LPonzqYFXIZ8C4/IQMFeOZGg6zogDH6tA38u+D6BagZtWKsEZGPgmu4MrZGM6b41aiXi/FHfqUovQKsACB8OWK3eAh0UyFmd82Y83qqfsSaNANX1W/m2n2reWCEsRGuQJIhm/6oS5PO28S7vVuth5U8p4WTY3kIBw8dO7xJuqnGost+a1T86hPDEPNlP6dolIOxWzNrsLwMJKLs+xKD0nAGI4Z3AF8dC5Vhh0ueY2STavb04o0pl8NiBkBj4SEbxHimBtJIVJhd+A3TQmfN5wiwAXGD8jb5pw+xGxvU4a/HFupCevPVBLkVKypGnwzvHUVDm7zcY3OyeNqTIfQsONN2s4GquJA5m81s4aAwaUDMxm3/ByDJF9xHG+pLDk2CsX1uBcRjO1YBo9EzDY0Lt/VOpNjDcCloLXYW8N2g0GM/INS6jnJRejyVxvJk+nVnmU6WW9j6x5oxn7DklzUk3vc4G5lVxny4Oy5zhewGjt8c/T8MZ41zFB1NwwAy9A8DA9HkcZjHZrsd/bcRSDwpRlUffKV9AV7Y=", "XCKD3C1C2Z6B8VCCUFBSW8UPA9AR8VL7")
    // console.log("__haha__", text2)

    // alert(JSON.stringify(form))
    if(form.managed_url === ""){
      this.setState({messageError: I18n.t('loginEmptyUrl')})
      return;
    }
    if(form.user === ""){
      this.setState({messageError: I18n.t('loginEmptyUser')})
      return;
    }
    if(form.password === ""){
      this.setState({messageError: I18n.t('loginEmptyPassword')})
      return;
    }
    Config.userName = form.user;
    this.cacheMyLogin(form);
    getTokenRequest(form);
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
      <Container>
        <StatusBar backgroundColor={AppColors.primaryColor}/>
        <ImageBackground resizeMode='stretch' source={Images.bg_login_top} style={{width: '100%',justifyContent: 'center', height: screenHeight/2}}>
          <Image resizeMode='contain' source={Images.didim365_logo} style={{tintColor: 'white', height: normalize(37), alignSelf: 'center' }}/>
    <Text style={{alignSelf: 'center', color: 'white', fontSize: normalize(15), marginTop: 10}}>{I18n.t('appDiscription')}</Text>
          <Image resizeMode='contain' source={Images.group_logo_login} style={{height: normalize(65), alignSelf: 'center' }}/>
        </ImageBackground>
        <View style={{backgroundColor: '#f4f6f9', flex: 1}} />
        <View style={styles.form}>
          <View style={styles.formChild}>
            <View style={{height: 190}}>
              <LoginForm
                hideSubmitButton={true}
                hideClearButton={true}
                onSubmit={this.onSubmitForm.bind(this)}
                initialValues={{
                  managed_url: "",
                  user: "",
                  password: ""
                }}
            />
            </View>
            <CheckBox 
              title={I18n.t('loginRemember')}
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o' 
              containerStyle={{borderWidth: 0, backgroundColor: 'transparent', marginLeft: 0, marginTop: 0, padding: 0}}
              onPress={()=> this.handleClickRemember()} 
              checked={this.state.isRemember} 
              checkedColor='red'/>
            <Button onPress={submitLoginForm} style={{width: '100%', borderRadius: 5, marginTop: 10, alignSelf: 'center', justifyContent: 'center', backgroundColor: AppColors.primaryColor}}>
              <Text style={{color: 'white', fontSize: 20}}>{I18n.t('login')}</Text>
            </Button>
            { this.state.messageError.length != "" &&
            <View style={{backgroundColor: '#f2f2f4', width: '100%', paddingVertical: 10, marginTop: 10, borderRadius: 10, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10}}>
              <FontAwesome size={30} name='comment-o' color='#ff3b3b' />
              <Text style={{color: '#696969', marginLeft: 10, marginRight: 25}}>{this.state.messageError}</Text>
            </View>
            }
          </View>
          <Text style={{alignSelf: 'center', marginTop: normalize(30)}}>{I18n.t('appFooter')}</Text>
        </View>
      </Container>
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
    marginTop: screenHeight/2.8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  }
});