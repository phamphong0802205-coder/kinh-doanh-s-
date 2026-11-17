export const APPS_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbzSGQTq1gAkhp5Sr0DbWuAQcTHo15bhRlSNpugc155GgLfVC_h-1tBgrw2cRSzLWDo/exec';

export const BANK_ID = 'TCB';
export const ACCOUNT_NO = '19038779805016';
export const ACCOUNT_NAME = 'NGUYEN LE BACH DUONG';

export const ORDER_NOTIFICATION_CONFIG = {
  appsScriptUrl: APPS_SCRIPT_URL,
  secret: 'ocop-pt-9xK2mQ7vLw',
  bankId: BANK_ID,
  accountNo: ACCOUNT_NO,
  accountName: ACCOUNT_NAME,
} as const;

