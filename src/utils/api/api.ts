const API_URL = "http://localhost:5001/remazon";
import { EmployeePostType } from "../../types/employeeType";
import { createAsyncThunk } from "@reduxjs/toolkit";

// const headers = new Headers();
// headers.append("Content-Type", "application/json");

const employeesUrl: URL = new URL(`${API_URL}/employees`);
const projectsUrl: URL = new URL(`${API_URL}/projects`);

// const useFetch = async (url: string, controller: AbortController) => {
//   try{
//     const response = await fetch(url, {signal: controller.signal});
//     if (response.status === 204) return null;
//     const payload = await response.json();
//     return await payload.data;
//   } catch (e) {
//     console.error(e);
//   }
// };