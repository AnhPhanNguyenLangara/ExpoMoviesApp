import SearchListContainer from '../components/SearchListContainer'

const listRoute = '/search'

const searchOptions = [
    {
        label: 'Multi',
        value: '/multi',
    },
    {
        label: 'Movie',
        value: '/movie',
    },
    {
        label: 'TV',
        value: '/tv',
    },
]



export default function SearchScreen() {
    return (
        <SearchListContainer
            listRoute={listRoute}
            options={searchOptions}
        ></SearchListContainer>
    )
}
