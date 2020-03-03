import React, {Component} from 'react';
import { Button, View, Keyboard, ScrollView, AsyncStorage } from 'react-native';
import VinLookup from './vin';
import VehLookup from './lookUp';
import axios from 'axios';

export default class PersVehScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            status: false,
            vin: null,
            year: null,
            make: null,
            model: null,
            verified: false,
            loop: []
        }
    }

    handleDisplay() {
        this.setState({
            status: this.state.verified ? true : !this.state.status,
            vin: null,
            year: null,
            make: null,
            model: null,
            verified: false
        })
    }

    submitVin() {
        axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/${this.state.vin}?format=json`)
            .then(res => {
                if(res.data.Results[6].Value && res.data.Results[8].Value && res.data.Results[9].Value && res.data.Results[13].Value) {
                    this.setState({
                        make: res.data.Results[6].Value,
                        model: res.data.Results[8].Value,
                        year: res.data.Results[9].Value,
                        style: res.data.Results[13].Value
                     })
                } else {
                    alert('Please Enter a Valid VIN')
                    this.setState({
                        make: null,
                        model: null,
                        year: null
                     })
                }
            })
        Keyboard.dismiss();
    }

    validateVeh() {
        if(this.state.make && this.state.model && this.state.year) {
            axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeYear/make/${this.state.make}/modelyear/${this.state.year}?format=json`)
            .then((res) => {
                let resArr = res.data.Results;
                for(let i = 0; i < resArr.length; i++) {
                    if(resArr[i].Model_Name.toUpperCase() === this.state.model.toUpperCase()) {
                        this.setState({
                            verified: true
                        })
                    }
                }

                if(this.state.verified) {
                    let store = `${this.state.year} ${this.state.make} ${this.state.model}`
                    AsyncStorage.setItem(store.toUpperCase(), JSON.stringify([this.state.make, this.state.model, this.state.year]));
                } else {
                    alert('Invalid Vehicle')
                }

                (async () => {
                    const keys = await AsyncStorage.getAllKeys();
                    const result = await AsyncStorage.multiGet(keys);
                    let vehicleArr = [];
                    for(let i = 0; i < result.length; i++) {
                        if(result[i][0] !== 'quoteNumber') {
                            vehicleArr.push(result[i][0]);
                        }
                    }
                    this.setState({
                        loop: vehicleArr
                    });
                })();
            })
        } else {
            alert('Please enter a Vehicle')
        }
    }

    displayVeh(veh) {
        (async () => {
            const loaded = JSON.parse(await AsyncStorage.getItem(veh));
            this.setState({
                status: true,
                verified: false,
                make: loaded[0],
                model: loaded[1],
                year: loaded[2],
                style:loaded[3] 
            })
            let key = `${this.state.year} ${this.state.make} ${this.state.model}`.toUpperCase();
            // If a user enters a veh to edit it, we need to remove the current vehicle so we remove from storage but save to State so it can be 
            // displayed in text boxes
            await AsyncStorage.removeItem(key);
        })();
    }

    componentDidMount() {
        (async () => {
            const keys = await AsyncStorage.getAllKeys();
            const result = await AsyncStorage.multiGet(keys);
            let vehicleArr = [];
            for(let i = 0; i < result.length; i++) {
                if(result[i][0] !== 'quoteNumber') {
                    vehicleArr.push(result[i][0]);
                }
            }
            this.setState({
                loop: vehicleArr
            });
        })();
    }

    subToDB() {
        (async () => {
            const keys = await AsyncStorage.getAllKeys();
            const result = await AsyncStorage.multiGet(keys);
            let allVeh = [];
            let quoteNum;
            for(let i = 0; i < result.length; i++) {
                if(result[i][0] !== 'quoteNumber') {
                    let obj = {};
                    const arr = result[i][0].split(' ');
                    obj.make = arr[1];
                    obj.model = arr[2];
                    obj.year = arr[0];
                    allVeh.push(obj);
                } else {
                    quoteNum = result[i][1];
                }
            }
            
            axios.post('http://10.0.0.234:3000/quote/postQuote', {
                quoteNumber: quoteNum,
                vehObj: allVeh
            }).then((res) => {}) 
        })();
    }

    removeVehicle(year, make, model) {
        (async () => {
            let key = `${year} ${make} ${model}`.toUpperCase();
            await AsyncStorage.removeItem(key);
            let updateLoop = [];
            for(let i = 0; i < this.state.loop.length; i++) {
                if(this.state.loop[i] !== key) {
                    updateLoop.push(this.state.loop[i]);
                }
            }
            this.setState({
                verified: true,
                loop: updateLoop
            })
        })();
    }

    render() {
        return(
            <View>
                {!this.state.verified && !this.state.status || this.state.verified && this.state.status ? 
                    <View style={styles.buttonContainer}>
                        <Button
                            title="Add New Vehicle"
                            onPress={() => this.handleDisplay()}
                            color="white"
                        />
                    </View> 
                : null}

                {this.state.status && !this.state.verified ? 
                    <ScrollView style={styles.vehContainer}>
                        <VinLookup onChange={(i) => this.setState({vin: i})} subVin={() => this.submitVin()}/>
                        <VehLookup stateProp={this.state} validate={() => this.validateVeh(this.state.model, this.state.make, this.state.year)} typeVeh={(j, i) => this.setState({[j]: i})} rmVeh={() => this.removeVehicle(this.state.year, this.state.make, this.state.model)}/>
                    </ScrollView>
                : null}

                {this.state.loop.length > 0 ? 
                    this.state.loop.map((x) => 
                        <View style={styles.buttonContainer}>
                            <Button 
                                title={x}
                                onPress={() => {this.displayVeh(x)}}
                                color={'white'}
                            />
                        </View>)
                : null}

                <View style={styles.buttonContainer}>
                    <Button
                        title="Garage Info"
                        color="white"
                        onPress={() => this.subToDB()}
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
};