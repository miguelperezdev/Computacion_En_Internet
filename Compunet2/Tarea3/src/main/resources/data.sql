-- ─── ROLES ───────────────────────────────────────────────────────────────────
INSERT INTO role (name) VALUES ('ROLE_ADMIN');      -- 1
INSERT INTO role (name) VALUES ('ROLE_STUDENT');    -- 2
INSERT INTO role (name) VALUES ('ROLE_PROFESSOR');  -- 3

-- ─── USUARIOS ────────────────────────────────────────────────────────────────
-- Contraseña de todos los usuarios: 123456
-- Hash BCrypt generado con BCryptPasswordEncoder (10 rounds)
INSERT INTO app_user (username, password) VALUES ('admin',                   '$2a$10$IfGhXeOGsR1UeUMpLBJPCe6kPJN2uAAMKDBAH33EQAWsQ1IIgXpJa');  -- 1
INSERT INTO app_user (username, password) VALUES ('student1',                '$2a$10$IfGhXeOGsR1UeUMpLBJPCe6kPJN2uAAMKDBAH33EQAWsQ1IIgXpJa');  -- 2
INSERT INTO app_user (username, password) VALUES ('prof1',                   '$2a$10$IfGhXeOGsR1UeUMpLBJPCe6kPJN2uAAMKDBAH33EQAWsQ1IIgXpJa');  -- 3
INSERT INTO app_user (username, password) VALUES ('domic.rincon@gmail.com',  '$2a$10$IfGhXeOGsR1UeUMpLBJPCe6kPJN2uAAMKDBAH33EQAWsQ1IIgXpJa');  -- 4

-- ─── ASIGNACIÓN DE ROLES ─────────────────────────────────────────────────────
INSERT INTO user_role (user_id, role_id) VALUES (1, 1); -- admin               → ROLE_ADMIN
INSERT INTO user_role (user_id, role_id) VALUES (2, 2); -- student1            → ROLE_STUDENT
INSERT INTO user_role (user_id, role_id) VALUES (3, 3); -- prof1               → ROLE_PROFESSOR
INSERT INTO user_role (user_id, role_id) VALUES (4, 1); -- domic.rincon@gmail.com → ROLE_ADMIN

-- ─── PERMISOS: 4 operaciones × 4 entidades = 16 permisos ─────────────────────
INSERT INTO permission (name) VALUES ('CREATE_STUDENT');    -- 1
INSERT INTO permission (name) VALUES ('READ_STUDENT');      -- 2
INSERT INTO permission (name) VALUES ('UPDATE_STUDENT');    -- 3
INSERT INTO permission (name) VALUES ('DELETE_STUDENT');    -- 4
INSERT INTO permission (name) VALUES ('CREATE_PROFESSOR');  -- 5
INSERT INTO permission (name) VALUES ('READ_PROFESSOR');    -- 6
INSERT INTO permission (name) VALUES ('UPDATE_PROFESSOR');  -- 7
INSERT INTO permission (name) VALUES ('DELETE_PROFESSOR');  -- 8
INSERT INTO permission (name) VALUES ('CREATE_ENROLLMENT'); -- 9
INSERT INTO permission (name) VALUES ('READ_ENROLLMENT');   -- 10
INSERT INTO permission (name) VALUES ('UPDATE_ENROLLMENT'); -- 11
INSERT INTO permission (name) VALUES ('DELETE_ENROLLMENT'); -- 12
INSERT INTO permission (name) VALUES ('CREATE_COURSE');     -- 13
INSERT INTO permission (name) VALUES ('READ_COURSE');       -- 14
INSERT INTO permission (name) VALUES ('UPDATE_COURSE');     -- 15
INSERT INTO permission (name) VALUES ('DELETE_COURSE');     -- 16

