import RNPickerSelect from 'react-native-picker-select'
import { useEffect, useState } from 'react'
import {
    ActivityIndicator,
    TextInput,
    HelperText,
    Button,
    Text,
} from 'react-native-paper'
import TitlesList from './TitlesList'
import { StyleSheet, View } from 'react-native'

export default function SearchListContainer({ listRoute, options }) {
    const [hasSearched, setHasSearched] = useState(false)
    const [option, setOption] = useState(null)
    const [query, setQuery] = useState('')
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(false)

    const missingQuery = () => {
        return query === ''
    }

    const noOption = () => {
        return option === null
    }

    const handleSearch = async () => {
        setLoading(true)
        setHasSearched(true)
        let result
        const URL = encodeURI(
            process.env.EXPO_PUBLIC_BASE_URL +
                listRoute +
                option +
                `?query=${query}` +
                '&language=en-US&page=1&api_key=' +
                process.env.EXPO_PUBLIC_API_KEY,
        )
        try {
            const response = await fetch(URL)
            if (response.ok) {
                const data = await response.json()
                result = data.results
            }
        } catch (error) {
            console.error('Error fetching data:', error.message)
            throw error
        }
        let results_padded
        switch (option) {
            case '/movie':
                results_padded = result.map((media) => ({
                    ...media,
                    media_type: 'movie',
                }))
                break
            case '/tv':
                results_padded = result.map((media) => ({
                    ...media,
                    media_type: 'tv',
                }))
                break
            default:
                results_padded = result
        }
        setList(results_padded)
        setLoading(false)
    }

    let output = (
        <Text style={{ textAlign: 'center' }} variant={'titleLarge'}>
            Please initiate a search
        </Text>
    )
    if (loading) {
        output = <ActivityIndicator animating={true} size="large" />
    } else if (list.length > 0) {
        output = <TitlesList list={list} />
    } else if (hasSearched) {
        output = (
            <Text style={{ textAlign: 'center' }} variant={'titleLarge'}>
                Couldn't find any results. Please try a different query
            </Text>
        )
    }
    return (
        <View style={{ paddingVertical: 16, paddingHorizontal: 16 }}>
            <View>
                <TextInput
                    label={'Search Movie/TV Show Name'}
                    value={query}
                    placeholder={'e.g. James Bond, CSI'}
                    onChangeText={(text) => setQuery(text)}
                ></TextInput>
                <HelperText type={'error'} visible={missingQuery()}>
                    Please put query string
                </HelperText>
            </View>
            <View>
                <RNPickerSelect
                    placeholder={{ label: 'Choose Search Type', value: null }}
                    onValueChange={(value) => setOption(value)}
                    items={options}
                    style={pickerSelectStyles}
                ></RNPickerSelect>
                <HelperText type={'error'} visible={noOption()}>
                    Please select search type
                </HelperText>
            </View>
            <Button
                mode={'contained'}
                icon={'magnify'}
                onPress={handleSearch}
                disabled={missingQuery() || noOption()}
                style={{ marginBottom: 48 }}
            >
                Search
            </Button>
            {output}
        </View>
    )
}

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        backgroundColor: 'lightgray',
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 2,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
})
