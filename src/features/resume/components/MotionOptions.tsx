export interface MotionSettings {
  mandalaOpacity: number;
  eyeVisible: boolean;
  eyeOpacity: number;
  posterShuffleToken: number;
  posterOpacity: number;
  greetingMotionBlocked: boolean;
  greetingResetToken: number;
  quotePaused: boolean;
  quoteSpeed: number;
  skillMotionBlocked: boolean;
  skillSpeed: number;
}

export const defaultMotionSettings: MotionSettings = {
  mandalaOpacity: 0,
  eyeVisible: true,
  eyeOpacity: 0,
  posterShuffleToken: 0,
  posterOpacity: 0,
  quotePaused: false, quoteSpeed: 2, skillMotionBlocked: false, skillSpeed: 1, greetingMotionBlocked: false, greetingResetToken: 0,
};

export function MotionOptions({ value, onChange }: {
  value: MotionSettings; onChange: (next: MotionSettings) => void;
}) {
  return <div className="cv-motion-options">
    <fieldset>
      <legend>Mandala</legend>
      <div className="cv-pattern-control">
        <label htmlFor="resume-mandala-opacity">Opacity</label>
        <input id="resume-mandala-opacity" type="range" min={0} max={100} step={1}
          value={value.mandalaOpacity}
          onChange={(event) => onChange({ ...value, mandalaOpacity: Number(event.target.value) })} />
        <output htmlFor="resume-mandala-opacity">{value.mandalaOpacity}%</output>
      </div>
    </fieldset>
    <fieldset>
      <legend>Tattoo eye</legend>
      <label className="cv-settings-motion-control">
        <input type="checkbox" checked={value.eyeVisible}
          onChange={(event) => onChange({ ...value, eyeVisible: event.target.checked })} />
        Show eye
      </label>
      <div className="cv-pattern-control">
        <label htmlFor="resume-eye-opacity">Opacity</label>
        <input id="resume-eye-opacity" type="range" min={0} max={100} step={1}
          value={value.eyeOpacity} disabled={!value.eyeVisible}
          onChange={(event) => onChange({ ...value, eyeOpacity: Number(event.target.value) })} />
        <output htmlFor="resume-eye-opacity">{value.eyeOpacity}%</output>
      </div>
    </fieldset>
    <fieldset>
      <legend>Movie posters</legend>
      <div className="cv-pattern-control">
        <label htmlFor="resume-poster-opacity">Opacity</label>
        <input id="resume-poster-opacity" type="range" min={0} max={40} step={1}
          value={value.posterOpacity}
          onChange={(event) => onChange({ ...value, posterOpacity: Number(event.target.value) })} />
        <output htmlFor="resume-poster-opacity">{value.posterOpacity}%</output>
      </div>
      <button className="cv-reset-greeting" type="button" onClick={() => onChange({
        ...value, posterShuffleToken: value.posterShuffleToken + 1,
      })}>Shuffle posters</button>
    </fieldset>
    <fieldset>
      <legend>Greeting</legend>
      <label className="cv-settings-motion-control">
        <input type="checkbox" checked={value.greetingMotionBlocked}
          onChange={(event) => onChange({ ...value, greetingMotionBlocked: event.target.checked })} />
        Pause language
      </label>
      <button className="cv-reset-greeting" type="button" onClick={() => onChange({
        ...value, greetingMotionBlocked: true, greetingResetToken: value.greetingResetToken + 1,
      })}>Reset to English</button>
    </fieldset>
    <fieldset>
      <legend>Quotes</legend>
      <label className="cv-settings-motion-control">
        <input type="checkbox" checked={value.quotePaused}
          onChange={(event) => onChange({ ...value, quotePaused: event.target.checked })} />
        Pause quotes
      </label>
      <div className="cv-pattern-control">
        <label htmlFor="resume-quote-speed">Speed</label>
        <input id="resume-quote-speed" type="range" min={0.5} max={3} step={0.25} value={value.quoteSpeed}
          onChange={(event) => onChange({ ...value, quoteSpeed: Number(event.target.value) })} />
        <output htmlFor="resume-quote-speed">{value.quoteSpeed}×</output>
      </div>
    </fieldset>
    <fieldset>
      <legend>Skills</legend>
      <label className="cv-settings-motion-control">
        <input type="checkbox" checked={value.skillMotionBlocked}
          onChange={(event) => onChange({ ...value, skillMotionBlocked: event.target.checked })} />
        Block skill motion
      </label>
      <div className="cv-pattern-control">
        <label htmlFor="resume-skill-speed">Speed</label>
        <input id="resume-skill-speed" type="range" min={0.5} max={3} step={0.25} value={value.skillSpeed}
          disabled={value.skillMotionBlocked}
          onChange={(event) => onChange({ ...value, skillSpeed: Number(event.target.value) })} />
        <output htmlFor="resume-skill-speed">{value.skillSpeed}×</output>
      </div>
    </fieldset>
  </div>;
}
