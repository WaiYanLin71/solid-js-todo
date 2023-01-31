import { createEffect, createSignal } from "solid-js";

const createTodo = () => {
    const [data, dispatch] = createSignal(JSON.parse(localStorage.getItem('solid-todo')) || [])

    createEffect(() => {
        localStorage.setItem('solid-todo', JSON.stringify(data()))
    })

    return [data, dispatch]
}

export default createTodo