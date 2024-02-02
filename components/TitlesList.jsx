import { FlatList } from 'react-native'
import ItemCard from './ItemCard'

export default function TitlesList({ list }) {
    return (

        <FlatList
            data={list}
            renderItem={({ item }) => (
                <ItemCard item={item} />
            )}
            keyExtractor={(item) => item.id}
        ></FlatList>
    )
}
