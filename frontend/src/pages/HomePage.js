import TodoList from 'components/todoList/TodoList';

import './css/HomePage.css';

const HomePage=()=>{
    return (
		<div className="section-padding bg-height bg-color">
			<div className="container container-padding">
				<TodoList />
			</div>
		</div>
	);
}

export default HomePage;