import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes'; // Add this import

export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('Runexa API')
    .setDescription(' Runexa backend')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Enter JWT token',
      in: 'header',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);

  const theme = new SwaggerTheme();
  const darkCss = theme.getBuffer(SwaggerThemeNameEnum.DARK);

  SwaggerModule.setup('', app, document, {
    customCss: darkCss,
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
}
