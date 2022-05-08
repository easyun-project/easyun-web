export const getDomain = (bktName, bktRegion, withProtocol = true) => {
    const protocol = 'https://';
    const domain = `${bktName}.s3.${bktRegion}.amazonaws.com`;
    return withProtocol ? protocol + domain : domain;
};