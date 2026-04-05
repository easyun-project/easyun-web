import React from 'react';
import { TabLayout } from '@/components/ui/tab-layout';

const accountTabs = [
    { key: 'profile', label: 'Profile' },
    { key: 'reminder', label: 'Reminder' },
    { key: 'keypair', label: 'Keypair' },
    { key: 'quotas', label: 'Quotas' },
];

export default function Account() {
    return <TabLayout basePath="/account" tabs={accountTabs} className="ml-3 min-h-screen" />;
}
