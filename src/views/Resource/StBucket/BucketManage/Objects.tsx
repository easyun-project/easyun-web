import React from 'react';
import { S3Client, AbortMultipartUploadCommand } from '@aws-sdk/client-s3';

export default function Objects({ bucketData }) {
    // const s3 = new S3Client({
    //     region: 'us-east-1',
    //     credentials: fromCognitoIdentityPool({
    //         client: new CognitoIdentityClient({ region: REGION }),
    //         identityPoolId: 'IDENTITY_POOL_ID', // IDENTITY_POOL_ID e.g., eu-west-1:xxxxxx-xxxx-xxxx-xxxx-xxxxxxxxx
    //     }),
    // });
    return (
        <div>
            Objects some
        </div>
    );
}
