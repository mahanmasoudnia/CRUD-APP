// import { API_BASE_URL } from "./Url";
// import httpService from "./httpService";

// export const getAuthor = async (userId: string | "") => {
//   if (userId === "") {
//     return ["Unknown"]
//   } else {

//     try {
//       const authorData = await httpService.get(`${API_BASE_URL}/profile?id=${userId}`);
//       if (authorData.status === 200) {
//         const authorFullName = [authorData.data.firstname, authorData.data.lastname, authorData.data.gender];
//         return authorFullName
//       } else {
//         return ["Unknown"]

//       }

//     } catch (error) {
//       console.error('Error fetching profile:', error);
//       return ["Unknown"]
//     }
//   }
// }
