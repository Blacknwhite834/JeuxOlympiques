import { getToken } from 'next-auth/jwt';
import { PrismaClient } from '@prisma/client';
import CryptoJS from "crypto-js";
import { GET } from '@/app/api/retrieveKeys/[id]/route';

jest.mock('next-auth/jwt', () => ({
  getToken: jest.fn(),
}));

jest.mock('@prisma/client', () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => ({
      vente: {
        findUnique: jest.fn().mockResolvedValue({
          id: 'vente-id',
          user: {
            id: 'mocked_user_id',
            accountKey: 'user-account-key',
          },
          offre: {
          },
          venteKey: 'vente-key',
        }),
      },
    })),
  };
});

jest.mock('crypto-js', () => ({
  AES: {
    encrypt: jest.fn().mockImplementation((text) => `encrypted-${text}`),
  },
}));


describe('GET Function Concatenation Test', () => {
    beforeAll(() => {
      getToken.mockResolvedValue({ sub: 'mocked_user_id' });
    });
  
    it('should correctly concatenate and encrypt venteKey and accountKey', async () => {
      const req = {}; 
      const context = { params: { id: 'vente-id' } };
  
      const response = await GET(req, context);
  
      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data.qrData).toBe('encrypted-vente-key-user-account-key');
      expect(CryptoJS.AES.encrypt).toHaveBeenCalledTimes(1);


    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });
});
