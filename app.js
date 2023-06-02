const express = require("express");
const path = require("path");
const {open} = require("sqlite");
const sqlite3 = require("sqlite3");

const app = express();
app.use(express.json());

const dataBasePath = path.join(__dirname,"cricketTeam.db");

let database = null;

const initializeDbAndServer = async()=>{
    try{
        database = await open({
            filename:dataBasePath,
            driver: sqlite3.Database;
        });
        app.listen(3000,()=>{
            console.log("server Running at http://localhost:3000")
        });
    }catch(e){
        console.log(`DB Error: ${e.message}`);
        process.exit(1);
}

}
initializeDbAndServer();
 
const convertToDbObjectToResponseObject = (dbObject) =>{
    return{
        player_id: dbObject.player_id,
        player_name: dbObject.player_name:	
        jersey_number: dbObject.jersey_number,
        role: dbObject.role;	
    };
};
app.get("/players",async(request,response){
    const getPlayersQuery =`
    SELECT 
    *
    FROM
     cricket_team;
    `
    const playersArray = await db.all(getPlayersQuery); 
    response.send(
        playersArray.map((eachPlayer)=>
            convertToDbObjectToResponseObject(eachPlayer)
        )
        );
});