import React, { Component } from 'react';
import { Text, Image, StyleSheet, AsyncStorage, Alert, Linking } from 'react-native'
import { Container, Content, Input, Button } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import Spinner from 'react-native-loading-spinner-overlay';
import url from '../components/variable'
class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '',
            loading: false
        }
        this.onLogin = this.onLogin.bind(this)
        // if(AsyncStorage.getItem('user')){
        //     this.props.navigation.push('Home')
        // }
    }

    onLogin(){
        this.setState({ loading: true })
        fetch(url + 'login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state),
        })
            .then((response) => response.json())
            .then(data => {
                if (data.error == 'Unauthorised') {
                    // alert('Email dan Password salah')
                    Alert.alert(
                        'Error',
                        'Email dan Password salah',
                        [
                            { text: 'OK', onPress: () => this.setState({ loading: false }) },
                        ],
                        { cancelable: false }
                    )
                }else{
                    AsyncStorage.setItem('user', JSON.stringify(data))
                    this.setState({ loading: false })
                    this.props.navigation.push('Home', {
                        user: data.success
                    })
                }
            })
            .catch((error) => {
                alert('terjadi kesalahan')
                this.setState({ loading: false })
            });
    }

    render() {
        const styles = StyleSheet.create({
            title: {
                width: 87,
                height: 32,
                fontFamily: "Nunito",
                fontSize: 24,
                fontWeight: "bold",
                fontStyle: "normal",
                letterSpacing: 0,
                textAlign: "left",
                color: "#d9d9db",
                marginTop: 30
            },
            label: {
                width: 112,
                height: 19,
                fontFamily: "Nunito",
                fontSize: 14,
                fontWeight: "bold",
                fontStyle: "normal",
                lineHeight: 20,
                letterSpacing: 0,
                textAlign: "left",
                color: "#383838",
                marginTop: 20
            },
            input: {
                borderStyle: "solid",
                borderBottomWidth: 1,
                borderColor: "#f13564"
            },
            button: {
                borderRadius: 5,
                backgroundColor: "#f13564",
                marginTop: 20
            },
            buttonText: {
                fontFamily: "Nunito",
                fontSize: 14,
                fontWeight: "bold",
                fontStyle: "normal",
                letterSpacing: 0,
                textAlign: "center",
                color: "#ffffff",
                width: '100%'
            },
            optionalText: {
                fontFamily: "Nunito",
                fontSize: 14,
                fontWeight: "bold",
                fontStyle: "normal",
                letterSpacing: 0,
                textAlign: "center",
                color: "#f13564",
                marginTop: 30
            },
            optionalText2: {
                fontFamily: "Nunito",
                fontSize: 12,
                fontWeight: "normal",
                fontStyle: "normal",
                letterSpacing: 0,
                textAlign: "center",
                color: "#919ec4",   
                marginTop: 42
            }
        });
        return (
            <Container>
                <Content>
                    {/* <Spinner
                        visible={this.state.loading}
                        textContent={'Loading...'}
                        textStyle={{
                            color: 'white'
                        }}
                    /> */}
                    <Grid>
                        <Row>
                            <Col style={{ alignItems: 'center'}}>
                                <Image source={require('../images/logo.png')} style={{
                                    width: 65,
                                    height: 56.9,
                                    marginTop: 60
                                }} />
                                <Text style={styles.title}>
                                    MASUK
                                </Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{
                                marginRight: 45,
                                marginLeft: 45
                            }}>
                                <Text style={styles.label}>
                                    Email
                                </Text>
                                <Input style={styles.input} textContentType="emailAddress" defaultValue="yusuf@gmail.com" onChangeText={(text) => this.setState({email: text})} />
                                <Text style={styles.label}>
                                    Kata Sandi
                                </Text>
                                <Input style={styles.input} secureTextEntry={true} onChangeText={(text) => this.setState({ password: text })}/>
                                <Button style={styles.button}
                                    onPress={this.onLogin}
                                >
                                    <Text style={styles.buttonText}>
                                        MASUK SEKARANG
                                    </Text>
                                </Button>

                                <Text style={styles.optionalText}
                                    onPress={() => this.props.navigation.navigate('Register')}
                                >
                                    Belum Punya Akun ? 
                                </Text>
                                <Text style={styles.optionalText2}>
                                    Atau masuk menggunakan Google
                                </Text>

                                <Button style={{
                                    width: 173,
                                    height: 32.7,
                                    backgroundColor: "#ffffff",
                                    marginVertical: 15,
                                    alignSelf: 'center'
                                }}
                                    onPress={() => Linking.openURL('http://localhost:8000/login')}>
                                    <Image source={require('../images/btn_google.png')} style={{
                                        width: '100%',
                                        height: 32.7,
                                    }}/>
                                </Button>
                            </Col>
                        </Row>
                    </Grid>
                </Content>
            </Container>
        );
    }
}

export default Login;
