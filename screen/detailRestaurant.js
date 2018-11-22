import React, { Component } from 'react';
import { Text, Image, StyleSheet, ImageBackground, Linking, Alert } from 'react-native'
import { Container, Content, Header, Button, Left, Right, Icon, Title, Fab, Body } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import Restaurant from '../components/home/Restaurant'
import url from '../components/variable'
class Home extends Component {

    constructor(props){
        super(props)
        this.buyFood = this.buyFood.bind(this)
    }

    buyFood(){
        fetch(url + 'buyFood', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.navigation.getParam('user').token}`
            },
            body: JSON.stringify({
                res_id: this.props.navigation.getParam('restaurant').R.res_id,
                amount: this.props.navigation.getParam('restaurant').average_cost_for_two/2
            })
        })
            .then((response) => response.json())
            .then(data => {
                Alert.alert(
                    'Berhasil',
                    'Restaurant telah tercatat.',
                    [
                        {
                            text: 'OK', onPress: () => this.props.navigation.push('History', {
                                user: this.props.navigation.getParam('user')
                            })
                        },
                    ],
                    { cancelable: false }
                )
            })
            .catch((error) => {
                alert('terjadi kesalahan')
                console.log(error);
            });
    }

    render() {
        const styles = StyleSheet.create({
            icon: {
                width: 44,
                height: 44
            },
            title: {
                fontFamily: "Nunito",
                fontSize: 20,
                fontWeight: "bold",
                fontStyle: "normal",
                letterSpacing: 0,
                textAlign: "left",
                color: "#919ec4"
            }
        });
        return (
            <Container>
                <Content>
                    <Grid>
                        <Row style={{
                            height: 300
                        }}>
                            <Col>
                                <ImageBackground source={{ uri: this.props.navigation.getParam('restaurant').thumb}} style={{
                                    width: '100%',
                                    height: 277,
                                }}>
                                    <Header style={{ backgroundColor: 'transparent' }}>
                                        <Left>
                                            <Button transparent onPress={() => this.props.navigation.goBack()}>
                                                <Icon name='arrow-back' style={{ color: 'white' }} />
                                            </Button>
                                        </Left>
                                        <Body style={{ flex: 3}}>
                                            <Title style={{
                                                fontFamily: "Nunito",
                                                fontSize: 20,
                                                fontWeight: "bold",
                                                fontStyle: "normal",
                                                letterSpacing: 0,
                                                textAlign: "left",
                                                color: "white",
                                            }}>Detail Restoran</Title>
                                        </Body>
                                        <Right></Right>
                                    </Header>
                                    <Fab
                                        style={{ backgroundColor: '#f13564' }}
                                        position="bottomRight"
                                        onPress={() => Linking.openURL(`http://maps.apple.com/maps?daddr=${this.props.navigation.getParam('restaurant').location.address}`)}
                                        >
                                        <Icon name="map" />
                                    </Fab>
                                </ImageBackground>
                            </Col>
                        </Row>
                        <Row>
                            <Col size={20}></Col>
                            <Col size={80}>
                                <Text style={{
                                    fontFamily: "Nunito",
                                    fontSize: 14,
                                    fontWeight: "normal",
                                    fontStyle: "normal",
                                    letterSpacing: 0,
                                    textAlign: "left",
                                    color: "#383838",
                                    marginBottom: 20
                                }}>
                                    {this.props.navigation.getParam('restaurant').name}
                                </Text>
                            </Col>
                        </Row>
                        <Row style={{ marginBottom: 20, marginLeft: 16 }}>
                            <Col size={20}>
                                <Image source={require('../images/round_money.png')} style={styles.icon}/>
                            </Col>
                            <Col size={80}>
                                <Text style={styles.title}>
                                    Kisaran Harga
                                </Text>
                                <Text>
                                    Rp {this.props.navigation.getParam('restaurant').average_cost_for_two / 2} - Rp {this.props.navigation.getParam('restaurant').average_cost_for_two}
                                </Text>
                            </Col>
                        </Row>
                        <Row style={{ marginBottom: 20, marginLeft: 16 }}>
                            <Col size={20}>
                                <Image source={require('../images/round_map.png')} style={styles.icon} />
                            </Col>
                            <Col size={80}>
                                <Text style={styles.title}>
                                    Alamat
                                </Text>
                                <Text>
                                    {this.props.navigation.getParam('restaurant').location.address}
                                </Text>
                            </Col>
                        </Row>
                        <Row style={{ marginBottom: 20, marginLeft: 16 }}>
                            <Col size={20}>
                                <Image source={require('../images/round_stars.png')} style={styles.icon} />
                            </Col>
                            <Col size={80}>
                                <Text style={styles.title}>
                                    Popularitas
                                </Text>
                                <Text>
                                    {this.props.navigation.getParam('restaurant').user_rating.rating_text}
                                </Text>
                            </Col>
                        </Row>
                        <Row style={{ marginTop: 83 }}>
                            <Col>
                                <Button style={{
                                    width: '90%',
                                    height: 44,
                                    borderRadius: 5,
                                    backgroundColor: "#f13564",
                                    alignSelf: 'center',
                                    justifyContent: 'center',
                                    marginBottom: 30
                                }}
                                onPress={this.buyFood}
                                >
                                    <Text style={{
                                        fontFamily: "Nunito",
                                        fontSize: 14,
                                        fontWeight: "bold",
                                        fontStyle: "normal",
                                        letterSpacing: 0,
                                        color: "#ffffff",
                                    }}>
                                        PILIH RESTORAN INI
                                    </Text>
                                </Button>
                            </Col>
                        </Row>
                    </Grid>
                </Content>
            </Container>
        );
    }
}

export default Home;
