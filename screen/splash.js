import React, { Component } from 'react';
import { Image } from 'react-native'
import { Container, Content } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
class Splash extends Component {

    componentDidMount() {
        setTimeout(() => {
            this.props.navigation.navigate('Login')
        }, 2000);
    }

    render() {
        return (
            <Container>
                <Content contentContainerStyle={{ flex: 1 }}>
                    <Grid>
                        <Row>
                            <Col style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={require('../images/logo.png')} style={{
                                    width: 62.1,
                                    height: 51
                                }} />
                            </Col>
                        </Row>
                    </Grid>
                </Content>
            </Container>
        );
    }
}

export default Splash;
