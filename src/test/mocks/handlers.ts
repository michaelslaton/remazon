import { HttpHandler, HttpResponse, http } from 'msw'
import RankType from '../../types/rank.type';

type RanksDummyData = {
  data: RankType[]
}

const ranks: RanksDummyData = {
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

// Define handlers that catch the corresponding requests and returns the mock data.
export const handlers: HttpHandler[] = [
  // Ranks Handlers ------------------------------------------->
  http.get('http://localhost:5000/remazon/ranks', ()=>{
    return HttpResponse.json(ranks, {status: 200})
  }),
];