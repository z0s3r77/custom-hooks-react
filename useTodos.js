import {useEffect, useReducer} from "react";
import {todoReducer} from "../08-useReducer/todoReducer.js";

export const useTodos = () => {

	const initialState = []
	const init = () => {
		return JSON.parse(localStorage.getItem('todos')) || [];
	}

	const [todos, dispatch] = useReducer(todoReducer, initialState, init);

	useEffect(() => {
		localStorage.setItem('todos', JSON.stringify(todos))
	}, [todos]);

	const handleNewTodo = (todo) => {
		const action = {
			type: 'Add Todo',
			payload: todo
		}

		dispatch(action);
	}

	const hadleDeleteTodo = (id) => {
		dispatch({
			type: 'Remove todo',
			payload: id
		});
	}

	const handleToggleTodo =(id)=> {
		dispatch({
			type: 'Toggle todo',
			payload: id
		})

		console.log(id, 'toggle2')
	}



	return{
		todos,
		todosCount: todos.length,
		pendingTodosCount: todos.filter(todo => !todo.done).length,
		handleNewTodo,
		hadleDeleteTodo,
		handleToggleTodo
	}


}