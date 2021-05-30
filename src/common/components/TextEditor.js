import { useState } from 'react';
import RichTextEditor from 'react-rte';

const TextEditor = (props) => {
  const [state, setState] = useState({
    value: RichTextEditor.createEmptyValue(),
  });

  const onChange = (value) => {
    setState({ value });
    props.setMessage(value.toString('html'));
  };

  return (
    <RichTextEditor
      value={state.value}
      onChange={onChange}
      placeholder="Nhập tin nhắn"
    />
  );
};

export default TextEditor;
