import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { UnauthorizedException } from '@nestjs/common';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from '../auth.service';

describe('JwtStrategy', () => {
  let strategy: JwtStrategy;
  // let authService: AuthService;

  const mockConfigService = {
    get: jest.fn().mockReturnValue('test-secret'),
  };

  const mockAuthService = {
    validateUser: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    strategy = module.get<JwtStrategy>(JwtStrategy);
    // authService = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(strategy).toBeDefined();
  });

  describe('validate', () => {
    it('should return user if validation succeeds', async () => {
      const payload = { sub: 1 };
      const user = {
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
      };

      mockAuthService.validateUser.mockResolvedValue(user);

      const result = await strategy.validate(payload);

      expect(mockAuthService.validateUser).toHaveBeenCalledWith(payload.sub);
      expect(result).toEqual(user);
    });

    it('should throw UnauthorizedException if user not found', async () => {
      const payload = { sub: 1 };

      mockAuthService.validateUser.mockResolvedValue(null);

      await expect(strategy.validate(payload)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
