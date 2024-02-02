import { FlatList } from 'react-native'
import ItemCard from './ItemCard'
import { Divider } from 'react-native-paper'

export default function TitlesList({ list }) {
    return (
        <FlatList
            data={list}
            renderItem={({ item }) => <ItemCard item={item} />}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <Divider></Divider>}
        ></FlatList>
    )
}
