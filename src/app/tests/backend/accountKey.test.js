import React from "react";
import supertest from 'supertest';
import express from 'express';
import { POST as registerHandler } from "@/app/api/auth/register/route";
import { createMocks } from "node-mocks-http";


jest.mock('@prisma/client', () => ({
  __esModule: true,
  PrismaClient: jest.fn().mockImplementation(() => ({
    user: {
      findUnique: jest.fn().mockResolvedValue(null),
      create: jest.fn().mockImplementation((userData) => Promise.resolve({ ...userData.data, id: 123 })),
    },
  })),
}));

import { PrismaClient } from '@prisma/client'; // Importer correctement PrismaClient

const prisma = new PrismaClient(); 


describe('POST /api/auth/register', () => {
  test('should create a user and generate an accountKey', async () => {
    
    const { req, res } = createMocks({
      method: 'POST',
      body: { email: 'test@mail.com', password: 'password', name: 'John Doe' },
    });

    req.json = jest.fn().mockResolvedValue(req.body);
    
    await registerHandler(req, res);
    expect(res._getStatusCode()).toBe(200);
    // Vérifie que le compte a été créé avec les bonnes informations
    expect(prisma.create).toHaveBeenCalledWith({
      data: {
        email: 'test@mail.com',
        password: expect.any(String),
        name: 'John Doe',
        accountKey: expect.any(String),
      },
    });
  }
  );

  afterEach(() => {
    jest.resetAllMocks(); // Réinitialise tous les mocks
  });
});



