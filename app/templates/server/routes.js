import ckrouter from './api/controllers/ck/router';

export default function routes(app) {
  app.use('<%=apiRoot%>', ckrouter);
}
