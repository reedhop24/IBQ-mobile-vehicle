import React, {Component} from 'react';
import {View, TextInput, Button, AsyncStorage} from 'react-native';
import axios from 'axios';

export default class QuoteLookupScreen extends React.Component {

    constructor() {
        super(props);
        this.state = {
            quoteNumber: null
        }
    }

    findQuote = () => {
        // Learned the hard way that React Native cannot post to local host, so posting to IP address instead.
        axios.post('http://10.0.0.234:3000/find/getQuote', {
                quoteNumber: this.state.quoteNumber
            })
            .then(res => {
                AsyncStorage.clear();
                if(!res.data.error) {
                    if(res.data[0].vehArr.length > 0) {
                        for(let i = 0; i < res.data[0].vehArr.length; i++) {
                            let store = `${res.data[0].vehArr[i].year} ${res.data[0].vehArr[i].make} ${res.data[0].vehArr[i].model}`
                            AsyncStorage.setItem(store.toUpperCase(), JSON.stringify([res.data[0].vehArr[i].make, res.data[0].vehArr[i].model, res.data[0].vehArr[i].year]));
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

    render = () => {
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
