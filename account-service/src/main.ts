import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Enable CORS
  app.enableCors({
    origin: true,//process.env.NEXT_PUBLIC_CORS_DIRECTIONS_ACEPT , // Cambia esto al origen que necesites permitir
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true, // Habilitar si usas cookies o autenticación
  });

  // Prefijo global para el servicio de autenticación
  app.setGlobalPrefix('account/service');

  const port = parseInt(process.env.PORT, 10) || 3002;
  await app.listen(port);
  console.log(`🚀 Auth Service running on http://localhost:${port}/user/service`);
}
bootstrap();
