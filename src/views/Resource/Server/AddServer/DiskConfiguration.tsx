import React from 'react';
import { Icon } from '@iconify/react';
import { classnames } from '@@/tailwindcss-classnames';
import { useState } from 'react';

const DiskConfiguration = () :JSX.Element=>{
    const [encryption, changeEncryption] = useState(false);
    return(
        <div id="disk-configuration">
            <div className={classnames('border-2','border-yellow-550')}>
                <div>
                        disk type
                    <select>
                        <option>Standard</option>
                        <option>gp2</option>
                        <option>gp3</option>
                        <option>lo1</option>
                        <option>lo2</option>
                    </select>
                </div>
                <div>
                        size(GiB)
                    <input type="text" defaultValue={8}/>
                </div>
                <div>
                        IOPS
                    <input type="text" defaultValue={'N/A'}/>
                </div>
                <div>
                        Thruputs(MB/s)
                    <input type="text" defaultValue={'N/A'}/>
                </div>
                <div>
                        Disk path: /dev/sda1
                </div>
                <div>
                        Encryption
                    {encryption ? <Icon
                        className={classnames('mx-5')}
                        icon="bi:toggle-on"
                        color="#ce6627"
                        width="50"
                        height="50"
                        fr={undefined}
                        onClick={() => {
                            changeEncryption(!encryption);
                        }}
                    /> : <Icon
                        className={classnames('mx-5')}
                        icon="bi:toggle-off"
                        color="#7c898a"
                        width="50"
                        height="50"
                        fr={undefined}
                        onClick={() => {
                            changeEncryption(!encryption);
                        }}
                    />}

                </div>
            </div>
        </div>
    );
};

export default DiskConfiguration;