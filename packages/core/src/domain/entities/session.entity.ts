import { IsBoolean, IsDate, IsIP, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserEntity } from './user.entity';
import { BaseEntity } from '@/domain/common';


export class TokenEntity extends BaseEntity {
  @IsNotEmpty()
  accessToken: string;

  @IsNotEmpty()
  refreshToken: string;

  @IsDate()
  expiresAt: Date;
}


export class SessionEntity extends BaseEntity {
  @IsNotEmpty()
  sessionId: string;

  @IsNotEmpty()
  user: UserEntity;

  @IsNotEmpty()
  token: TokenEntity;

  @IsBoolean()
  isActive: boolean;

  @IsIP()
  ipAddress: string;

  @IsOptional()
  @IsString()
  userAgent: string | null;
}