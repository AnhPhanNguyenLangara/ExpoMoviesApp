import { Card, Button } from 'react-native-paper'
import { Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { View } from 'react-native'

export default function ItemCard({ item }) {
    const navigation = useNavigation()
    let cardOutput

    if (item.media_type === 'movie') {
        const { id, poster_path, title, popularity, release_date } = item
        cardOutput = (
            <View style={{ flexDirection: 'row', paddingVertical: 16 }}>
                <Card.Cover
                    source={{
                        uri: process.env.EXPO_PUBLIC_BASE_IMG_URL + poster_path,
                    }}
                    style={{ flex: 1 }}
                />
                <View style={{ flex: 2 }}>
                    <Card.Title
                        title={title}
                        titleStyle={{ fontWeight: 'bold' }}
                    />
                    <Card.Content>
                        <Text variant="bodyLarge">
                            Popularity: {popularity}
                        </Text>
                        <Text variant="bodyLarge">
                            Release Date: {release_date}
                        </Text>
                    </Card.Content>
                    <Card.Actions>
                        <Button
                            style={{ flex: 1 }}
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
                </View>
            </View>
        )
    } else if (item.media_type === 'tv') {
        const { id, poster_path, name, popularity, first_air_date } = item
        cardOutput = (
            <View style={{ flexDirection: 'row', paddingVertical: 16 }}>
                <Card.Cover
                    source={{
                        uri: process.env.EXPO_PUBLIC_BASE_IMG_URL + poster_path,
                    }}
                    style={{ flex: 1 }}
                />
                <View style={{ flex: 2 }}>
                    <Card.Title
                        title={name}
                        titleStyle={{ fontWeight: 'bold' }}
                    />
                    <Card.Content>
                        <Text variant="bodyLarge">
                            Popularity: {popularity}
                        </Text>
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
                </View>
            </View>
        )
    } else if (item.media_type === 'person') {
        const { id, profile_path, name, popularity, known_for_department } =
            item
        cardOutput = (
            <View style={{ flexDirection: 'row', paddingVertical: 16 }}>
                <Card.Cover
                    source={{
                        uri:
                            process.env.EXPO_PUBLIC_BASE_IMG_URL + profile_path,
                    }}
                    style={{ flex: 1 }}
                />
                <View style={{ flex: 2 }}>
                    <Card.Title
                        title={name}
                        titleStyle={{ fontWeight: 'bold' }}
                    />
                    <Card.Content>
                        <Text variant="bodyLarge">
                            Popularity: {popularity}
                        </Text>
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
                </View>
            </View>
        )
    } else {
        console.log('Object missing media type metadata!')
        console.log('Object: ', item)
    }

    return cardOutput
}
