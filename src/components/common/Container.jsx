
const Container = ({ children, sc = [] }) => {
    return (
        <div class={`container ${sc.join(' ')}`}>
            {children}
        </div>
    )
}

export default Container