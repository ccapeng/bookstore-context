import Request from "./request";

// export const getAuthors = () => {

//   let url = "api/author/";
//   return Request.get(url);

// }

// export const getAuthor = (authorId) => {

//   let url = `api/author/${authorId}/`;
//   return Request.get(url);

// }

// export const saveAuthor = (author) => {

//   if (author.id === 0) {
//     const body = JSON.stringify({
//       last_name: author.lastName,
//       first_name: author.firstName,
//     });
//     let url = "api/author/";
//     return Request.create(url, body);

//   } else {

//     const body = JSON.stringify({
//       id: author.id,
//       last_name: author.lastName,
//       first_name: author.firstName,
//     });
//     let url = `api/author/${author.id}/`;
//     return Request.update(url, body);

//   }

// }

// export const deleteAuthor = (authorId) => {

//   let url = `api/author/${authorId}/`;
//   return Request.delete(url);

// }


const AuthorService = {
  list: () => {

    let url = "api/author/";
    return Request.get(url);

  },

  get: (authorId) => {

    let url = `api/author/${authorId}/`;
    return Request.get(url);

  },

  save: (author) => {

    if (author.id === 0) {
      const body = JSON.stringify({
        last_name: author.lastName,
        first_name: author.firstName,
      });
      let url = "api/author/";
      return Request.create(url, body);

    } else {

      const body = JSON.stringify({
        id: author.id,
        last_name: author.lastName,
        first_name: author.firstName,
      });
      let url = `api/author/${author.id}/`;
      return Request.update(url, body);

    }

  },

  delete: (authorId) => {

    let url = `api/author/${authorId}/`;
    return Request.delete(url);

  }
}

export default AuthorService;