import Part from "./Part"
const Content = ({ parts }) => {
    const total = parts.reduce((a, b) => a+b.exercises, 0);
    // const part = parts.map(course => <Part name={course.parts.name} exercise={course.parts.exercises}/>)
    return (
        <>
            {parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)}
            <h4>total of {total} exercises</h4>
        </>
    )
}

export default Content