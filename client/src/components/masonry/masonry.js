import { memo, useMemo } from "react";

// divide array will divide the total number of elements into columns depending on the screen size
const divideArray = (array, length) => {
    const newArray = [...array]
    const divideRes = Math.floor(newArray.length/length)
    let results = []

    for (let i = 0; i < length; i++) {    
        results.push(newArray.splice(0, divideRes))
    }

    for (let i = 0; i < newArray.length; i++) {
        results[i].push(newArray[i])
    }

    results = results.filter(itm => itm.length)

    return results
}

const masonryContainerStyle = {
    display: 'flex',
    justifyContent: 'center'
}

const masonryColumnStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
}

const Masonry = ({ dataArray, columnCount, ChildsElement }) => {

    const arr = useMemo(() => divideArray(dataArray, columnCount), [columnCount, dataArray]);

        return (
            <div style={masonryContainerStyle}>
                {
                    arr?.map((itm, i) => (
                        
                        <div key={i} style={masonryColumnStyle}>
                            {
                                itm?.map((elm, i) => <ChildsElement value={elm} key={elm?._id ?? i}/>)
                            }
                        </div>
                    ))
                }
            </div>
        )
}

export default memo(Masonry)