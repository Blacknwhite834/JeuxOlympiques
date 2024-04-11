import { createMocks } from "node-mocks-http";
import { PrismaClient } from "@prisma/client";
import { POST } from "@/app/api/auth/register/route";

const prisma = new PrismaClient();

describe('POST /api/auth/register', () => {
  it('should create a user and generate an accountKey', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        email: 'testAccount@mail.com',
        password: 'Password1@',
        name: 'John Doe'
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    req.json = jest.fn().mockReturnValue(req.body);

    await POST(req, res);

    expect(res._getStatusCode()).toBe(200);
    
    // Vérification de la création de l'utilisateur
    const user = await prisma.user.findUnique({
      where: {
        email: 'testAccount@mail.com',
      },
    });

    expect(user).toBeTruthy();

    expect(user.accountKey).toBeTruthy(); 

    await prisma.user.delete({
      where: {
        email: 'testAccount@mail.com',
      },
    });

    await prisma.$disconnect();
  });
});


