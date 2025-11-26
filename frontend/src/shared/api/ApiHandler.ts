interface IApiHandler {
  BASE_URL: string 
  get: () => void 
  post: () => void 
  put: () => void 
  delete: () => void 
}
class ApiHandler implements IApiHandler {
  BASE_URL = 'http://localhost:3000'
}