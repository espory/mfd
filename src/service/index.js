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
const getDate = () => {
  var date = new Date();
  var year = date.getFullYear().toString();
  var month = (date.getMonth() + 1).toString();
  var day = date.getDate().toString();
  var hour = date.getHours().toString();
  var minute = date.getMinutes().toString();
  var seconds = date.getSeconds().toString();

  return (
    year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + seconds
  );
};
export function postSubmit({
  elecid,
  // worker,
  lng = '50',
  lat = '50',
  file1,
  file2,
  pointest = '50',
  time = getDate(),
  donewell = '0',
  information,
  token,
  username,
}) {
  var data = new FormData();
  // const file1_name = file1.split('/').reverse()[0];
  // const file1_suffix = file1.split('.').reverse()[0];
  // const file2_name = file2.split('/').reverse()[0];
  // const file2_suffix = file2.split('.').reverse()[0];

  data.append('elecid', elecid);
  // data.append('worker', worker);
  data.append('lng', lng);
  data.append('lat', lat);
  data.append('file1', file1);
  data.append('file2', file2);
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

export function postJudgePicture(file, username, pic_type) {
  var data = new FormData();
  const file_name = file.split('/').reverse()[0];
  const file_suffix = file.split('.').reverse()[0];
  data.append('file1', {
    type: `image/${file_suffix}`,
    name: file_name,
    uri: file,
  });
  data.append('username', username);
  data.append('number', pic_type);
  return fetch({
    url: '/picturesubmit/picturesubmit',
    method: 'post',
    data: data,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export function postEidSearch(eid) {
  const data = {
    ElecID: eid,
  };
  return fetch({
    url: '/search/eidsearch',
    method: 'post',
    data: data,
  });
}
export function postUidSearch(uid) {
  const data = {
    UserID: uid,
  };
  return fetch({
    url: '/search/uidsearch',
    method: 'post',
    data: data,
  });
}
