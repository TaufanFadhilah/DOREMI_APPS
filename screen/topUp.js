import React, { Component } from 'react';
import { Text, Image, StyleSheet } from 'react-native'
import { Container, Content, Header, Button, Left, Right, Icon, Title, Item, Body, Input } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import Restaurant from '../components/home/Restaurant'
class Home extends Component {

    constructor(props){
        super(props)
        this.state = {
            balance: 0
        }
        this.topUp = this.topUp.bind(this)
    }

    topUp(){
        fetch(url + 'addBalance', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.navigation.getParam('user').token}`
            },
            body: JSON.stringify({
                amount: this.state.balance
            })
        })
            .then((response) => response.json())
            .then(data => {
                console.log(data);
                this.props.navigation.push('Home',{
                    user: this.props.navigation.getParam('user')
                })
            })
            .catch((error) => {
                alert('terjadi kesalahan')
            });
    }

    render() {
        const styles = StyleSheet.create({
            title: {
                fontFamily: "Nunito",
                fontSize: 16,
                fontWeight: "normal",
                fontStyle: "normal",
                letterSpacing: 0,
                textAlign: "center",
                color: "#383838",
            }
        });
        return (
            <Container>
                <Header style={{ backgroundColor: 'white' }}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name='arrow-back' style={{ color: '#383838' }} />
                        </Button>
                    </Left>
                    <Body style={{ flex: 3 }}>
                        <Title style={{
                            fontFamily: "Nunito",
                            fontSize: 20,
                            fontWeight: "bold",
                            fontStyle: "normal",
                            lineHeight: 27,
                            letterSpacing: 0,
                            textAlign: "left",
                            color: "#383838",
                        }}>Tambah Saldo</Title>
                    </Body>
                    <Right></Right>
                </Header>
                <Content contentContainerStyle={{ flex: 1}}>
                    <Grid>
                        <Row style={{ backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }} size={20}>
                            <Col style={{ marginHorizontal: 20 }}>
                                <Item regular>
                                    <Input placeholder='Isikan nominal saldo' onChangeText={(text) => this.setState({ balance: text })} />
                                </Item>
                                <Button style={{
                                    borderRadius: 2,
                                    backgroundColor: "#ffad3c",
                                    padding: 10
                                }}
                                onPress={this.topUp}
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
                        <Row size={80} style={{
                            backgroundColor: '#eeeeee',
                            justifyContent: 'center', 
                            alignItems: 'center'
                        }}>
                            <Col style={{ padding: 20, alignItems: 'center' }}>
                                <Image source={require('../images/img_top_up.png')} style={{
                                    width: 198.5,
                                    height: 168.4
                                }} />
                            </Col>
                        </Row>
                    </Grid>
                </Content>
            </Container>
        );
    }
}

export default Home;
