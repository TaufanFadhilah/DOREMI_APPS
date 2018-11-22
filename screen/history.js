import React, { Component } from 'react';
import { Text, Image, StyleSheet } from 'react-native'
import { Container, Content, Header, Button, Left, Title, Footer, FooterTab } from 'native-base';
import { Grid, Row, Col } from 'react-native-easy-grid';
import List from '../components/history/List'

class Home extends Component {

    constructor(props){
        super(props)
        this.state = {
            history: ''
        }
    }

    getHistory(){
        if (!this.state.history) {
            fetch(url + 'history', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.props.navigation.getParam('user').token}`
                },
            })
                .then((response) => response.json())
                .then(data => {
                    console.log(data);
                    this.setState({ history: data.data })
                })
                .catch((error) => {
                    alert('terjadi kesalahan')
                    console.log(error);
                });
            return <Text>Loading</Text>
        } else {
            return this.state.history.map(history => (
                <List key={history.id} history={history} token={this.props.navigation.getParam('user').token} />
            ))
        }
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
            photo: {
                width: 56,
                height: 56,
                borderRadius: 5
            },
            title: {
                fontFamily: "Nunito",
                fontSize: 14,
                fontWeight: "bold",
                fontStyle: "normal",
                letterSpacing: 0,
                textAlign: "left",
                color: "#383838"
            },
            text: {
                fontFamily: "Nunito",
                fontSize: 12,
                fontWeight: "bold",
                fontStyle: "normal",
                letterSpacing: 0,
                textAlign: "left",
                color: "#939393"
            }
        });
        return (
            <Container>
                <Header style={{ backgroundColor: 'white' }}>
                    <Left style={{ flex: 3}}>
                        <Title style={{
                            fontFamily: "Nunito",
                            fontSize: 20,
                            fontWeight: "bold",
                            fontStyle: "normal",
                            letterSpacing: 0,
                            textAlign: "left",
                            color: "#383838",
                        }}>Riwayat Transaksi</Title>
                    </Left>
                </Header>
                <Content>
                    <Grid>
                        <Row></Row>
                        {this.getHistory()}
                    </Grid>
                </Content>
                <Footer style={{ backgroundColor: 'white' }}>
                    <FooterTab style={{ backgroundColor: 'white' }}>
                        <Button vertical onPress={() => this.props.navigation.navigate('Home',{
                            user: this.props.navigation.getParam('user')
                        })}>
                            <Image source={require('../images/round_home.png')} style={styles.headerIcon}/>
                            <Text style={styles.nonActiveFooter}>Beranda</Text>
                        </Button>
                        <Button vertical onPress={() => this.props.navigation.navigate('History',{
                            user: this.props.navigation.getParam('user')
                        })}>
                            <Image source={require('../images/round_credit_card_2.png')} style={styles.headerIcon} />
                            <Text style={styles.activeFooter}>Riwayat Transaksi</Text>
                        </Button>
                        <Button vertical onPress={() => this.props.navigation.navigate('Profile',{
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
