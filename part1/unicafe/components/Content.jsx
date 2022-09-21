import Part from "./Part"

const Content = (props) => {
    return (
      <div>
        <Part name={props.name1} exercise={props.exercises1}/>
        <Part name={props.name2} exercise={props.exercises2}/>
        <Part name={props.name3} exercise={props.exercises3}/>
      </div>
    )
}

export default Content
