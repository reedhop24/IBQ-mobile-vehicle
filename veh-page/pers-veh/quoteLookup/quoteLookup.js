import React, {Component} from 'react';
import {View, TextInput, Button, AsyncStorage} from 'react-native';
import axios from 'axios';

export default class QuoteLookupScreen extends React.Component {

    constructor() {
        super();
        this.state = {
            quoteNumber: null
        }
    }

    findQuote() {
        // Learned the hard way that React Native cannot post to local host, so posting to IP address instead.
        axios.post('http://10.0.0.234:3000/find/getQuote', {
                quoteNumber: this.state.quoteNumber
            })
            .then(res => {
                AsyncStorage.clear();
    
                if(!res.data.error) {
                    if(res.data.length > 0) {
                        for(let i = 0; i < res.data.length; i++) {
                            let store = `${res.data[i].year} ${res.data[i].make} ${res.data[i].model}`
                            console.log(store);
                            AsyncStorage.setItem(store.toUpperCase(), JSON.stringify([res.data[i].make, res.data[i].model, res.data[i].year]));
                            AsyncStorage.setItem('quoteNumber', this.state.quoteNumber);
                        }
                    } else {
                        AsyncStorage.setItem('quoteNumber', this.state.quoteNumber);
                    }
                    this.props.navigation.navigate('PersVeh')
                } else {
                    alert('Invalid Quote Number');
                }
            })
            .catch(function (error) {
                console.log('Error ' + error.message)
            })

    }

    render() {
        return(
            <View>
            <View style={styles.inputContainer}>
                <TextInput
                    placeHolder= {"Quote Number"}
                    onChangeText={(text) => this.setState({
                        quoteNumber: text 
                    })}
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    title="Find Quote"
                    color="white"
                    onPress={() => {
                        {this.state.quoteNumber ? this.findQuote() : null}
                    }}
                />
            </View>
        </View>
        )
    }
}

const styles = {
    container: {
        //  justifyContent: 'center',
    },
    vehContainer: {
        paddingBottom: 10
    },
    buttonContainer: {
        margin: 20,
        backgroundColor:'#68a0cf',
        borderRadius:10
    },
    inputContainer: {
        margin: 40,
        borderBottomColor:'#68a0cf',
        height: 25,
        borderBottomWidth: 1
      }
}
