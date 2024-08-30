import React from 'react'

const RunButton = ({loading, handelRunCode}) => {
    return (
        <button disabled={loading} type="button" onClick={handelRunCode} className="p-1 px-3 disabled:bg-gray-500 bg-[#ff8000] text-black font-semibold flex items-center">
            {loading ? <><span className="loading loading-spinner loading-sm"></span>  Running...</> : "Run Code"}
        </button>
    )
}

export default RunButton