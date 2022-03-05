// App 跟应用相关的不好分类的都放这里

// User 用户登陆、改密、个人中心等，常量名以User开头
export const UserLogin = '/api/v1/user/auth';
export const AwsInfo = '/api/v1/account/aws_info';
export const SSHKeys = '/api/v1/account/ssh_keys';
export const FreeTier = '/api/v1/account/free_tier';

// dataCenter 数据中心相关内容 常量名以DataCenter开头
export const DataCenterOperate = '/api/v1/datacenter';
export const DataCenterDefault = '/api/v1/datacenter/default';
export const CreateDataCenter = '/api/v1/datacenter/add_dc';
export const GetSubnet = '/api/v1/datacenter/subnet';
export const DaterCenterSecgroup = '/api/v1/datacenter/secgroup';
export const DataCenterEip = '/api/v1/datacenter/eip';

// 事件日志
export const EventLogList = '/api/v1/event/log';
export const DataCenterAll = '/api/v1/datacenter/all';

// Server 服务器 常量名以Server开头
export const ServerList = '/api/v1/server';
export const ServerDetail = '/api/v1/server/detail/';
export const ServerImages = '/api/v1/server/param/image';
export const ServerInstypes = '/api/v1/server/param/instype';
export const ServerInsfamily = '/api/v1/server/param/insfamily';
export const AddServer = '/api/v1/server';
export const ServerAction = '/api/v1/server/action';
export const AttachEip = '/api/v1/server/attach/eip';
export const DetachEip = '/api/v1/server/detach/eip';

// Storage s3存储 常量名以Storage开头
export const AddBucket = '/api/v1/storage/add_bucket';
export const ListBucket = '/api/v1/storage/object/bucket';
export const DeleteBucket = '/api/v1/storage/delete_bucket';
export const VolumeOperate = '/api/v1/storage/volume';

// database 数据库 常量名以Database开头


// networking 网络 常量名以Networking开头


// backups  备份 常量名以Backup开头


// containers 容器 常量名以Container开头


// dashboard  面板 常量名以Dashboard开头
export const DashBoardDatacenter = '/api/v1/dashboard/summary/datacenter';
export const DashBoardHealth = '/api/v1/dashboard/summary/health';
export const DashBoardGraphical = '/api/v1/dashboard/summary/resource';
export const DashBoardInventory = '/api/v1/dashboard/inventory';
