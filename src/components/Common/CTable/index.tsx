import React from 'react';
import { classnames, TTailwindString } from '@@/tailwindcss-classnames';
import { Icon } from '@iconify/react';

export interface configType {
	isShowTitle: boolean;
	isShowTableHeader: boolean;
	title?: string;
	isFull?: boolean;
	tabelRowTitleClassNames?: TTailwindString;
	tabbelColumnTitleClassNames?: TTailwindString;
}
export interface dataType {
	name: string;
	country: {
		icon?: string;
		text: string;
	};
	light: boolean;
	subnet: string;
}
export interface dataConfigType {
	config: configType;
	data: Array<dataType>;
	tableTitle: string[];
}
export interface PropsType {
	children?: HTMLElement;
	classes?: TTailwindString;
	dataConfig: dataConfigType;
}
export const CTable = (props: PropsType): JSX.Element => {
    const { config } = props.dataConfig;
    const { data } = props.dataConfig;
    const { tableTitle } = props.dataConfig;
    const { isShowTitle } = config;
    const { isShowTableHeader } = config;
    const { title } = config;
    const { isFull } = config;
    const { tabelRowTitleClassNames } = config;
    const { tabbelColumnTitleClassNames } = config;
    const containerHasTitle = classnames('w-auto', 'mx-3', 'my-2', 'inline-block', 'border', 'rounded', 'shadow', 'max-h-80', 'overflow-y-scroll');
    const container = classnames('w-auto', 'mx-3', 'my-2', 'inline-block', 'max-h-80', 'overflow-y-scroll');
    const iconFlag = (country: string): JSX.Element => (
        <span className={classnames('inline-block', 'pr-1', 'h-4')}>
            <Icon className={'ml-5'} icon={`twemoji:flag-for-flag-${country}`} color='#5c6f9a' width='25' height='25' fr={undefined} />
        </span>
    );
    const iconCircle = (light: boolean): JSX.Element => (
        <span>
            <Icon className={'ml-5'}
                icon='akar-icons:circle-fill'
                color={light ? '#ffc000' : '#afabab'}
                width='25'
                height='25'
                fr={undefined} />
        </span>
    );
    return (
        <div className={`${isShowTitle ? containerHasTitle : container} ${'hidden-scroll flex-1 min-w-30'} ${isFull ? 'fill-available' : ''}`}>
            {isShowTitle ? <div className={classnames('p-4', 'border-b', 'w-auto')}>{title}</div> : null}
            <div>
                <table className={classnames('table', 'w-full', 'border-collapse')}>
                    {isShowTableHeader
                        ? (
                            <thead className={`${classnames('table-row-group')} ${tabelRowTitleClassNames}`}>
                                {tableTitle.map((row, index) => (
                                    <th key={index} className={classnames('font-medium', 'text-sm', 'tracking-wide', 'table-cell', 'border-b', 'border-gray-200', 'p-4', 'text-left', 'text-gray-600')}>
                                        {row}
                                    </th>
                                ))}
                            </thead>
                        )
                        : null}
                    <tbody className={classnames('table-row-group')}>
                        {data.map((row, index) => (
                            <tr key={index} className={classnames('table-row', 'align-middle', 'outline-none')}>
                                {
                                    Object.keys(row).map((val, idx) => (
                                        <th key={idx} className={`${classnames('text-sm', 'tracking-wide', 'table-cell', 'border-b', 'border-gray-200', 'p-4', 'text-left', 'text-gray-600', 'font-normal', 'flex')} ${idx === 0 ? tabbelColumnTitleClassNames : ''}`} scope='row'>
                                            {row[val].icon ? iconFlag(row[val].icon) : null}
                                            {typeof row[val] === 'object' ? <span className={classnames('h-4')}>{row[val].text}</span> : <span>{row[val]}</span>}
                                            {val === 'light' ? iconCircle(row[val]) : null}
                                        </th>
                                    ))
                                }
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};



// export const CTable = (props: PropsType): JSX.Element => {
//     const { config } = props.dataConfig;
//     const { data } = props.dataConfig;
//     const { tableTitle } = props.dataConfig;
//     const { isShowTitle } = config;
//     const { isShowTableHeader } = config;
//     const { title } = config;
//     const { isFull } = config;
//     const { tabelRowTitleClassNames } = config;
//     const { tabbelColumnTitleClassNames } = config;
//     const containerHasTitle = classnames('w-auto', 'mx-3', 'my-2', 'inline-block', 'border', 'rounded', 'shadow', 'max-h-80', 'overflow-y-scroll');
//     const container = classnames('w-auto', 'mx-3', 'my-2', 'inline-block', 'max-h-80', 'overflow-y-scroll');
//     const iconFlag = (country: string): JSX.Element => (
//         <span className={classnames('inline-block', 'pr-1', 'h-4')}>
//             <Icon className={'ml-5'} icon={`twemoji:flag-for-flag-${country}`} color='#5c6f9a' width='25' height='25' fr={undefined} />
//         </span>
//     );

//     const iconCircle = (light: boolean): JSX.Element => (
//         <span>
//             <Icon className={'ml-5'} icon='akar-icons:circle-fill' color={light ? '#ffc000' : '#afabab'} width='25' height='25' fr={undefined} />
//         </span>
//     );
//     return (
//         <div className={`${isShowTitle ? containerHasTitle : container} ${'hidden-scroll flex-1 min-w-30'} ${isFull ? 'fill-available' : ''}`}>
//             {isShowTitle ? <div className={classnames('p-4', 'border-b', 'w-auto')}>{title}</div> : null}
//             <TableContainer component={Paper} style={isShowTitle ? { boxShadow: 'none' } : undefined}>
//                 <Table sx={{ minWidth: 650 }} aria-label='simple table'>
//                     {isShowTableHeader ? (
//                         <TableHead>
//                             <TableRow>
//                                 {tableTitle.map((row, index) => (
//                                     <TableCell key={index} align={index === data.length - 1 ? 'right' : 'left'} className={classnames(tabelRowTitleClassNames)}>
//                                         {row}
//                                     </TableCell>
//                                 ))}
//                             </TableRow>
//                         </TableHead>
//                     ) : null}

//                     <TableBody>
// {data.map((row, index) => (
//     <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
//         {Object.keys(row).map((val, idx) => (
//             <TableCell key={idx} align={idx === 0 ? 'left' : 'right'} component={idx === 0 ? 'th' : undefined} scope={idx === 0 ? 'row' : undefined} className={classnames('flex', `${idx === 0 ? tabbelColumnTitleClassNames : ''}`)}>
//                 {row[val].icon ? iconFlag(row[val].icon) : null}
//                 {typeof row[val] === 'object' ? <span className={classnames('h-4')}>{row[val].text}</span> : <span>{row[val]}</span>}
//                 {val === 'light' ? iconCircle(row[val]) : null}
//             </TableCell>
//         ))}
//     </TableRow>
// ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//         </div>
//     );
// };
