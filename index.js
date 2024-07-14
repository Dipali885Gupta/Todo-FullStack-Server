const express = require("express");
const app = express();
//cors used for fetching server with db
const cors = require("cors");
//pool used for run query for postgres
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); //access to req body and then we get json data

//routes

//create a todo
app.post("/todos", async (req, res) => {
  try {
    // console.log(req.body);
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO  todo (description) VALUES ($1) RETURNING *",
      [description]
    );
    res.json(newTodo);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
});

//get a todo
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM TODO");
    console.log("the alltodos", allTodos)
    res.json(allTodos.rows);
  } catch (err) {
    console.log(err.message);
  }
});

app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todos WHERE todo_id=$1", {
      id,
    });
    res.json(todo.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

//update a todo
app.put("/todos/:id", async (req, res)=>{
    try{
    const {id} = req.params;
    const {description} = req.body;
    const updatetodo = await pool.query("update todo set description=$1 where  todo_id=$2", [description, id]);
     res.json("todo was updated");
    }
    catch(err){
        console.log(err.message);
    }

})
 
//delete a todo
app.delete("/todo/:id", async (req, res)=>{
try{
    const {id}=req.params;
    const deleteTodo = await pool.query("delete from todo where todo_id=$1", [id])
  res.json("todo was deleted");
    console.log("check the backend",deleteTodo)
}

catch(err){
    console.log(err.message);

}


})



app.listen(5001, () => {
  console.log("http://localhost:5001");
});
