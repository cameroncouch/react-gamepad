export default function IndicateControllerConnection(props) {
  return (
    <div className="connected">
      <button
        value={props.value}
        onClick={props.onChosenController}
      >
        Test 🎮 #{props.value}
      </button>
    </div>
  )
}