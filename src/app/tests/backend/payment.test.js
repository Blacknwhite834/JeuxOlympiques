import { createMocks } from "node-mocks-http";
import { PrismaClient } from "@prisma/client";
import { POST } from "@/app/api/checkout/route";
import Stripe from 'stripe';

const prisma = new PrismaClient();

jest.mock('next-auth/jwt', () => ({
    getToken: jest.fn().mockResolvedValue({ sub: 'mocked_user_id' }),
  }));
  
  jest.mock('stripe', () => {
    const originalModule = jest.requireActual('stripe');
    return jest.fn().mockImplementation(() => ({
      ...originalModule,
      paymentIntents: {
        create: jest.fn().mockResolvedValue({
          id: 'pi_mocked', 
          status: 'succeeded', 
        }),
      },
    }));
  });


  

describe('POST /api/checkout', () => {

  beforeAll(async () => {
    await prisma.user.create({
      data: {
        id: 'mocked_user_id',
        email: 'test@mail.com',
        name: 'John Doe',
        password: 'Password1@',
        accountKey: 'mocked_account_key',
      },
    });

    await prisma.offre.create({
      data: {
        id: '123',
        title: 'Offre test',
        description: 'Description de l\'offre',
        prix: 1000,
        nombre: 10,
      },
    });

  });

  afterEach(async () => {
    await prisma.vente.deleteMany({
      where: {
        user: {
          email: 'test@mail.com',
        },
      },
    });
    
    await prisma.offre.delete({
      where: {
        id: '123',
      },
    });
    
    await prisma.user.delete({
      where: {
        email: 'test@mail.com',
      },
    });
  });

    it('should process payment successfully', async () => {


      const { req, res } = createMocks({
        method: 'POST',
        body: {
            paymentMethodId: 'pm_mocked',
            total: 1000,
            offreId: '123',
            billingDetails: {
                name: 'John Doe',
                address: {
                line1: '123 Main St',
                city: 'Anytown',
                country: 'US',
                },
            }
            },
      });

      req.json = jest.fn().mockReturnValue(req.body);
  
      await POST(req, res);
  
      // Vérifier que la réponse renvoyée est conforme aux attentes
      expect(res._getStatusCode()).toBe(200);

      const vente = await prisma.vente.findFirst({
        where: {
          userId: 'mocked_user_id', 
          offreId: '123',
        },
      });

      expect(vente).toBeTruthy();
      
      // vérification de la génération de venteKey
      expect(vente.venteKey).toBeTruthy();

      // console.log(vente);
      // console.log(vente.venteKey);

      await prisma.$disconnect();
    });
  
    
  });
            