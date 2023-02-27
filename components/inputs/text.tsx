import Input, { InputProps } from "./input";

interface TextInputProps extends InputProps {}

const TextInput = (props: TextInputProps) => {
  return <Input {...props} type="text" />;
};

export default TextInput;
