import React, { Component } from 'react';
import { Text, Image, StyleSheet, AsyncStorage } from 'react-native'
import { Container, Content, Header, Button, Left, Right, Icon, Title, Footer, FooterTab } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import Restaurant from '../components/home/Restaurant'
import url from '../components/variable'

class Home extends Component {

    constructor(props){
        super(props)
        this.state = {
            user: props.navigation.getParam('user'),
            balance: '-',
            restaurants: ''
        }
    }

    getBalance(){
        fetch(url + 'getBalance', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.navigation.getParam('user').token}`
            },
        })
            .then((response) => response.json())
            .then(data => {
                this.setState({ balance: data.data.balance })   
            })
            .catch((error) => {
                alert('terjadi kesalahan')
                console.log(error);
            });
    }

    getResto(){
        if (!this.state.restaurants) {
            fetch(url + 'getRestaurantByCity', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.props.navigation.getParam('user').token}`
                },
                body: JSON.stringify({
                    city_id: 74
                })
            })
                .then((response) => response.json())
                .then(data => {
                    this.setState({ restaurants: data.data.restaurants})
                })
                .catch((error) => {
                    alert('terjadi kesalahan')
                    console.log(error);
                    
                });
            return <Text>Loading</Text>
        }else{
            return this.state.restaurants.map(restaurant => (
                <Restaurant key={restaurant.restaurant.id} restaurant={restaurant} gotoDetail={() => this.props.navigation.navigate('DetailRestaurant',{
                    restaurant: restaurant.restaurant,
                    user: this.props.navigation.getParam('user')
                })} />
            ))
        }
    }

    componentDidMount(){
        this.getBalance()
    }

    render() {
        const styles = StyleSheet.create({
            headerIcon: {
                width: 24,
                height: 24
            },
            activeFooter: {
                fontFamily: "Nunito",
                fontSize: 12,
                fontWeight: "normal",
                fontStyle: "normal",
                letterSpacing: 0,
                textAlign: "left",
                color: "#f13564"
            },
            nonActiveFooter: {
                fontFamily: "Nunito",
                fontSize: 12,
                fontWeight: "normal",
                fontStyle: "normal",
                letterSpacing: 0,
                textAlign: "left",
                color: "#d9d9db"
            },
            balanceText: {
                fontFamily: "Nunito",
                fontSize: 18,
                fontWeight: "normal",
                fontStyle: "normal",
                letterSpacing: 0,
                textAlign: "left",
                color: "#383838",
                marginTop: 10
            }
        });
        return (
            <Container>
                <Header style={{ backgroundColor: 'white' }}>
                    <Left>
                        <Title style={{
                            fontFamily: "Nunito",
                            fontSize: 20,
                            fontWeight: "bold",
                            fontStyle: "normal",
                            lineHeight: 27,
                            letterSpacing: 0,
                            textAlign: "left",
                            color: "#f13564"
                        }}>DOREMI</Title>
                    </Left>
                    <Right>
                        <Button transparent>
                            <Image source={require('../images/round_search.png')} style={styles.headerIcon} />
                        </Button>
                        <Button transparent>
                            <Image source={require('../images/round_notification.png')} style={styles.headerIcon}/>
                        </Button>
                    </Right>
                </Header>
                <Content>
                    <Grid>
                        <Row style={{padding: 17, borderBottomWidth: 0.5}}>
                            <Col>
                                <Text style={styles.balanceText}>
                                    Saldo Saya : 
                                </Text>
                            </Col>
                            <Col>
                                <Text style={styles.balanceText}>
                                    Rp. { this.state.balance }
                                </Text>
                            </Col>
                            <Col>
                                <Button style={{
                                    borderRadius: 2,
                                    backgroundColor: "#ffad3c",
                                    padding: 10
                                }}
                                    onPress={() => this.props.navigation.navigate('TopUp',{
                                        user: this.props.navigation.getParam('user')
                                    })}
                                >
                                    <Text style={{
                                        // fontFamily: "Nunito",
                                        fontSize: 14,
                                        fontWeight: "normal",
                                        fontStyle: "normal",
                                        letterSpacing: 0,
                                        textAlign: "left",
                                        color: "#ffffff"
                                    }}>
                                        ISI SALDO
                                    </Text>
                                </Button>
                            </Col>
                        </Row>
                        {this.getResto()}
                    </Grid>
                </Content>
                <Footer style={{ backgroundColor: 'white' }}>
                    <FooterTab style={{ backgroundColor: 'white' }}>
                        <Button vertical>
                            <Image source={require('../images/round_home_2.png')} style={styles.headerIcon}/>
                            <Text style={styles.activeFooter}>Beranda</Text>
                        </Button>
                        <Button vertical onPress={() => this.props.navigation.navigate('History',{
                            user: this.props.navigation.getParam('user')
                        })}>
                            <Image source={require('../images/round_credit_card.png')} style={styles.headerIcon} />
                            <Text style={styles.nonActiveFooter}>Riwayat Transaksi</Text>
                        </Button>
                        <Button vertical onPress={() => this.props.navigation.navigate('Profile', {
                            user: this.props.navigation.getParam('user')
                        })}>
                            <Image source={require('../images/round_person.png')} style={styles.headerIcon} />
                            <Text style={styles.nonActiveFooter}>Akun</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}

export default Home;