-- ─── ROLE_ADMIN: todos los permisos (1–16) ───────────────────────────────────
INSERT INTO role_permission (role_id, permission_id) VALUES (1, 1);
INSERT INTO role_permission (role_id, permission_id) VALUES (1, 2);
INSERT INTO role_permission (role_id, permission_id) VALUES (1, 3);
INSERT INTO role_permission (role_id, permission_id) VALUES (1, 4);
INSERT INTO role_permission (role_id, permission_id) VALUES (1, 5);
INSERT INTO role_permission (role_id, permission_id) VALUES (1, 6);
INSERT INTO role_permission (role_id, permission_id) VALUES (1, 7);
INSERT INTO role_permission (role_id, permission_id) VALUES (1, 8);
INSERT INTO role_permission (role_id, permission_id) VALUES (1, 9);
INSERT INTO role_permission (role_id, permission_id) VALUES (1, 10);
INSERT INTO role_permission (role_id, permission_id) VALUES (1, 11);
INSERT INTO role_permission (role_id, permission_id) VALUES (1, 12);
INSERT INTO role_permission (role_id, permission_id) VALUES (1, 13);
--INSERT INTO role_permission (role_id, permission_id) VALUES (1, 14);
INSERT INTO role_permission (role_id, permission_id) VALUES (1, 15);
INSERT INTO role_permission (role_id, permission_id) VALUES (1, 16);

-- ─── ROLE_STUDENT: lectura general + CRUD de Enrollment ──────────────────────
INSERT INTO role_permission (role_id, permission_id) VALUES (2, 2);  -- READ_STUDENT
INSERT INTO role_permission (role_id, permission_id) VALUES (2, 6);  -- READ_PROFESSOR
INSERT INTO role_permission (role_id, permission_id) VALUES (2, 14); -- READ_COURSE
INSERT INTO role_permission (role_id, permission_id) VALUES (2, 9);  -- CREATE_ENROLLMENT
INSERT INTO role_permission (role_id, permission_id) VALUES (2, 10); -- READ_ENROLLMENT
INSERT INTO role_permission (role_id, permission_id) VALUES (2, 11); -- UPDATE_ENROLLMENT
INSERT INTO role_permission (role_id, permission_id) VALUES (2, 12); -- DELETE_ENROLLMENT

-- ─── ROLE_PROFESSOR: lectura + gestión de cursos y profesores ────────────────
INSERT INTO role_permission (role_id, permission_id) VALUES (3, 2);  -- READ_STUDENT
INSERT INTO role_permission (role_id, permission_id) VALUES (3, 6);  -- READ_PROFESSOR
INSERT INTO role_permission (role_id, permission_id) VALUES (3, 7);  -- UPDATE_PROFESSOR
INSERT INTO role_permission (role_id, permission_id) VALUES (3, 10); -- READ_ENROLLMENT
INSERT INTO role_permission (role_id, permission_id) VALUES (3, 13); -- CREATE_COURSE
INSERT INTO role_permission (role_id, permission_id) VALUES (3, 14); -- READ_COURSE
INSERT INTO role_permission (role_id, permission_id) VALUES (3, 15); -- UPDATE_COURSE

-- ─── PROFESORES ──────────────────────────────────────────────────────────────
INSERT INTO professor (name) VALUES ('Juan Perez');
INSERT INTO professor (name) VALUES ('Maria Rodriguez');
INSERT INTO professor (name) VALUES ('Carlos Gomez');
INSERT INTO professor (name) VALUES ('Ana Martinez');
INSERT INTO professor (name) VALUES ('Luis Hernandez');
INSERT INTO professor (name) VALUES ('Pedro Sanchez');
INSERT INTO professor (name) VALUES ('Rosa Moreno');
INSERT INTO professor (name) VALUES ('Jorge Castillo');
INSERT INTO professor (name) VALUES ('Elena Vargas');
INSERT INTO professor (name) VALUES ('Miguel Torres');

