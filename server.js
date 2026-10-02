// Mission Control backend: zero dependencies, Node 16+.
const http=require('http'),fs=require('fs'),path=require('path');
const PORT=process.env.PORT||3000,PUB=path.join(__dirname,'public'),DB=path.join(__dirname,'data','results.json');
const TYPES={'.html':'text/html','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.png':'image/png','.ico':'image/x-icon'};
const load=()=>{try{return JSON.parse(fs.readFileSync(DB,'utf8'))}catch{return[]}};
const save=r=>{fs.mkdirSync(path.dirname(DB),{recursive:true});fs.writeFileSync(DB,JSON.stringify(r))};
const send=(res,code,obj)=>{res.writeHead(code,{'Content-Type':'application/json'});res.end(JSON.stringify(obj))};
const num=(v,a,b)=>Math.max(a,Math.min(b,Number(v)||0));
http.createServer((req,res)=>{
 const url=req.url.split('?')[0];
 res.setHeader('Access-Control-Allow-Origin','*');res.setHeader('Access-Control-Allow-Methods','GET,POST,OPTIONS');res.setHeader('Access-Control-Allow-Headers','Content-Type');
 if(req.method==='OPTIONS'){res.writeHead(204);return res.end()}
 if(req.method==='GET'&&url==='/api/leaderboard'){
  return send(res,200,load().sort((a,b)=>b.science-a.science||a.cost-b.cost).slice(0,20));
 }
 if(req.method==='POST'&&url==='/api/results'){
  let body='';req.on('data',c=>{body+=c;if(body.length>5000)req.destroy()});
  return req.on('end',()=>{try{
   const d=JSON.parse(body),rows=load();
   rows.push({name:String(d.name||'Anonymous').replace(/[<>&"']/g,'').slice(0,20),science:num(d.science,0,100),health:num(d.health,0,100),cost:num(d.cost,0,1000),mass:num(d.mass,0,10000),result:String(d.result||'').replace(/[<>&"']/g,'').slice(0,30),at:Date.now()});
   save(rows.slice(-500));send(res,200,{ok:true});
  }catch{send(res,400,{error:'bad request'})}});
 }
 let f=path.normalize(path.join(PUB,url==='/'?'index.html':url));
 if(!f.startsWith(PUB)||!fs.existsSync(f)||fs.statSync(f).isDirectory()){res.writeHead(404);return res.end('Not found')}
 res.writeHead(200,{'Content-Type':TYPES[path.extname(f)]||'application/octet-stream'});fs.createReadStream(f).pipe(res);
}).listen(PORT,()=>console.log('Mission Control running at http://localhost:'+PORT));
