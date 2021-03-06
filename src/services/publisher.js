import Request from "./request";

// export const getPublishers = () => {

//   let url = "api/publisher/";
//   return Request.get(url);

// }

// export const getPublisher = (publisherId) => {

//   let url = `api/publisher/${publisherId}/`;
//   return Request.get(url);

// }

// export const savePublisher = (publisher) => {

//   if (publisher.id === 0) {
//     const body = JSON.stringify({ name: publisher.name });
//     let url = "api/publisher/";
//     return Request.create(url, body);

//   } else {

//     const body = JSON.stringify(publisher);
//     let url = `api/publisher/${publisher.id}/`;
//     return Request.update(url, body);

//   }

// }

// export const deletePublisher = (publisherId) => {

//   let url = `api/publisher/${publisherId}/`;
//   return Request.delete(url);

// }


const PublisherService = {
  list: () => {
    let url = "api/publisher/";
    console.log("url", url);
    return Request.get(url);
  },
  get: (publisherId) => {
    let url = `api/publisher/${publisherId}/`;
    return Request.get(url);
  },
  save: (publisher) => {
    if (publisher.id === 0) {
      const body = JSON.stringify({ name: publisher.name });
      let url = "api/publisher/";
      return Request.create(url, body);
    } else {
      const body = JSON.stringify(publisher);
      let url = `api/publisher/${publisher.id}/`;
      return Request.update(url, body);
    }
  },
  delete: (publisherId) => {
    let url = `api/publisher/${publisherId}/`;
    return Request.delete(url);
  }
}

export default PublisherService;