-- ─── CURSOS ──────────────────────────────────────────────────────────────────
INSERT INTO course (name, credits, professor_id) VALUES ('Introduccion a la Programacion', 4, 1);
INSERT INTO course (name, credits, professor_id) VALUES ('Estructuras de Datos', 4, 1);
INSERT INTO course (name, credits, professor_id) VALUES ('Algoritmos y Complejidad', 4, 1);
INSERT INTO course (name, credits, professor_id) VALUES ('Base de Datos', 3, 1);
INSERT INTO course (name, credits, professor_id) VALUES ('Redes de Computadores', 3, 1);
INSERT INTO course (name, credits, professor_id) VALUES ('Anatomia Humana', 5, 2);
INSERT INTO course (name, credits, professor_id) VALUES ('Fisiologia', 5, 2);
INSERT INTO course (name, credits, professor_id) VALUES ('Bioquimica Medica', 4, 2);
INSERT INTO course (name, credits, professor_id) VALUES ('Farmacologia', 4, 2);
INSERT INTO course (name, credits, professor_id) VALUES ('Patologia General', 5, 2);
INSERT INTO course (name, credits, professor_id) VALUES ('Derecho Penal', 3, 3);
INSERT INTO course (name, credits, professor_id) VALUES ('Derecho Civil', 3, 3);
INSERT INTO course (name, credits, professor_id) VALUES ('Derecho Constitucional', 3, 3);
INSERT INTO course (name, credits, professor_id) VALUES ('Derecho Laboral', 3, 3);
INSERT INTO course (name, credits, professor_id) VALUES ('Derecho Internacional', 2, 3);
INSERT INTO course (name, credits, professor_id) VALUES ('Dibujo Tecnico', 2, 4);
INSERT INTO course (name, credits, professor_id) VALUES ('Diseno Arquitectonico I', 4, 4);
INSERT INTO course (name, credits, professor_id) VALUES ('Diseno Arquitectonico II', 4, 4);
INSERT INTO course (name, credits, professor_id) VALUES ('Historia de la Arquitectura', 3, 4);
INSERT INTO course (name, credits, professor_id) VALUES ('Materiales de Construccion', 3, 4);
INSERT INTO course (name, credits, professor_id) VALUES ('Historia del Arte', 3, 5);
INSERT INTO course (name, credits, professor_id) VALUES ('Historia Universal', 3, 5);
INSERT INTO course (name, credits, professor_id) VALUES ('Historia de Colombia', 3, 5);
INSERT INTO course (name, credits, professor_id) VALUES ('Filosofia Moderna', 2, 5);
INSERT INTO course (name, credits, professor_id) VALUES ('Etica y Sociedad', 2, 5);
INSERT INTO course (name, credits, professor_id) VALUES ('Calculo Diferencial', 4, 6);
INSERT INTO course (name, credits, professor_id) VALUES ('Calculo Integral', 4, 6);
INSERT INTO course (name, credits, professor_id) VALUES ('Algebra Lineal', 4, 6);
INSERT INTO course (name, credits, professor_id) VALUES ('Ecuaciones Diferenciales', 3, 6);
INSERT INTO course (name, credits, professor_id) VALUES ('Estadistica y Probabilidad', 3, 6);
INSERT INTO course (name, credits, professor_id) VALUES ('Fisica Mecanica', 4, 7);
INSERT INTO course (name, credits, professor_id) VALUES ('Fisica Electromagnetismo', 4, 7);
INSERT INTO course (name, credits, professor_id) VALUES ('Fisica Moderna', 3, 7);
INSERT INTO course (name, credits, professor_id) VALUES ('Laboratorio de Fisica I', 2, 7);
INSERT INTO course (name, credits, professor_id) VALUES ('Laboratorio de Fisica II', 2, 7);
INSERT INTO course (name, credits, professor_id) VALUES ('Quimica General', 4, 8);
INSERT INTO course (name, credits, professor_id) VALUES ('Quimica Organica', 4, 8);
INSERT INTO course (name, credits, professor_id) VALUES ('Quimica Analitica', 3, 8);
INSERT INTO course (name, credits, professor_id) VALUES ('Laboratorio de Quimica', 2, 8);
INSERT INTO course (name, credits, professor_id) VALUES ('Quimica Ambiental', 3, 8);
INSERT INTO course (name, credits, professor_id) VALUES ('Biologia Celular', 4, 9);
INSERT INTO course (name, credits, professor_id) VALUES ('Genetica', 4, 9);
INSERT INTO course (name, credits, professor_id) VALUES ('Microbiologia', 3, 9);
INSERT INTO course (name, credits, professor_id) VALUES ('Ecologia', 3, 9);
INSERT INTO course (name, credits, professor_id) VALUES ('Botanica', 3, 9);
INSERT INTO course (name, credits, professor_id) VALUES ('Microeconomia', 3, 10);
INSERT INTO course (name, credits, professor_id) VALUES ('Macroeconomia', 3, 10);
INSERT INTO course (name, credits, professor_id) VALUES ('Economia Internacional', 3, 10);
INSERT INTO course (name, credits, professor_id) VALUES ('Finanzas Corporativas', 4, 10);
INSERT INTO course (name, credits, professor_id) VALUES ('Contabilidad General', 3, 10);

