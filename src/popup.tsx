import { useSliders } from "~hooks/use_sliders"

function Popup() {
  const { data } = useSliders()

  return (
    <div>
      <h1>Settings</h1>
      <div style={{ padding: "20 10" }}>
        <label htmlFor="volume">Volume</label>
        <input
          type="range"
          id="volume"
          min="0"
          max="1"
          step="0.1"
          value={data.volume}
          onChange={data.handleChangeVolume}
        />
      </div>
      <div style={{ padding: "20 10" }}>
        <label htmlFor="pitch">Pitch</label>
        <input
          type="range"
          id="pitch"
          min="0"
          max="2"
          step="0.1"
          value={data.pitch}
          onChange={data.handleChangePitch}
        />
      </div>
      <div style={{ padding: "20 10" }}>
        <label htmlFor="rate">Rate</label>
        <input
          type="range"
          id="rate"
          min="1"
          max="10"
          step="1"
          value={data.rate}
          onChange={data.handleChangeRate}
        />
      </div>
    </div>
  )
}

export default Popup
