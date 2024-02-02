import { useEffect, useState } from 'react'
import { ActivityIndicator, Text } from 'react-native-paper'
import { Image, ScrollView, Dimensions, StyleSheet } from 'react-native'

const windowWidth = Dimensions.get('window').width

export default function DetailScreen({ route }) {
    const { id, media_type } = route.params
    const [details, setDetails] = useState(null)

    useEffect(() => {
        const fetchDetails = async () => {
            const URL = encodeURI(
                process.env.EXPO_PUBLIC_BASE_URL +
                    `/${media_type}` +
                    `/${id}` +
                    '?api_key=' +
                    process.env.EXPO_PUBLIC_API_KEY,
            )
            // console.log(URL)
            try {
                const response = await fetch(URL)
                if (response.ok) {
                    return await response.json()
                }
            } catch (error) {
                console.error('Error fetching data:', error.message)
                throw error
            }
        }
        fetchDetails().then((result) => setDetails(result))
    }, [])

    let detailsOutput = null
    if (details) {
        if (media_type === 'movie') {
            const { title, poster_path, overview, popularity, release_date } =
                details
            detailsOutput = (
                <ScrollView contentContainerStyle={styles.screen}>
                    <Text variant={'headlineMedium'} style={styles.title}>
                        {title}
                    </Text>
                    <Image
                        source={{
                            uri:
                                process.env.EXPO_PUBLIC_BASE_IMG_URL +
                                poster_path,
                        }}
                        style={styles.poster}
                    ></Image>
                    <Text>{overview}</Text>
                    <Text>
                        Popularity: {popularity} | Release date: {release_date}
                    </Text>
                </ScrollView>
            )
        } else if (media_type === 'tv') {
            const { name, poster_path, overview, popularity, first_air_date } =
                details
            detailsOutput = (
                <ScrollView contentContainerStyle={styles.screen}>
                    <Text variant={'headlineMedium'} style={styles.title}>
                        {name}
                    </Text>
                    <Image
                        source={{
                            uri:
                                process.env.EXPO_PUBLIC_BASE_IMG_URL +
                                poster_path,
                        }}
                        style={styles.poster}
                    ></Image>
                    <Text>{overview}</Text>
                    <Text>
                        Popularity: {popularity} | Release date:{' '}
                        {first_air_date}
                    </Text>
                </ScrollView>
            )
        } else if (media_type === 'person') {
            const {
                name,
                profile_path,
                biography,
                popularity,
                known_for_department,
            } = details
            detailsOutput = (
                <ScrollView contentContainerStyle={styles.screen}>
                    <Text variant={'headlineMedium'} style={styles.title}>
                        {name}
                    </Text>
                    <Image
                        source={{
                            uri:
                                process.env.EXPO_PUBLIC_BASE_IMG_URL +
                                profile_path,
                        }}
                        style={styles.poster}
                    ></Image>
                    <Text>{biography}</Text>
                    <Text>
                        Popularity: {popularity} | Known for:{' '}
                        {known_for_department}
                    </Text>
                </ScrollView>
            )
        }
    }
    return details ? (
        detailsOutput
    ) : (
        <ActivityIndicator animating={true} size={'large'}></ActivityIndicator>
    )
}

const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        textAlign: 'center',
    },
    poster: {
        width: windowWidth - 32,
        height: ((windowWidth - 32) * 3) / 2,
    },
    screen: {
        paddingHorizontal: 32,
        paddingVertical: 32,
        alignItems: 'center',
        gap: 16,
    },
})
