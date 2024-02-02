import { Card, Button } from 'react-native-paper'
import { Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export default function ItemCard({ item }) {

    const navigation = useNavigation()
    let cardOutput

    if (item.media_type === 'movie') {
        const { id, poster_path, title, popularity, release_date } = item
        cardOutput = (
            <Card>
                <Card.Cover
                    source={{ uri: process.env.EXPO_PUBLIC_BASE_IMG_URL + poster_path }}
                />
                <Card.Title title={title} />
                <Card.Content>
                    <Text variant="bodyLarge">Popularity: {popularity}</Text>
                    <Text variant="bodyLarge">
                        Release Date: {release_date}
                    </Text>
                </Card.Content>
                <Card.Actions>
                    <Button
                        mode="contained"
                        onPress={() =>
                            navigation.navigate('Details', {
                                title: title,
                                id: id,
                                media_type: item.media_type,
                            })
                        }
                    >
                        More Details
                    </Button>
                </Card.Actions>
            </Card>
        )
    } else if (item.media_type === 'tv') {
        const { id, poster_path, name, popularity, first_air_date } = item
        cardOutput = (
            <Card>
                <Card.Cover
                    source={{ uri: process.env.EXPO_PUBLIC_BASE_IMG_URL + poster_path }}
                />
                <Card.Title title={name} />
                <Card.Content>
                    <Text variant="bodyLarge">Popularity: {popularity}</Text>
                    <Text variant="bodyLarge">
                        Release Date: {first_air_date}
                    </Text>
                </Card.Content>
                <Card.Actions>
                    <Button
                        mode="contained"
                        onPress={() =>
                            navigation.navigate('Details', {
                                title: name,
                                id: id,
                                media_type: item.media_type,
                            })
                        }
                    >
                        More Details
                    </Button>
                </Card.Actions>
            </Card>
        )
    } else if (item.media_type === 'person') {
        const { id, profile_path, name, popularity, known_for_department} = item
        cardOutput = (
            <Card>
                <Card.Cover
                    source={{ uri: process.env.EXPO_PUBLIC_BASE_IMG_URL + profile_path }}
                />
                <Card.Title title={name} />
                <Card.Content>
                    <Text variant="bodyLarge">Popularity: {popularity}</Text>
                    <Text variant="bodyLarge">
                        Known for: {known_for_department}
                    </Text>
                </Card.Content>
                <Card.Actions>
                    <Button
                        mode="contained"
                        onPress={() =>
                            navigation.navigate('Details', {
                                title: name,
                                id: id,
                                media_type: item.media_type,
                            })
                        }
                    >
                        More Details
                    </Button>
                </Card.Actions>
            </Card>
        )
    } else {
        console.log('Object missing media type metadata!')
        console.log('Object: ',item)
    }

    return cardOutput
}
