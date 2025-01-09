import { IsBoolean, IsEmail, IsOptional, IsUrl, MaxLength, MinLength } from 'class-validator';
import { BaseEntity } from '@/domain/common';

export class UserEntity extends BaseEntity {
  @IsEmail()
  email: string;

  @MinLength(1)
  username: string;

  @MinLength(1)
  @MaxLength(50)
  name: string;

  @IsOptional()
  @IsUrl()
  logoUrl: string | null;

  @IsBoolean()
  isVerified: boolean;
}