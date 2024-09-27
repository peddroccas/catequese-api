import { prisma } from './lib/prisma'
import { createNewCatechist } from './use-cases/catechist/createNewCatechist'
import { createNewCatechizing } from './use-cases/catechizing/createNewCatechizing'
import { createNewClassroom } from './use-cases/classroom/createNewClassroom'

async function seed() {
  await prisma.catechist.deleteMany({})
  await prisma.parent.deleteMany({})
  await prisma.installment.deleteMany({})
  await prisma.payment.deleteMany({})
  await prisma.catechizing.deleteMany({})
  await prisma.classroom.deleteMany({})

  const catechist1 = await createNewCatechist({
    name: 'Pedro Antunes Bernardes',
    email: 'pedroabernardes11@gmail.com',
    address: 'Quadra 3',
    birthday: new Date('1970-01-01T00:00:00.000Z'),
    hasReceivedBaptism: true,
    hasReceivedConfirmation: true,
    hasReceivedEucharist: true,
    hasReceivedMarriage: true,
    phone: '61999016604',
  }).then((response) => response.catechist)

  const catechist2 = await createNewCatechist({
    name: 'Julia Guimarães Porto',
    email: 'juliaporto.df@gmail.com',
    address: 'Quadra 3',
    birthday: new Date('1970-01-01T00:00:00.000Z'),
    hasReceivedBaptism: true,
    hasReceivedConfirmation: true,
    hasReceivedEucharist: true,
    hasReceivedMarriage: true,
    phone: '61999016604',
  }).then((response) => response.catechist)

  const catechist3 = await createNewCatechist({
    name: 'Levi Porto Bernardes',
    email: 'levi@gmail.com',
    address: 'Quadra 3',
    birthday: new Date('1970-01-01T00:00:00.000Z'),
    hasReceivedBaptism: true,
    hasReceivedConfirmation: true,
    hasReceivedEucharist: true,
    hasReceivedMarriage: true,
    phone: '61999016604',
  }).then((response) => response.catechist)

  const classroom1 = await createNewClassroom({
    startedAt: 2023,
    catechists: [catechist1.id],
    roomNumber: 1,
    segment: 'Crisma',
  }).then((response) => response.classroom)

  const classroom2 = await createNewClassroom({
    startedAt: 2024,
    catechists: [catechist2.id],
    roomNumber: 2,
    segment: 'Crisma',
  }).then((response) => response.classroom)

  const classroom3 = await createNewClassroom({
    startedAt: 2024,
    catechists: [catechist3.id],
    roomNumber: 3,
    segment: 'Crisma',
  }).then((response) => response.classroom)

  await createNewCatechizing({
    name: 'João Silva',
    address: 'Rua das Flores, 123',
    birthday: new Date('2010-06-15'),
    classroomId: classroom1.id,
    hasReceivedBaptism: true,
    hasReceivedEucharist: false,
    hasReceivedMarriage: false,
    personWithSpecialNeeds: false,
    parents: {
      name: 'Maria Silva',
      phone: '(61) 91234-5678',
      kinship: 'Mãe',
    },
  })

  await createNewCatechizing({
    name: 'Ana Lima',
    address: 'Avenida Paulista, 456',
    birthday: new Date('2008-09-10'),
    classroomId: classroom1.id,
    hasReceivedBaptism: true,
    hasReceivedEucharist: true,
    hasReceivedMarriage: false,
    personWithSpecialNeeds: false,
    parents: {
      name: 'Carlos Lima',
      phone: '(11) 98765-4321',
      kinship: 'Pai',
    },
  })

  await createNewCatechizing({
    name: 'Carlos Souza',
    address: 'Rua XV de Novembro, 789',
    birthday: new Date('2012-03-22'),
    classroomId: classroom1.id,
    hasReceivedBaptism: false,
    hasReceivedEucharist: false,
    hasReceivedMarriage: false,
    personWithSpecialNeeds: true,
    parents: {
      name: 'Beatriz Souza',
      phone: '(21) 91234-5678',
      kinship: 'Mãe',
    },
  })

  await createNewCatechizing({
    name: 'Gabriel Fernandes',
    address: 'Quadra 5, 101',
    birthday: new Date('2011-12-30'),
    classroomId: classroom2.id,
    hasReceivedBaptism: true,
    hasReceivedEucharist: false,
    hasReceivedMarriage: false,
    personWithSpecialNeeds: false,
    parents: {
      name: 'Pedro Santos',
      phone: '(41) 91234-8765',
      kinship: 'Pai',
    },
  })

  await createNewCatechizing({
    name: 'Albert Silva',
    address: 'Rua das Flores, 123',
    birthday: new Date('2010-06-15'),
    classroomId: classroom2.id,
    hasReceivedBaptism: true,
    hasReceivedEucharist: false,
    hasReceivedMarriage: false,
    personWithSpecialNeeds: false,
    parents: {
      name: 'GIlberto',
      phone: '(61) 91234-5678',
      kinship: 'Tio',
    },
  })

  await createNewCatechizing({
    name: 'Luiza Lima',
    address: 'Avenida Paulista, 456',
    birthday: new Date('2008-09-10'),
    classroomId: classroom2.id,
    hasReceivedBaptism: true,
    hasReceivedEucharist: true,
    hasReceivedMarriage: false,
    personWithSpecialNeeds: false,
    parents: {
      name: 'Mateus Lima',
      phone: '(11) 98765-4321',
      kinship: 'Pai',
    },
  })

  await createNewCatechizing({
    name: 'Aurora Souza',
    address: 'Rua XV de Novembro, 789',
    birthday: new Date('2012-03-22'),
    classroomId: classroom3.id,
    hasReceivedBaptism: false,
    hasReceivedEucharist: false,
    hasReceivedMarriage: false,
    personWithSpecialNeeds: true,
    parents: {
      name: 'Ana Luiza',
      phone: '(21) 91234-5678',
      kinship: 'Mãe',
    },
  })

  await createNewCatechizing({
    name: 'Kayo Santos',
    address: 'Alameda dos Anjos, 101',
    birthday: new Date('2011-12-30'),
    classroomId: classroom3.id,
    hasReceivedBaptism: true,
    hasReceivedEucharist: false,
    hasReceivedMarriage: false,
    personWithSpecialNeeds: false,
    parents: {
      name: 'Julia Santos',
      phone: '(41) 91234-8765',
      kinship: 'Mãe',
    },
  })
}

seed()
