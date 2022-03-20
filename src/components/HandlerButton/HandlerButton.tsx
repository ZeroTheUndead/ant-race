import { MouseEventHandler } from 'react';

function HandlerButton(props: { 
  handler: MouseEventHandler<HTMLButtonElement>,
  disabled: boolean | undefined,
  buttonTitle: string
}) {

  const { handler, disabled, buttonTitle } = props; 
  return (
    <button onClick={handler} disabled={disabled}>{buttonTitle}</button>
  );
}

export default HandlerButton;
