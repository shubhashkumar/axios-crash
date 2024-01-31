// GET REQUEST
function getTodos() {
  console.log('GET Request');
  // axios({
  //   method:"get",
  //   url:"https://jsonplaceholder.typicode.com/todos",
  //   params:{
  //     _limit:5
  //   }
  // })
 // axios.get("https://jsonplaceholder.typicode.com/todos?_limit=5")
 axios
   .get("https://jsonplaceholder.typicode.com/todos?_limit=5")
   .then(res=>showOutput(res))
   .catch(err=>console.log(err));
}

// POST REQUEST
function addTodo() {
  console.log('POST Request');
  axios({
      method:"post",
      url:"https://jsonplaceholder.typicode.com/todos",
      data:
      {
        "userId": 1,
        "title": "new added todo",
        "completed": false
      }
  })
  .then(res=>showOutput(res))
  .catch(err=>console.log(err));
}

// PUT/PATCH REQUEST
function updateTodo() {
  console.log('PUT/PATCH Request');
  axios({
    method:"put",
    url:"https://jsonplaceholder.typicode.com/todos/1",
    data:
    {
      "userId": 1,
      "title": "new added and updated todo",
      "completed": true
    }
  })
  .then(res=>showOutput(res))
  .catch(err=>console.log(err));
}

// DELETE REQUEST
function removeTodo() {
  console.log('DELETE Request');
  axios({
    method:"delete",
    url:"https://jsonplaceholder.typicode.com/todos/1",
  })
  .then(res=>showOutput(res))
  .catch(err=>console.log(err));
}

// SIMULTANEOUS DATA
function getData() {
  console.log('Simultaneous Request');
  axios.all([
    axios.get("https://jsonplaceholder.typicode.com/todos"),
    axios.get("https://jsonplaceholder.typicode.com/posts")
  ])
  //  .then(res=>
  //   {
  //     console.log(res[0]);
  //     console.log(res[1]);
  //     showOutput(res[1]);
  //   })
    .then(axios.spread((todos,posts)=>showOutput(posts)))
    .catch(err=>console.log(err));
}

// CUSTOM HEADERS
function customHeaders()
 {
  console.log('Custom Headers');
  const config={
    headers:
    {
      'content-type':"application/json",
       authorization:"sometoken"
    }
  };
  axios({
    method:"post",
    url:"https://jsonplaceholder.typicode.com/todos",
    data:
    {
      "userId": 1,
      "title": "new added todo",
      "completed": false
    },
    headers:config

  })
  .then(res=>showOutput(res))
  .catch(err=>console.log(err));
  
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  console.log('Transform Response');
}

// ERROR HANDLING
function errorHandling() {
  console.log('Error Handling');
}

// CANCEL TOKEN
function cancelToken() {
  console.log('Cancel Token');
}

// INTERCEPTING REQUESTS & RESPONSES
axios.interceptors.request.use
( 
  config=>{
    console.log(`${config.method.toUpperCase()} request sent to ${config.url} at ${new Date().getTime()}`)
    return config;
  },
  error=>
  {
    return Promise.reject(error);
  }
)
// AXIOS INSTANCES

// Show output in browser
function showOutput(res) {
  document.getElementById('res').innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('update').addEventListener('click', updateTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document
  .getElementById('transform')
  .addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);
