import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons"
import { Tooltip } from "antd"
import React from "react"
import { useState } from "react"

/**
 * @description: return WrappedComponent with an editable container, WrappedCpt is expected to have a parameter named dashed and assigned to itself
 * @param {*} WrappedComponent
 * @param {*} callback
 * @return
 */
// TODO complete types
const withEdit = (WrappedComponent, callback, border = 'border-dashed') => {
    const [showEdit, setShowEdit] = useState(false)

    const toggleShow = () => {
        setShowEdit(!showEdit)
    }

    const handleSubmit = () => {
        callback()
        toggleShow()
    }

    const editArea = (
        <div className='flex flex-col justify-end ml-2 text-2xl'>
            <Tooltip title="cancel" placement="right">
                <CloseCircleOutlined className="cursor-pointer mb-1 text-red-600" onClick={handleSubmit} />
            </Tooltip>
            <Tooltip title="submit" placement="right">
                <CheckCircleOutlined className="cursor-pointer text-green-600" onClick={toggleShow} />
            </Tooltip>

        </div>
    )
    const test1 = (props) => {
        return (
            <div className='flex'>
                <WrappedComponent dashed={showEdit ? border : ''} {...props} />
                {
                    showEdit ? editArea : null
                }
            </div>
        )
    }
    return [test1, toggleShow]
}


export {
    withEdit
}