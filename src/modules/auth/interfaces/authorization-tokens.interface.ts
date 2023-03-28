export interface AuthorizationTokens {
  accessToken: string;
  refreshToken: string;
}

export type AccessToken = Omit<AuthorizationTokens, 'refreshToken'>;

