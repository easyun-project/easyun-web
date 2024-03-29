// App 跟应用相关的不好分类的都放这里

// User 用户登陆、改密、个人中心等，常量名以User开头
export const UserLogin = '/api/v1/user/auth';
export const UserLogout = '/api/v1/user/logout';
export const UserPasswd = '/api/v1/user/password';

// dataCenter 数据中心管理 常量名以 Datacenter 开头
export const DataCenterPath = '/api/v1/datacenter';
export const DataCenterDefault = '/api/v1/datacenter/default';
export const DataCenterSum = '/api/v1/datacenter/summary';

// dataCenter 数据中心内基础服务管理 常量名以 Dcm 开头
export const DcmSubnet = '/api/v1/datacenter/subnet';
export const DcmRoute = '/api/v1/datacenter/routetable';
export const DcmIntGW = '/api/v1/datacenter/gateway/internet';
export const DcmNatGW = '/api/v1/datacenter/gateway/nat';
export const DcmSecgroup = '/api/v1/datacenter/secgroup';
export const DcmStaticip = '/api/v1/datacenter/staticip';

// Server 服务器 常量名以Server开头
export const ServerPath = '/api/v1/server';
export const ServerDetail = '/api/v1/server/detail';
export const ServerImages = '/api/v1/server/param/image';
export const ServerInstypes = '/api/v1/server/param/instype';
export const ServerInsfamily = '/api/v1/server/param/insfamily';
export const ServerAction = '/api/v1/server/action';
export const SeverEipPath = '/api/v1/server/eip';
export const SeverConfigPath = '/api/v1/server/config';
export const SeverTagsPath = '/api/v1/server/tags/';
export const SeverDiskPath = '/api/v1/server/disk';
export const SeverSecgroupPath = '/api/v1/server/secgroup';
export const SeverName = '/api/v1/server/name';

// Storage s3存储 常量名以St开头
export const StoragePath = '/api/v1/storage';
export const StBucketPath = '/api/v1/storage/bucket';
export const StBucketList = '/api/v1/storage/bucket/list';
export const StBucketObject = '/api/v1/storage/bucket/object';
export const StBucketIdValidate = '/api/v1/storage/bucket/vaildate';
export const StVolumePath = '/api/v1/storage/volume';
export const StVolumeList = '/api/v1/storage/volume/list';

// Database 数据库 常量名以Database开头
export const DatabasePath = '/api/v1/database';
export const DatabaseList = '/api/v1/database/list';

// loadbalancer 负载均衡器 常量名以Loadbalancer开头
export const LoadbalancerPath = '/api/v1/loadbalancer';
export const LoadbalancerList = '/api/v1/loadbalancer/list';

// backups  备份 常量名以Backup开头

// account 云账户
export const AwsInfo = '/api/v1/account/aws_info';
export const SSHKeys = '/api/v1/account/ssh_keys';
export const FreeTier = '/api/v1/account/free_tier';

// dashboard  面板 常量名以Dashboard开头
export const DashBoardDatacenter = '/api/v1/dashboard/summary/datacenter';
export const DashBoardHealth = '/api/v1/dashboard/summary/health';
export const DashBoardGraphical = '/api/v1/dashboard/summary/resource';
export const DashBoardInventory = '/api/v1/dashboard/inventory';

// Event 事件日志,- 常量名以Event开头
export const EventLogList = '/api/v1/event/log';
