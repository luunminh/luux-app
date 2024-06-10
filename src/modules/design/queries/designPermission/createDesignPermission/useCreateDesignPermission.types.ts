export interface CreateDesignPermissionPayload {
  designId: string;
  userId: string;
  canView: boolean;
  canEdit: boolean;
}
