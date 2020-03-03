import React from 'react';
import { Button, Text, View, TextInput} from 'react-native';

function VehLookup(props) {
    const inputAccessoryViewID = "uniqueID";
    return (
        <View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={{fontSize: 25}}
                    placeholder= {props.stateProp.year ? props.stateProp.year: "Year"}
                    onChangeText={(text) => props.typeVeh('year', text)}
                    inputAccessoryViewID={inputAccessoryViewID}
                /> 
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={{fontSize: 25}}
                    placeholder= {props.stateProp.make ? props.stateProp.make: "Make"}
                    onChangeText={(text) => props.typeVeh('make', text)}
                /> 
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={{fontSize: 25}}
                    placeholder= {props.stateProp.model ? props.stateProp.model: "Model"}
                    onChangeText={(text) => props.typeVeh('model', text)}
                /> 
            </View>
            <View style={styles.innerButtonContainer}> 
                <Button
                    title="Submit Vehicle"
                    color="white"
                    onPress={props.validate}
                />
            </View>
            <View style={styles.innerButtonContainer}> 
                <Button
                    title="Remove Vehicle"
                    color="white"
                    onPress={() => props.rmVeh()}
                />
            </View>
                {/* Need below in order to keep scrolling right.*/}
                <Text style={styles.bottomBreak}>
                </Text>
                <Text style={styles.bottomBreak}>
                </Text>
                <Text style={styles.bottomBreak}>
                </Text>
        </View>
    )
}

export default VehLookup

const styles = {
    innerButtonContainer: {
        margin: 40,
        backgroundColor:'#68a0cf',
        borderRadius:10,
        flex:1
    },
    inputContainer: {
        margin: 40,
        borderBottomColor:'#68a0cf',
        height: 25,
        borderBottomWidth: 1
      },
    bottomBreak: {
        flex:1,
        margin: 40,
    }
};