-- ─── ESTUDIANTES ─────────────────────────────────────────────────────────────
INSERT INTO student (name, code, program) VALUES ('Laura Garcia',   '2021102001', 'Ingenieria de Sistemas');
INSERT INTO student (name, code, program) VALUES ('Pedro Pascal',   '2021102002', 'Ingenieria de Sistemas');
INSERT INTO student (name, code, program) VALUES ('Andres Lopez',   '2021102003', 'Medicina');
INSERT INTO student (name, code, program) VALUES ('Sofia Torres',   '2021102004', 'Derecho');
INSERT INTO student (name, code, program) VALUES ('Camila Velez',   '2021102005', 'Medicina');

-- ─── INSCRIPCIONES ───────────────────────────────────────────────────────────
INSERT INTO student_course (student_id, course_id) VALUES (1, 1);
INSERT INTO student_course (student_id, course_id) VALUES (1, 2);
INSERT INTO student_course (student_id, course_id) VALUES (2, 1);
INSERT INTO student_course (student_id, course_id) VALUES (3, 6);
INSERT INTO student_course (student_id, course_id) VALUES (3, 7);
INSERT INTO student_course (student_id, course_id) VALUES (4, 11);
INSERT INTO student_course (student_id, course_id) VALUES (4, 12);
INSERT INTO student_course (student_id, course_id) VALUES (5, 6);

INSERT INTO student (name, code, program) VALUES ('Daniel Rojas',      '2021102006', 'Ingenieria de Sistemas');
INSERT INTO student (name, code, program) VALUES ('Valentina Cruz',    '2021102007', 'Ingenieria de Sistemas');
INSERT INTO student (name, code, program) VALUES ('Sebastian Mora',    '2021102008', 'Ingenieria Industrial');
INSERT INTO student (name, code, program) VALUES ('Natalia Herrera',  '2021102009', 'Medicina');
INSERT INTO student (name, code, program) VALUES ('Juan Esteban Gil', '2021102010', 'Derecho');

INSERT INTO student (name, code, program) VALUES ('Paula Restrepo',   '2021102011', 'Arquitectura');
INSERT INTO student (name, code, program) VALUES ('Mateo Salazar',    '2021102012', 'Ingenieria Civil');
INSERT INTO student (name, code, program) VALUES ('Sara Jimenez',     '2021102013', 'Psicologia');
INSERT INTO student (name, code, program) VALUES ('Felipe Naranjo',   '2021102014', 'Economia');
INSERT INTO student (name, code, program) VALUES ('Juliana Ruiz',     '2021102015', 'Contaduria');

INSERT INTO student (name, code, program) VALUES ('David Castro',     '2021102016', 'Ingenieria de Sistemas');
INSERT INTO student (name, code, program) VALUES ('Luisa Fernanda',   '2021102017', 'Medicina');
INSERT INTO student (name, code, program) VALUES ('Kevin Vargas',     '2021102018', 'Derecho');
INSERT INTO student (name, code, program) VALUES ('Mariana Pardo',    '2021102019', 'Arquitectura');
INSERT INTO student (name, code, program) VALUES ('Samuel Cardenas',  '2021102020', 'Ingenieria Industrial');

