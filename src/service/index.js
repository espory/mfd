import fetch from '../common/fetch';

export function postLogin({username, password}) {
  return fetch({
    url: '/login/login',
    method: 'post',
    data: {
      username,
      password,
    },
  });
}

export function postRegiste({username, password, name, worker}) {
  console.log(username, password, name, worker);
  const data = {
    username,
    password,
    name,
  };
  if (worker) {
    data.worker = worker;
  }
  return fetch({
    url: '/register/register',
    method: 'post',
    data: data,
  });
}

export function postSubmit({
  elecid,
  // worker,
  lng = '50',
  lat = '50',
  file1,
  file2,
  pointest = '50',
  time = new Date().toISOString().split('.')[0].replace('T', ' '),
  donewell = '0',
  information,
  token,
  username,
}) {
  var data = new FormData();
  const file1_name = file1.split('/').reverse()[0];
  const file1_suffix = file1.split('.').reverse()[0];
  const file2_name = file2.split('/').reverse()[0];
  const file2_suffix = file2.split('.').reverse()[0];

  data.append('elecid', elecid);
  // data.append('worker', worker);
  data.append('lng', lng);
  data.append('lat', lat);
  data.append('file1', {
    type: `image/${file1_suffix}`,
    name: file1_name,
    uri: file1,
  });
  data.append('file2', {
    type: `image/${file2_suffix}`,
    name: file2_name,
    uri: file2,
  });
  data.append('pointest', pointest);
  data.append('time', time);
  data.append('donewell', donewell);
  data.append('information', information);
  data.append('token', token);
  data.append('username', username);
  console.log(data);
  return fetch({
    url: '/submit/submit',
    method: 'post',
    data: data,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}
