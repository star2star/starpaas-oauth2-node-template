var mainModule = require('./index');

const params = {
  "access_token":"eyJraWQiOiI1OGRhOWI1MDVjMGE1YTAwMDFlZmIzMDRlNDUwMWE3NzYyYzY0Zjc3ODE2N2NlZjNkNTBlYThmZSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI1Nzg1MjQwMC02NjUwLTQ2NmItYmRjMi1iYzEyOGU2Y2NhY2EiLCJzY3AiOiJkZWZhdWx0IiwiZXhwIjoxNTQ4MDk3NjAzLCJpYXQiOjE1NDgwOTQwMDMsImNpZCI6InpWZmV6UHdKdGR4dmtOWVNVYUFRIiwicG9saWN5IjoiNWIzNDMxMDhjZTE2NmQwMDAxMGMzODU4In0.jsil1J067zR6jozSJ11MpPIJgQPGwt0M8tfeC8IESqk97n5i-ea2IpZ4-t34dWnAS8G2aaP9GdCw6zSO33MlbQ",
  "oauth2_uuid": "905b051f-a535-43fc-8d63-4a3f18fc84c0" 
}; 
mainModule.main(params).then(function(d){
  console.log('Results returned was: ', d);
}).catch(function(e){
  console.error(e);
});
