// App 跟应用相关的不好分类的都放这里


// User 用户登陆、改密、个人中心等，常量名以User开头
export const UserLogin = '/api/v1/user/auth';
export const AwsInfo = '/api/v1/account/aws_info';
export const GetSSHKeys = '/api/v1/account/ssh_keys';

// dataCenter 数据中心相关内容 常量名以DataCenter开头
export const DataCenterDefault = '/api/v1/datacenter/default';
export const CreateDataCenter = '/api/v1/datacenter/add_dc';
export const GetSubnet = '/api/v1/datacenter/subnet/';
export const GetSecgroup = '/api/v1/datacenter/secgroup/';

// 事件日志
export const EventLogList = '/api/v1/event/log';
export const DataCenterAll = '/api/v1/datacenter/all';

// Server 服务器 常量名以Server开头
export const ServerList = '/api/v1/server/list';
export const ServerDetail = '/api/v1/server/detail/';
export const ServerImages = '/api/v1/server/images';
export const ServerInstypes = '/api/v1/server/instypes';
export const AddServer = '/api/v1/server/add';

// Storage s3存储 常量名以Storage开头
export const AddBucket = '/api/v1.0/storage/add_bucket';
export const ListBucket = '/api/v1.0/storage/list_bucket';
export const DeleteBucket = '/api/v1.0/storage/delete_bucket';

// database 数据库 常量名以Database开头


// networking 网络 常量名以Networking开头


// backups  备份 常量名以Backup开头


// containers 容器 常量名以Container开头


// dashboard  面板 常量名以Dashboard开头
export const DashBoardDatacenter = '/api/v1/dashboard/summary/datacenter';
export const DashBoardHealth = '/api/v1/dashboard/summary/health';
export const DashBoardGraphical = '/api/v1/dashboard/summary/resource';
export const DashBoardInventory = '/api/v1/dashboard/inventory';
