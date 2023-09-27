const http = require('http');
const bd = require('./conexion.js');
const { error } = require('console');
const port = 3000;

const corsOptions = {
  origin: 'http://localhost:3000', // Reemplaza con el puerto del servidor de tu cliente (por ejemplo, 3001)
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

const server = http.createServer((req, res) => {
    let responseJson = 'Datos recibidos con éxito';
        res.setHeader('Access-Control-Allow-Origin', '*'); //Para desablitar cords y que pueda contestar
        if (req.method === 'POST') {
                let data = '';
                req.on('data', (chunk) => {
                data += chunk;
            });
            req.on('end', () => {
                // Procesa los datos recibidos
                const JsonData = JSON.parse(data);
                save(JsonData);
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('Datos recibidos con éxito en el post');
                console.log("Se contesta un POST");
            });
         } else if (req.method === 'GET') {
            //SE REALIZA LA CONSULTA DE DATOs
            let conexion = bd.conectarBD();
            conexion.connect();
            const sql = 'SELECT * FROM main_foro';
            conexion.query(sql, (error, results) => {
                if (error) {
                    console.error('Error al ejecutar la consulta:', error);
                    conexion.end;
                    return;
                }
            responseJson = results;
            conexion.end; 
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(JSON.stringify(responseJson));
            console.log("Se contesta un GET");
            })
    } else{
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Ruta no encontrada');
        return;
    }
   
});

server.listen(port, () => {
    console.log(`Servidor en funcionamiento en el puerto ${port}`);
  });

function save(JsonData){
    let conexion = bd.conectarBD();
    conexion.connect();
    const query = 'INSERT INTO main_foro (comment,autor,status) VALUES (?,?,?)';
    const values = [JsonData.mensaje,JsonData.title,1];
    conexion.query(query,values), function(err,result) {if(err) throw err;console.log("Se guardo con exito")};
    conexion.end;
}