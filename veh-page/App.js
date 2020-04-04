import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import 'react-native-gesture-handler';
import PersVehScreen from './pers-veh/vehicle'
import QuoteLookupScreen from './pers-veh/quoteLookup/quoteLookup'

const AppNavigator = createStackNavigator({
    PersVeh: PersVehScreen,
    QuoteLookUp: QuoteLookupScreen
  }, 
  {
    initialRouteName: 'QuoteLookUp',
  }
);

export default createAppContainer(AppNavigator);
