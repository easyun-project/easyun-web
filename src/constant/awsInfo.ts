export interface AwsInfoModel {
    role: string;
    account_id: string;
    aws_type: string;
}
export interface freeTierGET {
  remainder:number
}
export interface freeTierPUT {
  active_date: string;
}
export interface IsshkeyItem {
  id: string;
  key_name: string;
  region: string;
  item_name: string;
}
export interface IQuotasItem {
  id: string;
  item_name: string;
  region: string;
}