import { StyleSheet } from 'react-native'
import { Appbar, PaperProvider, Text } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useTheme } from 'react-native-paper'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import MoviesScreen from './screens/MoviesScreen'
import SearchScreen from './screens/SearchScreen'
import TVScreen from './screens/TVScreen'
import DetailScreen from './screens/DetailScreen'

const Stack = createNativeStackNavigator()
const Tab = createMaterialTopTabNavigator()
export default function App() {
    return (
        <PaperProvider>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="List"
                        component={ListScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="Details"
                        component={DetailScreen}
                        options={({ route }) => ({ title: route.params.title })}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
    )
}

function ListScreen() {
    const theme = useTheme()
    return (
        <>
            <Appbar.Header
                style={[
                    styles.appbar,
                    { backgroundColor: theme.colors.primary },
                ]}
            >
                {/*<Appbar.Content title={'Movie App'} color='white' />*/}
                <Text variant="titleLarge" style={[styles.apptitle]}>
                    Movies App
                </Text>
            </Appbar.Header>
            <Tab.Navigator
                screenOptions={{
                    tabBarLabelStyle: { fontSize: 12 },
                    tabBarIndicatorStyle: {
                        backgroundColor: theme.colors.primary,
                    },
                }}
            >
                <Tab.Screen name="Movies" component={MoviesScreen} />
                <Tab.Screen name="Search Results" component={SearchScreen} />
                <Tab.Screen name="TV Shows" component={TVScreen} />
            </Tab.Navigator>
        </>
    )
}

const styles = StyleSheet.create({
    apptitle: {
        color: 'white',
    },
    appbar: {
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
