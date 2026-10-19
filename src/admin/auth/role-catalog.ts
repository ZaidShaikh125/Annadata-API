export const ROLE_PERMISSIONS = {
  'Super Admin': ['*'],
  'Platform Admin': ['users.read','users.suspend','communities.read','communities.verify','foods.read','foods.moderate','pickups.read','pickups.manage','safety.read','safety.investigate','safety.resolve','safety.restrict','volunteers.read','volunteers.manage','notifications.read','notifications.manage','notifications.publish','support.read','support.manage','support.reply','analytics.read','reports.read','reports.run','reports.export','operations.read','operations.retry','audit.read','internal_users.read','internal_users.manage','roles.manage','sessions.read','sessions.revoke','settings.read','settings.manage','mobile_config.read','mobile_config.manage','mobile_config.publish'],
  'Operations Manager': ['users.read','communities.read','foods.read','pickups.read','pickups.manage','safety.read','volunteers.read','support.read','analytics.read','reports.read','reports.run'],
  'Community Verification Officer': ['users.read','communities.read','communities.verify'],
  'Food Safety Moderator': ['foods.read','foods.moderate','pickups.read','safety.read','safety.investigate','safety.resolve','safety.restrict'],
  'Volunteer Coordinator': ['users.read','communities.read','volunteers.read','volunteers.manage'],
  'Support Agent': ['users.read','communities.read','pickups.read','support.read','support.reply'],
  'Content Manager': ['notifications.read','notifications.manage','notifications.publish','mobile_config.read','mobile_config.manage','mobile_config.publish'],
  Analyst: ['analytics.read','reports.read','reports.run','reports.export'],
  Auditor: ['audit.read','operations.read','reports.read','internal_users.read','sessions.read','settings.read'],
} as const;
export type AdminRoleName = keyof typeof ROLE_PERMISSIONS;
export const isAdminRoleName = (value:string):value is AdminRoleName => Object.prototype.hasOwnProperty.call(ROLE_PERMISSIONS,value);
export const permissionsForRoles=(roles:string[])=>Array.from(new Set(roles.flatMap(role=>role==='Super Admin'?['*']:[...(ROLE_PERMISSIONS[role as AdminRoleName]??[])])));
