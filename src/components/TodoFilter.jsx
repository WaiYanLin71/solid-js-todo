const TodoFilter = ({ status, setStatus }) => {
    return (
        <div class="flex justify-center items-center mt-3 -mx-2">
            <button onclick={() => setStatus(() => null)} type="button" class={`btn-main mx-2 ${status() === null ? 'bg-blue-700 text-white' : ''}`}>
                All
            </button>
            <button onclick={() => setStatus(() => false)} type="button" class={`btn-main mx-2 ${status() === false ? 'bg-blue-700 text-white' : ''}`}>
                Active
            </button>
            <button onclick={() => setStatus(() => true)} type="button" class={`btn-main mx-2 ${status() === true ? 'bg-blue-700 text-white' : ''}`}>
                Complete
            </button>
        </div>
    )
}

export default TodoFilter