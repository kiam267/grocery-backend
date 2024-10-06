const cluster = require('cluster');
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as os from 'os';

// if (cluster.isPrimary) {
//   // Use cluster.isPrimary in newer Node.js versions
//   const numCPUs = os.cpus().length;
//   console.log(`Primary ${process.pid} is running`);

//   // Fork workers.
//   for (let i = 0; i < numCPUs; i++) {
//     cluster.fork();
//   }

//   cluster.on('exit', (worker, code, signal) => {
//     console.log(`Worker ${worker.process.pid} died`);
//     cluster.fork(); // Restart the worker when it exits
//   });
// } else {

// }

  async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true });

    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe());
    const config = new DocumentBuilder()
      .setTitle('Marvel')
      .setDescription('Marvel Mock API')
      .setVersion('1.0')
      .addTag('marvel')
      .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('docs', app, document);

    const PORT = process.env.PORT || 5000;
    await app.listen(PORT);
    console.log(`Application is running on: ${await app.getUrl()}/api`);
  }
bootstrap();
