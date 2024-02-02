import PickerListContainer from '../components/PickerListContainer'

const listRoute = '/movie'

const movieOptions = [
    {
        label: 'Now Playing',
        value: '/now_playing',
    },
    {
        label: 'Popular',
        value: '/popular',
    },
    {
        label: 'Top Rated',
        value: '/top_rated',
    },
    {
        label: 'Upcoming',
        value: '/upcoming',
    },
]

export default function MoviesScreen() {
    return (
        <PickerListContainer
            listRoute={listRoute}
            options={movieOptions}
        ></PickerListContainer>
    )
}
