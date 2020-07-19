import axios from 'axios'               //axios网络模块的封装

export function request(config) {
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:8000/api/n3/',
    timeout: 5000
  })
  instance.interceptors.request.use(config => {  //请求拦截 请求成功 或失败
    // console.log(config);

    return config
  },err => {
    // console.log(err)
  })


  instance.interceptors.response.use(res =>{      //响应拦截
    // console.log(res)
    return res.data                 //拦截了必须返回数据不然拿不到，然后就是只需要data其他是axios加的数据
  },err =>{
    console.log(err);
  })

  return instance(config)

}

// export function request(config,success,failure){
//   const instance =axios.create({
//     baseURL:'http://123.207.32.32:8000',
//     timeout:5000
//   })
//
//   instance(config)
//     .then(res => {
//       success(res)
//      })
//     .catch(err =>
//     {
//       failure(err)
//     })
// }