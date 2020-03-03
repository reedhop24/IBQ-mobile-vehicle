import React from 'react';
import { Button, View, TextInput} from 'react-native';

function VinLookup(props) {
    return (
        <View>
            <View style={styles.inputContainer}>
                <TextInput
                    onChangeText={text => props.onChange(text)}
                    style={{fontSize: 25}}
                    placeholder="VIN"
                /> 
            </View>
            <View style={styles.innerButtonContainer}>
                <Button
                    onPress={props.subVin}
                    title="VIN Lookup"
                    color="white"
                /> 
            </View>
        </View>
    )
}

export default VinLookup

const styles = {
    innerButtonContainer: {
        margin: 40,
        backgroundColor:'#68a0cf',
        borderRadius:8
    },
    inputContainer: {
        margin: 40,
        borderBottomColor:'#68a0cf',
        height: 25,
        borderBottomWidth: 1
      },
};