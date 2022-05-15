import React, { useState } from 'react';
import CTags from '@/components/Logic/CTags';

export default function Tags() {
    const [tags,changeTags] = useState<Record<string,string>>({ he:'llo' });
    return (
        <div>
            <div>Key-Value Tags</div>
            <CTags tags={tags} changeTags={changeTags}></CTags>
        </div>
    );
}
