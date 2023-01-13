const express=require("express");
const router=express.Router();

const {getTodoLists,getTodoList,createTodoList,updateTodoList,updateCompletedTodoList,deleteTodoList}=require("../controllers/todoListController");

router.route("/").get(getTodoLists).post(createTodoList);
router.route("/:todoListId").get(getTodoList).put(updateTodoList).patch(updateCompletedTodoList).delete(deleteTodoList);

module.exports=router;