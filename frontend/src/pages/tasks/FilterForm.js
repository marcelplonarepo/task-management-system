const filterForm = ({filters, setType, setStatus, setTextSearch, setMinPoints, setMaxPoints, setStart, setEnd}) => {
    return (
        <>
            <div>
                <label>
                    Tasks
                </label>
                <select defaultValue={filters.type} onChange={setType}>
                    <option value="1">My</option>
                    <option value="2">Others</option>
                </select>
            </div>

            <div>
                <label>
                    Type
                </label>
                <select defaultValue={filters.status} onChange={setStatus}>
                    <option value="1">All</option>
                    <option value="2">Done</option>
                    <option value="3" >To do</option>
                </select>
            </div>

            <div>
                <label>
                    Search
                </label>
                <input type="text" placeholder="Search..." onChange={setTextSearch}></input>
            </div>

            <div>
                <label>
                    Min points
                </label>
                <input type="text" placeholder="Min" onChange={setMinPoints}></input>
            </div>

            <div>
                <label>
                    Max points
                </label>
                <input type="text" placeholder="Max" onChange={setMaxPoints}></input>
            </div>

            <div>
                <label>
                    Starts
                </label>
                <input type="date" onChange={setStart}></input>
            </div>

            <div>
                <label>
                    Ends
                </label>
                <input type="date" onChange={setEnd}></input>
            </div></>
    );
}

export default filterForm;