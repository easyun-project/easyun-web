import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons"
import { Icon } from "@iconify/react"
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
        <div className='flex flex-col justify-end ml-3 text-2xl'>
            <Tooltip title="cancel" placement="right">
                <div onClick={handleSubmit} className="mb-2">
                    <Icon className="cursor-pointer mb-1 text-red-600" icon="mdi:cancel" fr={undefined} />
                </div>
            </Tooltip>
            <Tooltip title="submit" placement="right">
                <div onClick={toggleShow}>
                    <Icon className="cursor-pointer text-green-600" icon="mdi:checkbox-marked-circle-outline" fr={undefined}></Icon>
                </div>
            </Tooltip>

        </div>
    )
    const editContainer = (props) => {
        return (
            <div className='flex'>
                <WrappedComponent dashed={showEdit ? border : ''} {...props} />
                {
                    showEdit ? editArea : null
                }
            </div>
        )
    }
    return [editContainer, toggleShow]
}


export {
    withEdit
}