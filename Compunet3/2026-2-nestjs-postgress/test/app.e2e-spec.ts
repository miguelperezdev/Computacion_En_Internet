import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module.js';

/**
 * Prueba end-to-end de la API de estudiantes.
 *
 * Necesita PostgreSQL disponible (ver docker-compose.yml y .env.example).
 * Repite aquí la configuración de `main.ts` (prefijo global y ValidationPipe)
 * porque Nest no la aplica automáticamente al construir la app en el test.
 */
describe('API de estudiantes (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /api/seed carga los estudiantes de prueba', async () => {
    const res = await request(app.getHttpServer()).get('/api/seed').expect(200);
    expect(res.body).toEqual({ message: 'SEED EXECUTED' });
  });

  it('GET /api/student pagina con limit y skip', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/student?limit=5&skip=0')
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body.length).toBeLessThanOrEqual(5);
  });

  it('GET /api/student/:term busca por id, name o nickname', async () => {
    const list = await request(app.getHttpServer())
      .get('/api/student?limit=1')
      .expect(200);
    const [student] = list.body;

    const porId = await request(app.getHttpServer())
      .get(`/api/student/${student.id}`)
      .expect(200);
    expect(porId.body.id).toBe(student.id);

    await request(app.getHttpServer())
      .get(`/api/student/${student.nickname}`)
      .expect(200);

    await request(app.getHttpServer())
      .get(`/api/student/${student.name.toLowerCase()}`)
      .expect(200);
  });

  it('GET /api/student/:term responde 404 si no existe', async () => {
    await request(app.getHttpServer())
      .get('/api/student/no_existe')
      .expect(404);
  });

  it('POST /api/student rechaza datos inválidos con 400', async () => {
    await request(app.getHttpServer())
      .post('/api/student')
      .send({
        name: 'X',
        age: 20,
        email: 'no-es-un-email',
        isActive: true,
        gender: 'Robot',
      })
      .expect(400);
  });

  it('POST crea, PATCH actualiza y DELETE elimina un estudiante', async () => {
    const creado = await request(app.getHttpServer())
      .post('/api/student')
      .send({
        name: 'Prueba E2E',
        age: 19,
        email: 'prueba.e2e@example.com',
        isActive: true,
        gender: 'Other',
        favoriteSubjects: ['Math'],
        grades: [{ subject: 'Math', grade: 95 }],
      })
      .expect(201);

    expect(creado.body.id).toBeDefined();

    // las notas llegan como números, no como strings
    const conNotas = await request(app.getHttpServer())
      .get(`/api/student/${creado.body.id}`)
      .expect(200);
    expect(conNotas.body.grades).toHaveLength(1);
    expect(typeof conNotas.body.grades[0].grade).toBe('number');

    // el PATCH reemplaza la lista de notas completa
    const actualizado = await request(app.getHttpServer())
      .patch(`/api/student/${creado.body.id}`)
      .send({
        age: 20,
        grades: [
          { subject: 'Math', grade: 98 },
          { subject: 'History', grade: 70 },
        ],
      })
      .expect(200);
    expect(actualizado.body.age).toBe(20);
    expect(actualizado.body.grades).toHaveLength(2);

    await request(app.getHttpServer())
      .delete(`/api/student/${creado.body.id}`)
      .expect(200);

    await request(app.getHttpServer())
      .get(`/api/student/${creado.body.id}`)
      .expect(404);
  });
});
