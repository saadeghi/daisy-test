import { JSX } from "solid-js";
export interface InputProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
  labelTopLeft?: string;
  labelTopRight?: string;
  labelBottomLeft?: string;
  labelBottomRight?: string;
}

const Input = (props: InputProps) => {
  const {
    labelBottomLeft,
    labelBottomRight,
    labelTopLeft,
    labelTopRight,
    ...rest
  } = props;
  return (
    <div class="form-control w-full max-w-xs">
      <label class="label">
        <span class="label-text">What is your name?</span>
        <span class="label-text-alt">Top Right label</span>
      </label>
      <input
        type="text"
        placeholder="Type here"
        class="input input-bordered w-full max-w-xs"
      />
      <label class="label">
        <span class="label-text-alt">Bottom Left label</span>
        <span class="label-text-alt">Bottom Right label</span>
      </label>
    </div>
  );
};

export default Input;
