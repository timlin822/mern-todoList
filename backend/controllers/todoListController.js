const TodoList=require("../models/todoListModel");
const dateTime=require("../utils/dateTime");

// 全部查詢
const getTodoLists=async(req,res)=>{
    try{
        const todoLists=await TodoList.find().sort({updateAt: -1}).select("-__v");
        
        res.status(200).json({
            message: "全部查詢成功",
            todoLists
        });
    }
    catch(err){
        res.status(500).json({
            message: err
        });
    }
}

// 部份查詢
const getTodoList=async(req,res)=>{
    try{
        const todoList=await TodoList.findById(req.params.todoListId).select("-createAt -updateAt -__v");
        
        res.status(200).json({
            message: "查詢成功",
            todoList
        });
    }
    catch(err){
        res.status(500).json({
            message: err
        });
    }
}

// 新增
const createTodoList=async(req,res)=>{
    try{
        const {title}=req.body;
        
        // 檢查全部欄位是否填寫
        if(!title){
            return res.status(400).json({
                message: "請填寫完整"
            });
        }
        
        // 檢查代辦事項是否存在
        const existTodoList=await TodoList.findOne({title});
        if(existTodoList){
            return res.status(400).json({
                message: "代辦事項已存在"
            });
        }

		// 新增
        await TodoList.create({
            title,
            createAt: dateTime(),
            updateAt: dateTime()
        });

        res.status(200).json({
            message: "新增成功"
        });
    }
    catch(err){
        res.status(500).json({
            message: err
        });
    }
}

// 更新
const updateTodoList=async(req,res)=>{
    try{
        const {title}=req.body;
        
        // 檢查全部欄位是否填寫
        if(!title){
            return res.status(400).json({
                message: "請填寫完整"
            });
        }

        // 檢查代辦事項是否存在
        const existTodoList=await TodoList.findOne({title});
        if(existTodoList){
            return res.status(400).json({
                message: "請更新代辦事項"
            });
        }

        // 更新
        const updateTodoList={
            title,
            updateAt: dateTime()
        };
        await TodoList.findByIdAndUpdate(req.params.todoListId,updateTodoList,{new: true});
        
        res.status(200).json({
            message: "更新成功"
        });
    }
    catch(err){
        res.status(500).json({
            message: err
        });
    }
}

// 更新是否完成
const updateCompletedTodoList=async(req,res)=>{
    try{
        const {completed}=req.body;

        // 更新是否完成
        const updateTodoList={
            completed,
            updateAt: dateTime()
        };
        await TodoList.findByIdAndUpdate(req.params.todoListId,updateTodoList,{new: true});
        
        res.status(200).json({
            message: "更新成功"
        });
    }
    catch(err){
        res.status(500).json({
            message: err
        });
    }
}

// 刪除
const deleteTodoList=async(req,res)=>{
    try{
        await TodoList.findByIdAndDelete(req.params.todoListId);

        res.status(201).json({
            message: "刪除成功"
        });
    }
    catch(err){
        res.status(500).json({
            message: err
        });
    }
}

module.exports={getTodoLists,getTodoList,createTodoList,updateTodoList,updateCompletedTodoList,deleteTodoList};