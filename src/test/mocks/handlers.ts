import { HttpHandler, HttpResponse, http } from 'msw';
import EmployeeType from '../../types/employee.type';
import AwardType from '../../types/award.type';
import NotificationType from '../../types/notification.type';
import RankType from '../../types/rank.type';
import ProjectType from '../../types/project.type';

const API_URL = import.meta.env.VITE_REMAZON_API_URL || "http://localhost:5000";

export const ranksDummyData: { data: RankType[] } = {
  data: [
      {
          id: 0,
          name: "Deactivated",
          rank: 0,
          color: "#404040",
      },
      {
          id: 1,
          name: "Ceo",
          rank: 1,
          color: "#00c8d6",
      },
      {
          id: 2,
          name: "Weebo",
          rank: 2,
          color: "#00c8d6",
      }
  ]
};

const adminDummyData: { data: EmployeeType } = {
  data: {
      id: 1,
      name: "Rembo",
      birthday: null,
      uid: "1",
      rank: 1,
      cupcakes: 0,
      aliases: "Tiffles,The Boss",
      admin: true,
      quote: null,
      description: "Its Rembo!",
      locked: false
  }
};

const userDummyData: { data: EmployeeType } = {
  data: {
    id: 2,
    name: "Bueno",
    birthday: null,
    uid: "2",
    rank: 2,
    cupcakes: 0,
    aliases: "Egg",
    admin: false,
    quote: null,
    description: "Egg!!!",
    locked: false
  }
};

const notificationsDummyData: { data: NotificationType[]} = {
  data: [
    {
        id: 1,
        type: "admin",
        users: "2",
        title: "A Notification",
        message: "This is a notification"
    },
    {
        id: 2,
        type: "project",
        users: "2",
        title: "New Project",
        message: "This is a project notification"
    }
  ]
};

export const employeesDummyData: { data: EmployeeType[] } = {
  data: [
    {
      id: 1,
      name: "Rembo",
      birthday: null,
      uid: "1",
      rank: 1,
      cupcakes: 9,
      aliases: "Tiffles,The Boss",
      admin: true,
      quote: null,
      description: "Its Rembo!",
      locked: false
    },
    {
      id: 2,
      name: "Bueno",
      birthday: null,
      uid: "2",
      rank: 2,
      cupcakes: 2,
      aliases: "Egg",
      admin: false,
      quote: null,
      description: "Egg!!!",
      locked: false
    }
  ]
}

export const awardsDummyData: { data: AwardType[] } = {
  data: [
      {
          id: 1,
          name: 'Drift Belt',
          type: 'belt',
          holder: 2,
          date: '2024-03-04T02:48:28.149Z',
          awardedFor: 'The perfect driiiiift! Yeeeh',
          retired: false,
          class: "gold",
      },
      {
          id: 2,
          name: 'Employee of the Month',
          type: 'trophy',
          holder: null,
          date: '2021-03-02T23:57:15.016Z',
          awardedFor: 'Notable excellence!',
          retired: false,
          class: "bronze",
      },
      {
          id: 3,
          name: 'Face of the Business',
          type: 'belt',
          holder: 1,
          date: '2024-03-05T22:55:29.988Z',
          awardedFor: 'Its the face... of the business!!',
          retired: false,
          class: "silver",
      }
  ]
};

export const projectsDummyData: { data: ProjectType[] } = {
  data: [
    {
      id: 1,
      name: 'Movie Night',
      type: 'Watch Night',
      date: '2026-01-25T08:00:00.000Z',
      host: 1,
      attending: '1',
      regularity: 'special',
      description: 'Movie watch nights',
      locked: true
    },
    {
        id: 2,
        name: 'Hunt Event',
        type: 'Game Night',
        date: '2026-03-25T08:00:00.000Z',
        host: 2,
        attending: '2,1',
        regularity: 'recurring',
        description: 'Lets do the current hunt event',
        locked: true
    },
    {
      id: 3,
      name: 'Wrassles',
      type: 'RWF',
      date: '2026-06-25T08:00:00.000Z',
      host: 1,
      attending: '1',
      regularity: 'recurring',
      description: 'RWF NIGHT',
      locked: true
    },
    {
      id: 4,
      name: 'Something Courtney Night',
      type: 'Social Gathering',
      date: '2026-10-25T08:00:00.000Z',
      host: 1,
      attending: '1,2',
      regularity: 'special',
      description: 'RWF NIGHT',
      locked: false
    },
  ]
}

// Define handlers that catch the corresponding requests and returns the mock data.
export const handlers: HttpHandler[] = [
  // Ranks Handlers -------------------------------------------------->
  http.get(`${API_URL}/remazon/ranks`, ()=>{
    return HttpResponse.json(ranksDummyData, {status: 200})
  }),

  // Employees Handlers ---------------------------------------------->
  http.get(`${API_URL}/remazon/employees`, ()=>{
    return HttpResponse.json(employeesDummyData, {status: 200})
  }),
  // -- Admin -- >
  http.get(`${API_URL}/remazon/employees/1`, ()=>{
    return HttpResponse.json(adminDummyData, {status: 200})
  }),
  // -- User -- >
  http.get(`${API_URL}/remazon/employees/2`, ()=>{
    return HttpResponse.json(userDummyData, {status: 200})
  }),

  http.put(`${API_URL}/remazon/employees`, ()=>{
    return HttpResponse.json('', {status: 200})
  }),

  // Notifications Handlers ------------------------------------------->
  // -- Admin -- >
  http.get(`${API_URL}/remazon/notifications/1`, ()=>{
    return HttpResponse.json([], {status: 200})
  }),
  // -- User -- >
  http.get(`${API_URL}/remazon/notifications/2`, ()=>{
    return HttpResponse.json(notificationsDummyData, {status: 200})
  }),

  http.put(`${API_URL}/remazon/notifications/2/1`, ()=>{
    return HttpResponse.json('', {status: 200})
  }),

  http.post(`${API_URL}/remazon/notifications`, ()=>{
    return HttpResponse.json('', {status: 200})
  }),

  // Awards Handlers -------------------------------------------------->
  http.get(`${API_URL}/remazon/awards`, ()=>{
    return HttpResponse.json(awardsDummyData, {status: 200})
  }),

  // Projects Handlers ------------------------------------------------->
  http.get(`${API_URL}/remazon/projects`, ()=>{
    return HttpResponse.json(projectsDummyData, {status: 200})
  }),

  http.delete(`${API_URL}/remazon/projects/1`, ()=>{
    return HttpResponse.json('', {status: 200})
  }),

  http.put(`${API_URL}/remazon/projects`, ()=>{
    return HttpResponse.json('', {status: 200})
  }),

  // MOTD Handler ------------------------------------------------->
  http.get(`${API_URL}/remazon/motd`, ()=>{
    return HttpResponse.json({ data: 'This is a MOTD' }, {status: 200})
  }),

  http.put(`${API_URL}/remazon/motd`, ()=>{
    return HttpResponse.json({ data: '' }, {status: 200})
  }),
];