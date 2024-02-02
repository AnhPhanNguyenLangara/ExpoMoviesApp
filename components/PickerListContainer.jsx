import RNPickerSelect from 'react-native-picker-select'
import { useEffect, useState } from 'react'
import { ActivityIndicator } from 'react-native-paper'
import TitlesList from './TitlesList'
import { StyleSheet, View } from 'react-native'

export default function PickerListContainer({ listRoute, options }) {
    const [option, setOption] = useState(options[0].value)
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const abortController = new AbortController()
        setLoading(true)
        const fetchList = async () => {
            const URL = encodeURI(
                process.env.EXPO_PUBLIC_BASE_URL +
                    listRoute +
                    option +
                    '?language=en-US&page=1&api_key=' +
                    process.env.EXPO_PUBLIC_API_KEY,
            )
            try {
                const response = await fetch(URL, {
                    signal: abortController.signal,
                })
                if (response.ok) {
                    const data = await response.json()
                    return data.results
                }
            } catch (error) {
                console.error('Error fetching data:', error.message)
                throw error
            }
        }
        fetchList().then((results) => {
            let results_padded
            switch (listRoute) {
                case '/movie':
                    results_padded = results.map((media) => ({
                        ...media,
                        media_type: 'movie',
                    }))
                    break
                case '/tv':
                    results_padded = results.map((media) => ({
                        ...media,
                        media_type: 'tv',
                    }))
                    break
                default:
                    results_padded = results
            }
            setList(results_padded)
            setLoading(false)
        })
        return () => {
            abortController.abort()
        }
    }, [option])

    let output = <ActivityIndicator animating={true} size="large" />
    if (!loading) {
        output = <TitlesList list={list} />
    }
    return (
        <View style={{ paddingVertical: 16, paddingHorizontal: 8, gap: 16 }}>
            <RNPickerSelect
                placeholder={{}}
                onValueChange={(value) => setOption(value)}
                items={options}
                style={pickerSelectStyles}
            ></RNPickerSelect>
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
