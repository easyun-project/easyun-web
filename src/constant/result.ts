export interface Result<T> {
    stats_code: number,
    message: string,
    detail: T
}


export interface DefaultDataCenter {
    az: string;
    key: string;
    pri_subnet1: string;
    pri_subnet2: string;
    pub_subnet1: string;
    pub_subnet2: string;
    region: string;
    secure_group1: string,
    secure_group2: string,
    secure_group3: string,
    tag_spec: DataCenterTagSpec;
    vpc_cider: string;

}

interface DataCenterTagSpec {
    ResourceType: string;
    Tag: Tag[]
}

interface Tag {
    Key: string;
    Value: string;
}