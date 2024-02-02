import PickerListContainer from '../components/PickerListContainer'

const listRoute = '/tv'

const tvOptions = [
    {
        label: 'Airing today',
        value: '/airing_today',
    },
    {
        label: 'On The Air',
        value: '/on_the_air',
    },
    {
        label: 'Popular',
        value: '/popular',
    },
    {
        label: 'Top Rated',
        value: '/top_rated',
    },
]

export default function TVScreen() {
    return (
        <PickerListContainer
            listRoute={listRoute}
            options={tvOptions}
        ></PickerListContainer>
    )
}
