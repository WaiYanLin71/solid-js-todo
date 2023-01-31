
const TodoFooter = ({ data, handleToggleCheck, handleClearComplete }) => {
    return (
        <div class="flex justify-center items-center -mx-2 mt-3">
            <button type="button" class={`btn-main mx-2 active:bg-blue-700 active:text-white transition-all ${!data().length ? 'pointer-events-none' : ''}`} onClick={[handleToggleCheck]}>
                {!data().length || data().some(todo => !todo.completed) ? 'Check All' : 'Uncheck All'}</button>
            <button onClick={[handleClearComplete]} type="button" class={`btn-main mx-2 active:bg-blue-700 active:text-white ${!data().length ? 'pointer-events-none' : ''}`}>Clear Complete</button>
        </div>
    )
}

export default TodoFooter