import { useParams } from 'react-router-dom'

function Search() {
    const { keyword } = useParams()

    console.log(keyword);
    return (
        <div>key word: {keyword}</div>
    )
}

export default Search;