import React, { Component } from 'react';
import { Text, Image, StyleSheet } from 'react-native'
import { Col, Row } from 'react-native-easy-grid';
class Restaurant extends Component {

    getImage(){
        if (this.props.restaurant.restaurant.thumb) {
            return (
                <Image source={{ uri: this.props.restaurant.restaurant.thumb}} style={{
                    flex: 1,
                    height: 185,
                    width: '100%',
                    borderRadius: 3,
                    alignSelf: 'center',
                }} />
            )    
        }else{
            return (
                <Image source={require('../../images/photo1.jpeg')} style={{
                    flex: 1,
                    height: 185,
                    width: '100%',
                    borderRadius: 3,
                    alignSelf: 'center',
                }} />
            )
        }
    }

    render() {
        const styles = StyleSheet.create({
            cardText: {
                // fontFamily: "Nunito",
                fontSize: 14,
                fontWeight: "bold",
                fontStyle: "normal",
                letterSpacing: 0,
                textAlign: "left",
                color: "#383838",
                marginTop: 12
            },
            cardTextDetail: {
                // fontFamily: "Nunito",
                fontSize: 14,
                fontWeight: "bold",
                fontStyle: "normal",
                letterSpacing: 0,
                textAlign: "right",
                color: "#e9181a",
                marginTop: 12
            }
        });
        return (
            <Row onPress={this.props.gotoDetail}>
                <Col style={{
                    marginVertical: 11,
                    marginHorizontal: 20
                }}>
                    {this.getImage()}
                    <Text style={styles.cardText}>
                        {this.props.restaurant.restaurant.name}
                    </Text>
                    <Row>
                        <Col>
                            <Text style={styles.cardText}>
                                Rp. {(this.props.restaurant.restaurant.average_cost_for_two/2).toLocaleString()}
                            </Text>
                        </Col>
                        <Col>
                            <Text style={styles.cardTextDetail}>
                                DETAIL
                            </Text>
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }
}

export default Restaurant;
