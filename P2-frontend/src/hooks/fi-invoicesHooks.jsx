import {  useState } from 'react'

function showMore() {
    const [showMoreInfo, setShowMoreInfo] = useState(false)
    return {showMoreInfo, setShowMoreInfo}
}

export {showMore}