import { createMemo, createSignal, For } from "solid-js";


function App() {

  const [data, setData] = createSignal([]);
  const [status, setStatus] = createSignal(null)

  const totoMemo = createMemo(() => {
    localStorage.setItem('solid-todo', JSON.stringify(data()));
    return data().filter((todo) => status() === null || todo.completed === status())
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target);
    setData(() => [...data(), { id: new Date().getTime(), name: formData.get('name'), completed: false }])
    e.target.reset();
  }

  const handleCheck = (id, { target: { checked } }) => {
    setData(() => data().map((todo) => {
      if (todo.id === id) todo.completed = checked
      return todo;
    }))
  }

  const handleDelete = (id) => {
    setData((data) => data.filter((todo) => {
      return todo.id !== id
    }))
  }

  const handleToggleCheck = () => {
    const checked = data().some(t => !t.completed);
    setData((data) => data.map((todo) => {
      return { ...todo, completed: checked }
    }))
  }

  return (
    <div class="container flex justify-center items-center mt-10">
      <div class="max-w-md w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <form class="flex justify-center items-end" onsubmit={[handleSubmit]}>
          <div class="flex-1">
            <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Todo</label>
            <input type="text" name="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Todo" required />
          </div>
          <div>
            <button type="submit" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 ml-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </button>
          </div>
        </form>
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
        <ul class="flex flex-col">
          <For each={totoMemo()}>
            {(todo, i) => <li class="flex justify-between items-center mt-2" id={i()}>
              <div class="flex items-center">
                <input type="checkbox" checked={todo.completed} onInput={[handleCheck, todo.id]} name="bordered-checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <p class="w-full text-md py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{todo.name}</p>
              </div>
              <div>
                <svg onclick={[handleDelete, todo.id]} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-red-500 cursor-pointer">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
              </div>
            </li>}
          </For>
        </ul>
        <div class="flex justify-center items-center -mx-2 mt-3">
          <button type="button" class={`btn-main mx-2 active:bg-blue-700 active:text-white transition-all ${!data().length ? 'pointer-events-none' : ''}`} onClick={[handleToggleCheck]}>
            {!data().length || data().some(todo => !todo.completed) ? 'Check All' : 'Uncheck All'}</button>
          <button type="button" class={`btn-main mx-2 active:bg-blue-700 active:text-white ${!data().length ? 'pointer-events-none' : ''}`}>Complete</button>
        </div>
      </div>
    </div>
  );
}

export default App;
