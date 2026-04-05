import React from 'react';
import { DbiModel } from '@/constant/database';
import { ResourceCard } from '@/components/ui/resource-card';
import defaultIcon from '@@/src/assets/images/resource/database.png';
import auroraIcon from '@@/src/assets/images/resource/res_aws_db_aurora.svg';
import mysqlIcon from '@@/src/assets/images/resource/res_aws_db_mysql.svg';
import mariaIcon from '@@/src/assets/images/resource/res_aws_db_mariadb.svg';
import postgresIcon from '@@/src/assets/images/resource/res_aws_db_postgres.svg';
import oracleIcon from '@@/src/assets/images/resource/res_aws_db_oracle.svg';
import sqlserverIcon from '@@/src/assets/images/resource/res_aws_db_sqlserver.svg';

const engineIcons: Record<string, string> = {
    aurora: auroraIcon, mysql: mysqlIcon, postgres: postgresIcon,
    maria: mariaIcon, oracle: oracleIcon, sqlserver: sqlserverIcon,
};

export default function DatabaseCard(props: DbiModel) {
    const { dbiId, dbiStatus, dbiEngine, engineVer, dbiSize, ramSize, vcpuNum, volumeSize, dbiAz } = props;
    return (
        <ResourceCard
            icon={<img src={engineIcons[dbiEngine] || defaultIcon} alt="Database" width="50" />}
            title={dbiId}
            titleLink={dbiId}
            subtitle={`version: ${engineVer}`}
            status={dbiStatus}
            bgClass={dbiStatus === 'available' ? 'bg-gray-200' : 'bg-amber-50'}
            actions={[
                { label: 'Manage', onClick: () => console.log('Manage') },
                { label: 'Delete', onClick: () => console.log('Delete'), danger: true },
            ]}
            footerLeft={`${dbiSize} (${vcpuNum}*vCPU, ${ramSize}GB, ${volumeSize}GiB)`}
            footerRight={dbiAz}
        />
    );
}
