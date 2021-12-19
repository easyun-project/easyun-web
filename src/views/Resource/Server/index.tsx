import {serverColumns} from "@/constant/server";
import * as React from "react";
import {NoResource, ResourceTable} from "@/views/Resource";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import {useEffect} from "react";
import {getServerList} from "@/redux/serverSlice";


const serverDataSource = [
    {
        instanceId: 'i-obajb812jn6689n',
        name: 'Web_server_pro',
        instanceState: "Running",
        instanceType: 't3a.medium',
        vCPU: 2,
        RAM: 4,
        storage: '32G',
        os: 'Amazon Linux',
        regionAndAZ: 'cn-northeast-1a',
        publicIpv4: '53.644.16.22'
    },
    {
        instanceId: 'i-obajb812jn6689n',
        name: 'Web_server_pro',
        instanceState: "Running",
        instanceType: 't3a.medium',
        vCPU: 2,
        RAM: 4,
        storage: '32G',
        os: 'Amazon Linux',
        regionAndAZ: 'cn-northeast-1a',
        publicIpv4: '53.644.16.22'
    }, {
        instanceId: 'i-obajb812jn6689n',
        name: 'Web_server_pro',
        instanceState: "Running",
        instanceType: 't3a.medium',
        vCPU: 2,
        RAM: 4,
        storage: '32G',
        os: 'Amazon Linux',
        regionAndAZ: 'cn-northeast-1a',
        publicIpv4: '53.644.16.22'
    }, {
        instanceId: 'i-obajb812jn6689n',
        name: 'Web_server_pro',
        instanceState: "Running",
        instanceType: 't3a.medium',
        vCPU: 2,
        RAM: 4,
        storage: '32G',
        os: 'Amazon Linux',
        regionAndAZ: 'cn-northeast-1a',
        publicIpv4: '53.644.16.22'
    }
]


export const ServerList = () => {
    const userState = useSelector((state: RootState) => {
        return state.user.user
    })

    const serverState = useSelector((state: RootState) => {
        return state.server
    })

    let dispatch = useDispatch();
    useEffect(() => {
        dispatch(getServerList(userState!.token))
    }, [dispatch])

    const serverDataSource = serverState.servers
    console.log(serverState)

    if (serverState.loading) {
        return (
            <div>loading</div>
        )
    } else if (serverDataSource) {
        return (<ResourceTable dataSource={serverDataSource} columns={serverColumns}/>
        )
    } else {
        return <NoResource resourceName={"server"} buttonName={"add server"} routePath={"/addServer"}/>
    }
}