import { z } from 'zod';
import { EmailVo } from '@/domain/value-objects/email.vo';
import { UsernameVo } from '@/domain/value-objects/username.vo';
import { LogoUrlVo } from '@/domain/value-objects/logo-url.vo';
import { UserEntity, UserVerifiedStatus } from '@/domain/entities/user.entity';

export class UserDtoService {
  static schema = z.object({
    id: z.string(),
    email: EmailVo.schema,
    username: UsernameVo.schema,
    logoUrl: LogoUrlVo.schema,
    verifiedStatus: z.nativeEnum(UserVerifiedStatus),
    createdAt: z.date(),
    updatedAt: z.date(),
  });

  static mapToDto(user: UserEntity): UserDto {
    return UserDtoService.schema.parse({
      id: user.id,
      email: user.email.getValue(),
      username: user.username.getValue(),
      logoUrl: user.logoUrl.getValue(),
      verifiedStatus: user.verifiedStatus,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    })
  }
}

export type UserDto = z.infer<typeof UserDtoService.schema>;

