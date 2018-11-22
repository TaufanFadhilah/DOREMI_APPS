import React, { Component } from 'react';
import { Text, Image, StyleSheet, ImageBackground } from 'react-native'
import { Container, Content, Header, Button, Left, Icon, Title, Fab, Footer, FooterTab } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
class Profile extends Component {

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
            },
            text: {
                fontFamily: "Nunito",
                fontSize: 12,
                fontWeight: "bold",
                fontStyle: "normal",
                letterSpacing: 0,
                textAlign: "left",
                color: "#939393"
            },

        });
        return (
            <Container>
                <Content>
                    <Grid>
                        <Row style={{
                            height: 300
                        }}>
                            <Col>
                                <ImageBackground source={require('../images/photo2.jpeg')} style={{
                                    width: '100%',
                                    height: 277,
                                }}>
                                    <Header style={{ backgroundColor: 'transparent' }}>
                                        <Left>
                                            <Title style={{
                                                fontFamily: "Nunito",
                                                fontSize: 20,
                                                fontWeight: "bold",
                                                fontStyle: "normal",
                                                letterSpacing: 0,
                                                textAlign: "left",
                                                color: "white",
                                            }}>Profil Saya</Title>
                                        </Left>
                                    </Header>
                                    {/* <Fab
                                        style={{ backgroundColor: '#f13564' }}
                                        position="bottomRight"
                                        onPress={() => this.props.navigation.navigate('EditProfile')}>
                                        <Icon name="edit" type="MaterialIcons" />
                                    </Fab> */}
                                </ImageBackground>
                            </Col>
                        </Row>
                        <Row style={{ marginBottom: 40, marginLeft: 16 }}>
                            <Col size={20}>
                                <Image source={require('../images/round_person_3.png')} style={styles.icon} />
                            </Col>
                            <Col size={80}>
                                <Text style={styles.title}>
                                    Nama
                                </Text>
                                <Text>
                                    {this.props.navigation.getParam('user').name}
                                </Text>
                            </Col>
                        </Row>
                        <Row style={{ marginBottom: 40, marginLeft: 16 }}>
                            <Col size={20}>
                                <Image source={require('../images/round_mail.png')} style={styles.icon} />
                            </Col>
                            <Col size={80}>
                                <Text style={styles.title}>
                                    Email
                                </Text>
                                <Text>
                                    {this.props.navigation.getParam('user').email}
                                </Text>
                            </Col>
                        </Row>
                    </Grid>
                </Content>
                <Footer style={{ backgroundColor: 'white' }}>
                    <FooterTab style={{ backgroundColor: 'white' }}>
                        <Button vertical onPress={() => this.props.navigation.navigate('Home',{
                            user: this.props.navigation.getParam('user')
                        })}>
                            <Image source={require('../images/round_home.png')} style={styles.headerIcon} />
                            <Text style={styles.nonActiveFooter}>Beranda</Text>
                        </Button>
                        <Button vertical onPress={() => this.props.navigation.navigate('History',{
                            user: this.props.navigation.getParam('user')
                        })}>
                            <Image source={require('../images/round_credit_card.png')} style={styles.headerIcon} />
                            <Text style={styles.nonActiveFooter}>Riwayat Transaksi</Text>
                        </Button>
                        <Button vertical onPress={() => this.props.navigation.navigate('Profile',{
                            user: this.props.navigation.getParam('user')
                        })}>
                            <Image source={require('../images/round_person_2.png')} style={styles.headerIcon} />
                            <Text style={styles.activeFooter}>Akun</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}

export default Profile;
