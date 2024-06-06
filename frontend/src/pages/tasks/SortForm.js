const SortForm = ({sorts, setSortBy, setOrder}) => {
    return ( <>

        <div>
            <label>
                Sort by
            </label>

            <select defaultValue={sorts.sortBy} onChange={setSortBy}>
                <option value="0">None</option>
                <option value="1">Text</option>
                <option value="2">Points</option>
                <option value="3" >Date</option>
            </select>

        </div>

        <div>
            <label>
                Order
            </label>
            <select defaultValue={sorts.order} onChange={setOrder}>
                <option value="1">Ascending</option>
                <option value="2">Descending</option>
            </select>
        </div>
    </> );
}
 
export default SortForm;