import express from 'express';
import {create} from 'express-handlebars'

import { fileURLToPath } from 'url'
import { dirname } from "path";


// Variables que me permiten mostrar el path donde estoy en el proyecto
const __filename = fileURLToPath( import.meta.url )
const __dirname = dirname( __filename )

import vistaHomeRoutes from '../routes/vistaHome.routes.js'
import apiRootPostCancionRoute from '../routes/apiRootCancion.routes.js'
import apiRootGetCancionRoute from '../routes/apiRootCancion.routes.js'
import apiRootPutCancionRoute from '../routes/apiRootCancion.routes.js'
import apiRootDeleteCancionRoute from '../routes/apiRootCancion.routes.js'
import apiMostrarCancionesRoute from '../routes/apiRootGetCancion.routes.js'

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT || 8000;

        this.frontEndPaths = {
            rootHome:'/'
        }

        this.backEndApi = {
            rootAgregarcancion: '/cancion',
            rootMostrarcanciones:'/cancion',
            rootEditarCancion: '/cancion',
            rootEliminarCancion:'/cancion',
            mostrarcanciones:'/canciones',

        }

        this.middlewares();
        this.routes();
        
    }

    middlewares(){
        this.app.use(express.json());
        this.app.use(express.static('public'));
        this.app.use('/js', express.static( `${__dirname}/../public/assets/js`));
        this.app.use('/css', express.static( `${__dirname}/../public/assets/css`));
        this.app.use('/bootstrap', express.static( `${__dirname}/../node_modules/bootstrap/dist`));
        //this.app.use('/jquery',express.static(  `${__dirname}/../node_modules/jquery/dist`));
        //this.app.use('/bootstrapIcons', express.static( `${__dirname}/../node_modules/bootstrap-icons/font`));

    }

    routes(){
       this.app.use(this.frontEndPaths.rootHome, vistaHomeRoutes);

        this.app.use(this.backEndApi.rootAgregarcancion, apiRootPostCancionRoute)
        this.app.use(this.backEndApi.rootMostrarcanciones, apiRootGetCancionRoute)
        this.app.use(this.backEndApi.rootEditarCancion, apiRootPutCancionRoute)
        this.app.use(this.backEndApi.rootEliminarCancion, apiRootDeleteCancionRoute)
        this.app.use(this.backEndApi.mostrarcanciones, apiMostrarCancionesRoute)
    
    }

    initHandlebars(){

        this.hbs = create({
            partialsDir:[
                "views"
            ]
        })

        this.app.engine( "handlebars", this.hbs.engine );
        this.app.set("view engine","handlebars");
        
    }

    listen(){
        this.app.listen( this.port, () => {
            console.log(`Servidor corriendo en puerto ${this.port}`)
        } )
    }
}

export default Server;