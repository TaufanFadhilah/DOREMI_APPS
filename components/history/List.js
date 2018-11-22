import React, { Component } from 'react';
import { Text, Image, StyleSheet } from 'react-native'
import { Col, Row } from 'react-native-easy-grid';
import url from '../variable'
class List extends Component {

    constructor(props){
        super(props)
        this.state = {
            restaurant: {
                name: '',
                average_cost_for_two: ''
            }
        }
    }

    getRestaurant(){
        
        fetch(url + 'getDetailRestaurant', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            },
            body: JSON.stringify({
                res_id: this.props.history.restaurant_id
            })
        })
            .then((response) => response.json())
            .then(data => {
                console.log(data);
                this.setState({ restaurant: data.data })
            })
            .catch((error) => {
                alert('terjadi kesalahan')
                console.log(error);
            });
    }

    componentDidMount(){
        this.getRestaurant()
    }

    render() {
        const styles = StyleSheet.create({
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
            <Row style={{
                margin: 10,
                borderBottomWidth: 0.5,
                paddingBottom: 12,
                borderBottomColor: '#d9d9db',
            }}>
                <Col size={20}>
                    <Image source={{ uri: this.state.restaurant.thumb }} style={styles.photo} />
                </Col>
                <Col size={80}>
                    <Text style={styles.title}>
                        {this.state.restaurant.name}
                    </Text>
                    <Text style={styles.text}>
                        Rp. {this.state.restaurant.average_cost_for_two / 2}
                    </Text>
                    <Text style={[styles.text, { marginTop: 10 }]}>
                        {/* 28 Okt, 11:23 PM */}
                        {this.props.history.created_at}
                    </Text>
                </Col>
            </Row>
        );
    }
}

export default List;
