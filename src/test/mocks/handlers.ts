import { HttpHandler, HttpResponse, http } from 'msw';
import EmployeeType from '../../types/employee.type';

const API_URL = import.meta.env.VITE_REMAZON_API_URL || "http://localhost:5000";

const ranks = {
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

const adminDummyData = {
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

const userDummyData = {
  data: {
      id: 2,
      name: "Bueno",
      birthday: null,
      uid: "2",
      rank: 1,
      cupcakes: 0,
      aliases: "Egg",
      admin: false,
      quote: null,
      description: "Egg!!!",
      locked: false
  }
};

const notificationsDummyData = {
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

const employeesDummyData: { data: EmployeeType[] } = {
  data: [
    {
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
    },
    {
      id: 2,
      name: "Bueno",
      birthday: null,
      uid: "2",
      rank: 1,
      cupcakes: 0,
      aliases: "Egg",
      admin: false,
      quote: null,
      description: "Egg!!!",
      locked: false
    }
  ]
}

// Define handlers that catch the corresponding requests and returns the mock data.
export const handlers: HttpHandler[] = [
  // Ranks Handlers -------------------------------------------------->
  http.get(`${API_URL}/remazon/ranks`, ()=>{
    return HttpResponse.json(ranks, {status: 200})
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

  // Notifications Handlers ------------------------------------------->
  // -- Admin -- >
  http.get(`${API_URL}/remazon/notifications/1`, ()=>{
    return HttpResponse.json([], {status: 200})
  }),
  // -- User -- >
  http.get(`${API_URL}/remazon/notifications/2`, ()=>{
    return HttpResponse.json(notificationsDummyData, {status: 200})
  }),

];