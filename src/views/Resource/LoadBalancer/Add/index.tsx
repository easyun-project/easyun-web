import { Loader2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { SimpleSelect as Select, SimpleOption as Option } from '@/components/ui/simple-select';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '@/redux/store';
import { RootState } from '@/redux/store';
import { Icon } from '@iconify/react';
import CPlatform from '@/components/Logic/CPlatform';
import { Button } from '@/components/ui/button';

// import LoadbalancerService from '@/service/LoadbalancerService';
import { RegionItem  } from '@/constant/dataCenter';
import FlagUtil from '@/utils/flagUtil';




export interface InsTypeFamily {
    catdesCode: string
    catgName: string
    familyDes: string
    familyName: string
}


const AddLoadbalancer = (): JSX.Element => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const flagUtil = new FlagUtil();

    const [creating, setCreating] = useState(false);
    //Loadbalancer tag and name
    const [tagName, setTagName] = useState('LoadBalancer-');
    const [regionCode, setRegionCode] = useState('');

    const [validStatus, setValidStatus] = useState(false);

    const cloudState = useSelector((state: RootState) => {
        return state.dataCenter;
    });
    const regionList = cloudState.regionList;
    const dcParams = cloudState.datacenterParams?.dcParms;

    useEffect(() => {
        console.log('add loadbalancer');
    }, []);


    return (
        <>
            <div className="flex gap-4">
                <div className="w-full">
                    <Icon className='inline-block mx-1' width="25"
                        icon="ant-design:plus-circle-twotone" />
                    <h3 style={{ display: 'inline-block' }}>Add a new load balancer</h3>
                    <span>A load balancer distributes traffic among multiple servers to share the load.</span>
                </div>
            </div>
            <hr className="my-4 border-gray-200" />

            <div className={"rounded-border mt-5"}><h5 className="font-semibold mb-2">Identify your load balancer</h5>
                <span>Your Lightsail load balancers must all have unique names.</span>
                <div className='flex items-center'>
                    <Input className={"w-36"} type="text"
                        defaultValue={tagName}
                        onChange={e => setTagName(e.target.value)} />
                </div>
            </div>

            <div className="flex gap-4">
                <div className="flex-1">
                    <h5>Identify your Loadbalancer</h5>
                    <div className="flex items-center gap-2 ml-4">
                        <label>Name:</label>
                        <Input
                            onChange={(e) => { setTagName(e.target.value); }}
                            onBlur={(e) => { setValidStatus(!!e.target.value); }}
                            type="text" placeholder="Load balancer name" className="w-72" required />
                    </div>

                    <span className={"inline-block ml-4 my-2"}>Region:</span>
                    <Select defaultValue={dcParams?.dcRegion} disabled={!validStatus}
                        onValueChange={(value) => {
                            setRegionCode(value);
                            // getDcParams();
                        }} >
                        {regionList?.map((item: any, index) => {
                            return (<Option key={index} value={item.regionCode}> {item.regionCode} - {item.regionName} </Option>);
                        })}
                    </Select>
                    <Icon icon={flagUtil.getFlagIconByRegion(regionCode)}
                        className={"ml-5 inline-block"} color="#5c6f9a" width="25" height="25" fr={undefined} />
                </div>
            </div>


            <div className="flex flex-wrap">
                <div className="flex-1">
                    <div className={"flex justify-center m-16"}>
                        <Button onClick={() => {
                            navigate('/resource/loadbalancer');
                        }} className={"bg-gray-400 text-white"}>
                            <Icon className={"inline-block mr-2"} icon="akar-icons:arrow-left"
                                color="white"
                                width="20" height="20" fr={undefined} />
                            Back</Button>
                        <Button
                            disabled={!validStatus}
                            
                            onClick={() => {
                                if (tagName == '') {
                                    setValidStatus(false);
                                    toast.error('Please input a valid load balancer name');
                                    return;
                                }

                                setCreating(true);
                                // LoadbalancerService.addLoadbalancer({
                                //     'BlockDeviceMappings': disks,
                                //     'ImageId': selectedAmi,
                                //     'InstanceType': selectedIns,
                                //     'KeyName': selectedKey,
                                //     'SecurityGroupIds': slectedSecgroups,
                                //     'SubnetId': selectedSubnet,
                                //     'dcName': dc,
                                //     'svrNumber': svrNumber,
                                //     'tagName': tagName
                                // }).then(
                                //     () => {
                                //         changeCreating(false);
                                //         alert('创建成功');
                                //         navigate('/resource/loadbalancer');
                                //     },
                                //     () => {
                                //         changeCreating(false);
                                //         alert('创建失败');
                                //     },
                                // );
                            }}
                        >Create</Button>
                    </div>
                </div>
            </div>
        </>
    );
};


export default AddLoadbalancer;