INSERT INTO student (name, code, program) VALUES ('Isabella Leon',    '2021102021', 'Biologia');
INSERT INTO student (name, code, program) VALUES ('Nicolas Arias',    '2021102022', 'Quimica');
INSERT INTO student (name, code, program) VALUES ('Carolina Peña',    '2021102023', 'Fisica');
INSERT INTO student (name, code, program) VALUES ('Juan Camilo Diaz', '2021102024', 'Matematicas');
INSERT INTO student (name, code, program) VALUES ('Laura Mendoza',    '2021102025', 'Economia');

INSERT INTO student (name, code, program) VALUES ('Camilo Parra',     '2021102026', 'Ingenieria Civil');
INSERT INTO student (name, code, program) VALUES ('Gabriela Soto',    '2021102027', 'Psicologia');
INSERT INTO student (name, code, program) VALUES ('Esteban Molina',   '2021102028', 'Historia');
INSERT INTO student (name, code, program) VALUES ('Manuela Rico',     '2021102029', 'Filosofia');
INSERT INTO student (name, code, program) VALUES ('Tomas Ospina',     '2021102030', 'Ingenieria de Sistemas');

INSERT INTO student (name, code, program) VALUES ('Valeria Buitrago', '2021102031', 'Medicina');
INSERT INTO student (name, code, program) VALUES ('Jeronimo Mejia',   '2021102032', 'Derecho');
INSERT INTO student (name, code, program) VALUES ('Daniela Roldan',   '2021102033', 'Arquitectura');
INSERT INTO student (name, code, program) VALUES ('Cristian Mesa',    '2021102034', 'Economia');
INSERT INTO student (name, code, program) VALUES ('Tatiana Lozano',   '2021102035', 'Contaduria');

INSERT INTO student (name, code, program) VALUES ('Miguel Angel',     '2021102036', 'Ingenieria Industrial');
INSERT INTO student (name, code, program) VALUES ('Paola Cardona',    '2021102037', 'Biologia');
INSERT INTO student (name, code, program) VALUES ('Andres Felipe',    '2021102038', 'Quimica');
INSERT INTO student (name, code, program) VALUES ('Maria Paula',      '2021102039', 'Fisica');
INSERT INTO student (name, code, program) VALUES ('Santiago Acosta',  '2021102040', 'Matematicas');

INSERT INTO student (name, code, program) VALUES ('Ana Lucia Vega',   '2021102041', 'Ingenieria de Sistemas');
INSERT INTO student (name, code, program) VALUES ('Jose Manuel',      '2021102042', 'Medicina');
INSERT INTO student (name, code, program) VALUES ('Laura Sofia',      '2021102043', 'Derecho');
INSERT INTO student (name, code, program) VALUES ('Martin Yepes',     '2021102044', 'Arquitectura');
INSERT INTO student (name, code, program) VALUES ('Angela Muñoz',     '2021102045', 'Economia');

INSERT INTO student (name, code, program) VALUES ('Ricardo Trujillo', '2021102046', 'Contaduria');
INSERT INTO student (name, code, program) VALUES ('Diana Beltran',    '2021102047', 'Psicologia');
INSERT INTO student (name, code, program) VALUES ('Juan Pablo Niño',  '2021102048', 'Historia');
INSERT INTO student (name, code, program) VALUES ('Melissa Quintero', '2021102049', 'Filosofia');
INSERT INTO student (name, code, program) VALUES ('Pipe Valencia',    '2021102050', 'Ingenieria Civil');

INSERT INTO student (name, code, program) VALUES ('Karen Villada',    '2021102051', 'Ingenieria de Sistemas');
INSERT INTO student (name, code, program) VALUES ('Brayan Osorio',    '2021102052', 'Medicina');
INSERT INTO student (name, code, program) VALUES ('Salome Duque',     '2021102053', 'Derecho');
INSERT INTO student (name, code, program) VALUES ('Alejandro Luna',   '2021102054', 'Arquitectura');
INSERT INTO student (name, code, program) VALUES ('Catalina Hoyos',   '2021102055', 'Economia');